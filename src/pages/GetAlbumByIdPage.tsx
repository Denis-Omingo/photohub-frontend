import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ImageUploadModal from "@/components/ImageUploadModal";
import { useFetchAlbumImages } from "@/api/MyAlbumApi";
import { Loader2, Maximize, Pencil, ArrowLeft, Trash2, Upload } from "lucide-react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ImageViewer from "react-simple-image-viewer";

const GetAlbumsByIdPage = () => {
  const { albumId } = useParams();
  const { images = [], isLoading } = useFetchAlbumImages(albumId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
    shallowEqual
  );

  return (
    <div className="p-6 min-h-[90vh] flex flex-col items-center relative z-0">
      {/* Back Button */}
      <Button 
        onClick={() => navigate("/my-albums")} 
        className="absolute top-6 left-6 px-4 py-2 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" /> To My Albums
      </Button>

      <h1 className="text-3xl font-semibold mb-6 text-secondary text-center capitalize">
        Hi {currentUser?.name}
      </h1>
      <h3 className="text-xl font-semibold mb-6 text-primary text-center">
      You can add new images to your album, edit titles of existing images and navigate back to your albums below
      </h3>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-60">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : images.length === 0 ? (
        <p className="text-center text-red text-lg">
          No images available. Upload some!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl">
          {images.map((image, index) => (
            <div
              key={image._id}
              className="relative w-full h-52 bg-background rounded-lg overflow-hidden shadow-md transition-transform group"
            >
              {/* Image */}
              <img
                src={image.filePath}
                alt={image.filename || "Album Image"}
                className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
              />

              {/* Delete Icon (Top Right) */}
              <Trash2 
                className="absolute rounded-full p-1 top-2 right-2 w-5 h-5 bg-primary text-background hover:text-red-600 hover:bg-background cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
              />

              {/* Image Title and Actions */}
              <div className="absolute bottom-0 w-full bg-primary/60 p-2 flex items-center justify-between">
                <Pencil 
                  className="w-5 h-5 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={() => navigate(`/my-albums/edit-photo/${image._id}`)}
                />
                <p className="text-secondary-foreground font-bold truncate text-center flex-1">
                  {image.filename || "Untitled"}
                </p>
                <Maximize 
                  className="w-5 h-5 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={() => setSelectedImageIndex(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button (Bottom Left) */}
      <Button 
        onClick={() => setIsModalOpen(true)} 
        className=" bottom-2 left-6 px-6 py-1">
        <Upload className="w-5 h-5" /> Upload
      </Button>

      {/* Upload Modal */}
      {albumId && token && (
        <ImageUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          albumId={albumId}
          token={token}
        />
      )}

      {/* Image Viewer with Title */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50">
          {/* Image Title */}
          <h2 className="text-white text-lg font-bold mb-2 px-4 py-2 bg-black/60 rounded">
            {images[selectedImageIndex]?.filename || "Untitled"}
          </h2>

          {/* Image Viewer */}
          <ImageViewer
            src={images.map((img) => img.filePath)}
            currentIndex={selectedImageIndex}
            disableScroll={false}
            closeOnClickOutside
            onClose={() => setSelectedImageIndex(null)}
          />
        </div>
      )}
    </div>
  );
};

export default GetAlbumsByIdPage;
