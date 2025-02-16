import { useParams, useNavigate } from "react-router-dom";
import { useFetchAlbums } from "@/api/MyAlbumApi";
import UpdateMyAlbumModal from "@/components/UpdateMyAlbumModal";
import { Loader2 } from "lucide-react";

const UpdateMyAlbumPage = () => {
  const { albumId } = useParams(); 
  const navigate = useNavigate();
  const { albums, isLoading } = useFetchAlbums(); 

  const album = albums?.find((a) => a._id === albumId); 

  
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );

  if (!album)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Album not found</p>
      </div>
    );

  return (
    <div className="h-screen flex justify-center items-center">
      <UpdateMyAlbumModal album={album} onClose={() => navigate(-1)} />
    </div>
  );
};

export default UpdateMyAlbumPage;
