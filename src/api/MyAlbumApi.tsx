import { RootState } from "@/redux/store";
import { Album, ImageUploadResponse } from "@/types";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateAlbumRequest = { 
  title: string;
  description?:string;
  token: string;
};

type CreateAlbumResponse = Album;

//CREATE ALBUM
export const useCreateAlbum = () => {
  const createAlbumRequest = async ({ title, token }: CreateAlbumRequest): Promise<CreateAlbumResponse> => {
    if (!title) throw new Error("Album title is required");

    const response = await fetch(`${API_BASE_URL}/api/albums`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create album");
    }

    const responseData = await response.json();
    console.log("Raw Response Data:", responseData); 

    if (responseData.album) {
        return responseData.album; 
    } else {
        throw new Error("Invalid response format: missing 'album' key");
    }
};

  const mutation = useMutation(createAlbumRequest, {
      onSuccess: (album) => {
          console.log("New album created:", album);
          toast.success(`Album "${album.title}" created successfully!`);
      },
      onError: (error: any) => {
          toast.error(error.message);
      },
  });

  return {
      createAlbum: mutation.mutateAsync,
      isLoading: mutation.isLoading,
      isError: mutation.isError,
      error: mutation.error,
  };
};
  //GET ALL ALBUMS
  export const useFetchAlbums = () => {
    const user = useSelector((state: RootState) => state.user.currentUser);
    const token = localStorage.getItem("auth_token");

    const fetchAlbumsRequest = async (): Promise<Album[]> => {
        if (!token) throw new Error("Authentication token is missing");

        const response = await fetch(`${API_BASE_URL}/api/albums`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || "Failed to fetch albums");
        }

        const responseData = await response.json();
        console.log("Fetched Albums:", responseData); // ✅ Debugging

        // ✅ Expecting the response to be a direct array
        if (Array.isArray(responseData)) {
            return responseData;
        } else {
            throw new Error("Invalid response format: Expected an array");
        }
    };

    const { data: albums, isLoading, error } = useQuery({
        queryKey: ["fetchAlbums", user?._id], 
        queryFn: fetchAlbumsRequest,
        enabled: !!user, 
        staleTime: 1000 * 60 * 5, 
        retry: 2,  
    });

    useEffect(() => {
        if (error) {
            console.error("Error fetching albums:", error);
            toast.error("Error in fetching albums");
        }
    }, [error]);

    return { albums, isLoading };
};

type UpdateAlbumRequest = { 
  albumId: string;
  title?: string;
  description?: string;
};

export const useUpdateAlbum = () => {
  const updateAlbumRequest = async ({ albumId, title, description }: UpdateAlbumRequest): Promise<Album> => {
    if (!albumId) throw new Error("Album ID is required");
    const token = localStorage.getItem("auth_token");

    const updateData: Partial<UpdateAlbumRequest> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    const response = await fetch(`${API_BASE_URL}/api/albums/${albumId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update album");
    }

    return response.json();
  };

  const mutation = useMutation(updateAlbumRequest, {
    onSuccess: () => {
      toast.success("Album updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return {
    updateAlbum: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
//GET AN ALBUMs BY AlbumID
export const useFetchAlbumById = (albumId?: string) => {
  const fetchAlbumById = async (): Promise<Album> => {
    if (!albumId || albumId.trim() === "") throw new Error("Album ID is required");

    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${API_BASE_URL}/api/albums/get-albums/${albumId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch album");
    }

    return response.json();
  };

  const { data: album, isLoading, isError, error } = useQuery({
    queryKey: ["album", albumId],
    queryFn: fetchAlbumById,
    enabled: !!albumId && albumId.trim() !== "", // Prevent invalid calls
    retry: 1,
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return { album, isLoading, isError, error };
};



  //GET ALL IMAGES IN AN ALBUM 

  export const useFetchAlbumImages = (albumId?: string) => {
    const user = useSelector((state: RootState) => state.user.currentUser);
    const token = localStorage.getItem("auth_token");
  
    const fetchAlbumImages = async (): Promise<ImageUploadResponse[]> => {
      if (!token) throw new Error("Authentication token is missing");
      if (!albumId) throw new Error("Album ID is required");
  
      const response = await fetch(`${API_BASE_URL}/api/albums/${albumId}/images`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to fetch album images");
      }
  
      const responseData: ImageUploadResponse[] = await response.json();
      console.log("Fetched Album Images:", responseData);
  
      if (Array.isArray(responseData)) {
        return responseData;
      } else {
        throw new Error("Invalid response format: Expected an array");
      }
    };
  
    const { data: images, isLoading, error, refetch } = useQuery({
      queryKey: ["fetchAlbumImages", albumId],
      queryFn: fetchAlbumImages,
      enabled: !!user && !!albumId,
      staleTime: 1000 * 60 * 5,
      retry: 2,
    });
  
    if (error) {
      console.error("Error fetching album images:", error);
      toast.error("Error in fetching album images");
    }
  
    return { images, isLoading, refetch };
  };
  
  



  