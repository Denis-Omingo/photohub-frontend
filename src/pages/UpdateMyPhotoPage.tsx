import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useGetUserImages, useUpdateMyImage } from "@/api/MyImageApi";

const UpdateMyPhotoPage = () => {
  const { imageId } = useParams();
  const navigate = useNavigate();
  const { updateImage, isUpdating } = useUpdateMyImage();
  const token = localStorage.getItem("auth_token");
  const { images, isLoading, isError } = useGetUserImages(token);

  const [imageName, setImageName] = useState("");
  const [originalExtension, setOriginalExtension] = useState("");
  const initialName = useRef(""); // Preserve the original name

  useEffect(() => {
    if (!imageId || !images) return;

    const foundImage = images.find((img) => img._id === imageId);
    if (!foundImage) {
      toast.error("Image not found");
      navigate(-1);
      return;
    }

    const { filename } = foundImage;
    const lastDotIndex = filename.lastIndexOf(".");

    if (lastDotIndex !== -1) {
      const baseName = filename.substring(0, lastDotIndex);
      const ext = filename.substring(lastDotIndex);
      setImageName(baseName);
      setOriginalExtension(ext);
      initialName.current = baseName; // Store original name to prevent "not found" issues
    } else {
      setImageName(filename);
      setOriginalExtension(" ");
      initialName.current = filename;
    }
  }, [imageId, images, navigate]);

  const handleUpdate = async () => {
    if (!imageId || !imageName.trim()) return;

    if (!token) {
      toast.error("Authentication error. Please log in again.");
      return;
    }

    try {
      await updateImage({ imageId, newName: `${imageName}${originalExtension}`, token });
      toast.success("Image updated successfully");
      navigate(-1);
    } catch {
      toast.error("Failed to update image name");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <Card className="w-[400px] p-6 bg-white shadow-xl rounded-lg">
        <CardContent>
          <h2 className="text-xl font-bold text-primary mb-4">Update Image</h2>
          <p className="text-sm text-secondary mb-4">Edit your photo name.</p>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <p className="text-red-500 text-sm">Failed to load image details.</p>
          ) : !initialName.current ? (
            <p className="text-gray-500 text-sm">Image not found.</p>
          ) : (
            <>
              <Input
                type="text"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                className="mb-4"
              />
              <p className="text-sm text-gray-500">{originalExtension}</p>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate} disabled={isUpdating}>
                  {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateMyPhotoPage;
