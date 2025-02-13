import { ImageUploadRequest, ImageUploadResponse } from "@/types";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUploadPhoto = () => {
  const uploadPhotoRequest = async ({
    albumId,
    photoFile,
    token,
  }: ImageUploadRequest): Promise<ImageUploadResponse> => {
    if (!albumId || !photoFile) throw new Error("Album ID and photo file are required");

    const formData = new FormData();
    formData.append("image", photoFile); 

    console.log(" Uploading photo with FormData:");
    for (let pair of formData.entries()) {
      console.log(`🔹 ${pair[0]}:`, pair[1]); 
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/images/upload-image/${albumId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: formData, 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload photo");
      }

      const photoData: ImageUploadResponse = await response.json();

      return {
        ...photoData,
        filePath: `${API_BASE_URL}/uploads/${photoData.filename}`, // Ensure correct file path
      };
    } catch (error: any) {
      console.error(" Upload Error:", error);
      throw new Error(error.message || "An unexpected error occurred during upload");
    }
  };

  const mutation = useMutation(uploadPhotoRequest, {
    onSuccess: (photo) => {
      toast.success(" Photo uploaded successfully!");
      console.log("📸 Uploaded Photo:", photo);
    },
    onError: (error: any) => {
      toast.error(error.message);
      console.error(" Upload Error:", error);
    },
  });

  return {
    uploadPhoto: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
