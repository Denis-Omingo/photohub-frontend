import { useState } from "react";
import { useUploadPhoto } from "@/api/MyImageApi";

export const useUploadImage = (albumId: string, refetch: () => void) => {
  const { uploadPhoto, isLoading } = useUploadPhoto();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const token = localStorage.getItem("auth_token");

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    // Filter files by type and size
    const validFiles = files.filter(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png"].includes(file.type) &&
        file.size <= 2 * 1024 * 1024 // Max 2MB
    );

    if (validFiles.length > 4) {
      alert("You can only upload a maximum of 4 images.");
      return;
    }
    setSelectedFiles(validFiles);
  };

  // Upload Images
  const handleUpload = async () => {
    if (!albumId || selectedFiles.length === 0 || !token) return;

    try {
      const uploadPromises = selectedFiles.map((file) =>
        uploadPhoto({
          albumId,
          photoFile: file,
          token,
        })
      );

      await Promise.all(uploadPromises);
      refetch(); // Refresh images
      setSelectedFiles([]); // Clear files after upload
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return { selectedFiles, handleFileChange, handleUpload, isLoading };
};
