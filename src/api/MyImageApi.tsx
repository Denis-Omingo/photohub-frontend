import { ImageUploadRequest, ImageUploadResponse } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//UPLOAD PHOTO HOOK

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


//GET ALL IMAGES OF A LOGGED IN USER
interface UserImage {
  _id: string;
  name: string;
  filename: string;
  filePath: string;
  albumId?: string;
  createdAt: string;
}

export const useGetUserImages = (token: string | null) => {
  const fetchUserImages = async (): Promise<UserImage[]> => {
    if (!token) throw new Error("Authentication token is required");

    const response = await fetch(`${API_BASE_URL}/api/images/user-images`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user images");
    }
    return await response.json();  
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["userImages", token],
    fetchUserImages,
    {
      enabled: !!token, // Prevent execution if token is missing
      onError: (err: any) => {
        toast.error(err.message);
        console.error("Fetch User Images Error:", err);
      },
    }
  );
  return {
    images: data || [],
    isLoading,
    isError,
    error,
    refetch, // Can be used to refresh images manually
  };
};


//UPDATE PHOTO NAME HOOK
interface UpdateImageRequest {
  imageId: string;
  newName: string;
  token: string;
}

interface UpdateImageResponse {
  success: boolean;
  message: string;
  updatedImage: {
    _id: string;
    name: string;
    filename: string;
    filePath: string;
  };
}

export const useUpdateMyImage = () => {
  const updateImageRequest = async ({
    imageId,
    newName,
    token,
  }: UpdateImageRequest): Promise<UpdateImageResponse> => {
    if (!imageId || !newName) throw new Error("Image ID and new name are required");

    try {
      const response = await fetch(`${API_BASE_URL}/api/images/update/${imageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update image name");
      }

      return await response.json();
    } catch (error: any) {
      console.error(" Update Error:", error);
      throw new Error(error.message || "An unexpected error occurred during update");
    }
  };

  const mutation = useMutation(updateImageRequest, {
    onSuccess: (data) => {
      toast.success(` Image name updated to: ${data.updatedImage.name}`);
      console.log("📸 Updated Image:", data.updatedImage);
    },
    onError: (error: any) => {
      toast.error(error.message);
      console.error(" Update Error:", error);
    },
  });

  return {
    updateImage: mutation.mutateAsync,
    isUpdating: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
