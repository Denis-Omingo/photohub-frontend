import { useParams, useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FolderOpen, Pencil, Loader2, Plus } from "lucide-react";
import albumCover from "../assets/album.jpg";
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

  // Display loader while fetching users
  if (!users) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
        <h1 className="text-3xl font-bold text-primary capitalize">Albums by {user.name}</h1>
        <p className="text-lg font-semibold text-secondary">{user.email}</p>
      </div>

      {/* Albums Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Albums</h2>

        {albumIds.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="capitalize">{user.name} has no albums yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {albumIds.map((albumId) => {
              const { album, isLoading, isError } = useFetchAlbumById(albumId);

              if (isLoading) {
                return (
                  <Card key={albumId} className="flex items-center justify-center p-6 bg-secondary">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </Card>
                );
              }

              if (isError || !album) {
                return (
                  <Card key={albumId} className="p-4 bg-secondary">
                    <CardContent>Error loading album</CardContent>
                  </Card>
                );
              }

              return (
                <Card
                  key={album._id}
                  className="bg-secondary hover:shadow-xl transition p-0 overflow-hidden rounded-lg"
                >
                  {/* Full-Width Album Image */}
                  <div className="w-full h-48 bg-background overflow-hidden">
                    <img
                      src={albumCover}
                      alt="Album Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold text-primary">{album.title}</h3>
                    <p className="text-secondary-foreground mb-2">{album.description}</p>
                    <p className="text-sm text-primary">
                      {album.updatedAt
                        ? `Last Updated: ${new Date(album.updatedAt).toLocaleDateString()}`
                        : `Created: ${new Date(album.createdAt).toLocaleDateString()}`}
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
                        <Button
                          variant="outline"
                          className="flex items-center"
                          onClick={() => navigate(`/albums/update-album/${album._id}`)}
                        >
                          <Pencil className="w-5 h-5 mr-2" /> Edit
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Create Album Button (Only Visible to Profile Owner) */}
        {currentUser?._id === user._id && (
          <div className="mt-6 flex justify-start">
            <Button
              variant="default"
              className="flex items-center"
              onClick={() => navigate(`/albums/create`)}
            >
              <Plus className="w-5 h-5 mr-2" /> Create Album
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllUserProfile;
