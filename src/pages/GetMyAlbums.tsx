import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { RootState } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useFetchAlbums } from "@/api/MyAlbumApi";
import { Pencil } from "lucide-react";
import albumCover from "../assets/photohub2.jpg";
import { Album } from "@/types";
import UpdateMyAlbumModal from "@/components/UpdateMyAlbumModal";

const GetMyAlbums = () => {
  const { albums, isLoading } = useFetchAlbums();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const navigate = useNavigate(); 

  if (!user) {
    return <p className="text-red-500 font-semibold text-center mt-4">You must be logged in to view your albums.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Albums</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <h1>Loading...</h1>
        </div>
      ) : !albums || albums.length === 0 ? (
        <p className="text-gray-500 text-center">No albums available. Create a new album!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((album) => (
            <div key={album._id} className="relative"    onClick={() => navigate(`/albums/${album._id}`)} >
              <Card 
                className="shadow-md hover:shadow-lg transition duration-300 rounded-lg overflow-hidden cursor-pointer"
             
              >
                <img
                  src={albumCover || "/placeholder-image.jpg"} 
                  alt={album.title}
                  className="w-full h-48 object-cover"
                />
                <div
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setSelectedAlbum(album);
                  }}
                >
                  <Pencil size={16} className="text-gray-600" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold truncate">{album.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 truncate">{album.description || "No description available."}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Created on: {album.createdAt ? format(new Date(album.createdAt), "PPP") : "Unknown"}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {selectedAlbum && (
        <UpdateMyAlbumModal album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
      )}
    </div>
  );
};

export default GetMyAlbums;
