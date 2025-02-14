import { useParams, useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FolderOpen, Pencil } from "lucide-react";

import { useFetchAlbumById } from "@/api/MyAlbumApi";
import { RootState } from "@/redux/store";

const GetAllUserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // Select users and current user from Redux store
  const users = useSelector(
    (state: RootState) => state.allUsers.allUsers,
    shallowEqual
  );
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
    shallowEqual
  );

  // Handle loading state
  if (!users || users.length === 0) {
    return (
      <div className="text-center text-primary mt-10">
        <p>Loading User Profile...</p>
      </div>
    );
  }

  const user = users.find((u) => u._id === userId);

  if (!user) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>User not found.</p>
      </div>
    );
  }

  const albumIds: string[] = Array.isArray(user.albums)
    ? user.albums.map((album) => (typeof album === "string" ? album : album._id))
    : [];
  
  return (
    <div className="p-6 mt-4">
      {/* Back Button */}
      <Button onClick={() => navigate(-1)} className="flex items-center mb-4">
        <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
      </Button>

      {/* User Information */}
      <div className="bg-background shadow-lg p-6 rounded-lg text-center">
        <h1 className="text-3xl font-bold text-primary capitalize">{user.name}</h1>
        <p className="text-lg text-secondary-foreground">{user.email}</p>
      </div>

      {/* Albums Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Albums</h2>

        {albumIds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {albumIds.map((albumId) => {
              const { album, isLoading, isError } = useFetchAlbumById(albumId);
        
              if (isLoading) {
                return (
                  <Card key={albumId} className="bg-secondary p-4">
                    <CardContent>Loading album...</CardContent>
                  </Card>
                );
              }

              if (isError || !album) {
                return (
                  <Card key={albumId} className="bg-secondary p-4">
                    <CardContent>Error loading album</CardContent>
                  </Card>
                );
              }

              return (
                <Card key={album._id} className="bg-secondary hover:shadow-xl transition p-4">
                  <CardContent>
                    {/* Placeholder Image */}
                    <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
                    
                    <h3 className="text-xl font-semibold text-primary-foreground">
                      {album.title}
                    </h3>
                    <p className="text-secondary-foreground mb-2">{album.description}</p>
                    <p className="text-sm text-gray-500">
                      {album.updatedAt ? `Updated: ${new Date(album.updatedAt).toLocaleDateString()}` : `Created: ${new Date(album.createdAt).toLocaleDateString()}`}
                    </p>
                    
                    <div className="flex justify-between mt-4">
                      {/* Navigate to album */}
                      <Button
                        variant="outline"
                        className="flex items-center"
                        onClick={() => navigate(`/albums/view-user-album/${album._id}`)}
                      >
                        <FolderOpen className="w-5 h-5 mr-2" /> View Album
                      </Button>
                      
                      {/* Show edit button if current user owns the album */}
                      {currentUser?._id === user._id && (
                        <Button variant="outline" className="flex items-center">
                          <Pencil className="w-5 h-5 mr-2" /> Edit
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <p className="text-secondary-foreground">No albums found.</p>
        )}
      </div>
    </div>
  );
};

export default GetAllUserProfile;
