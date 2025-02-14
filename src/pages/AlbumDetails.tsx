import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchAlbumById, useFetchAlbumImages } from "@/api/MyAlbumApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";

const AlbumDetails: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { album, isLoading: albumLoading, isError: albumError } = useFetchAlbumById(albumId);
  const { images, isLoading: imagesLoading} = useFetchAlbumImages(albumId);

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Keyboard navigation for image viewer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (event.key === "ArrowLeft") prevImage();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "Escape") closeImageViewer();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  if (albumLoading || imagesLoading) {
    return <div className="text-center mt-10 text-primary">Loading album...</div>;
  }

  if (albumError || !album) {
    return <div className="text-center mt-10 text-red-500">Error loading album.</div>;
  }

  const handleImageClick = (index: number) => setSelectedImage(index);
  const closeImageViewer = () => setSelectedImage(null);
  const prevImage = () => setSelectedImage((prev) => (prev !== null ? Math.max(0, prev - 1) : 0));
  const nextImage = () => setSelectedImage((prev) => (prev !== null ? Math.min((images?.length ?? 1) - 1, prev + 1) : 0));

  return (
    <div className="p-6 min-h-screen">
      {/* Back Button */}
      <Button onClick={() => window.history.back()} className="mb-4 flex items-center">
        <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
      </Button>

      {/* Album Information */}
      <h1 className="text-3xl font-bold text-primary capitalize">{album.title}</h1>
      <p className="text-lg text-secondary-foreground mb-6">{album.description}</p>

      {/* Images Grid */}
      {images?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card
              key={index}
              className="bg-secondary hover:shadow-xl transition cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <CardContent className="p-4 flex flex-col items-center">
                <img
                  src={image.filePath}
                  alt={image.filename}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-center text-primary mt-2">{image.filename}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-secondary-foreground">No images found.</p>
      )}

      {/* Image Viewer Modal */}
      {selectedImage !== null && images && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          {/* Close Button */}
          <button onClick={closeImageViewer} className="absolute top-4 right-4 text-white focus:outline-none">
            <X size={32} />
          </button>

          {/* Left Navigation */}
          {selectedImage > 0 && (
            <button onClick={prevImage} className="absolute left-4 text-white focus:outline-none">
              <ChevronLeft size={48} />
            </button>
          )}

          {/* Image & Title */}
          <div className="max-w-3xl p-4 text-center">
            <img
              src={images[selectedImage].filePath}
              alt={images[selectedImage].filename}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white mt-2">{images[selectedImage].filename}</p>
          </div>

          {/* Right Navigation */}
          {selectedImage < images.length - 1 && (
            <button onClick={nextImage} className="absolute right-4 text-white focus:outline-none">
              <ChevronRight size={48} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumDetails;
