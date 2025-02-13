import { useParams, useNavigate } from "react-router-dom";
import { useFetchAlbums } from "@/api/MyAlbumApi";
import UpdateMyAlbumModal from "@/components/UpdateMyAlbumModal";

const UpdateMyAlbumPage = () => {
  const { albumId } = useParams(); // Get albumId from URL
  const navigate = useNavigate();
  const { albums, isLoading } = useFetchAlbums(); // Fetch all albums

  const album = albums?.find((a) => a._id === albumId); // Find the album by ID

  if (isLoading) return <p>Loading...</p>;
  if (!album) return <p>Album not found</p>;

  return <UpdateMyAlbumModal album={album} onClose={() => navigate(-1)} />;
};

export default UpdateMyAlbumPage;
