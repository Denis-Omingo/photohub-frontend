import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ImageUploadModal from "@/components/ImageUploadModal";
import { useFetchAlbumImages } from "@/api/MyAlbumApi";
import { Loader2, Plus } from "lucide-react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const GetAlbumsByIdPage = () => {
  const { albumId } = useParams();
  const { images, isLoading } = useFetchAlbumImages(albumId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("auth_token");

  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
    shallowEqual
  );

  return (
    <div className="p-6 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900 text-center capitalize">Hi {currentUser?.name}</h1>

      {/* Upload Button */}
      <Button onClick={() => setIsModalOpen(true)} className="mb-6 px-6 py-3">
        <Plus/>New Image
      </Button>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-60">
          <Loader2 className="animate-spin text-gray-500 w-10 h-10" />
        </div>
      ) : images?.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No images available. Upload some!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl">
          {images?.map((image) => (
            <div
              key={image._id}
              className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105"
            >
              <img src={image.filePath} alt="Album" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {albumId && token && (
        <ImageUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          albumId={albumId}
          token={token}
        />
      )}
    </div>
  );
};

export default GetAlbumsByIdPage;
