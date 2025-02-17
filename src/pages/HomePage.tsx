import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchAllUsers } from "@/api/MyUserApi";
import { User } from "@/types";
import { Eye } from "lucide-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { users, isLoading, isError } = useFetchAllUsers();
  console.log("USERS DATA:: ", users);

  return (
    <div className="p-6 mt-2">
      {/* Banner Section */}
      <div className="bg-background shadow-md py-6 text-center">
        <h1 className="text-3xl font-bold text-primary">Welcome to the Platform</h1>
        <p className="text-lg text-secondary-foreground">Explore users and their albums</p>
      </div>

      {/* Users Table */}
      <div className="bg-secondary shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">All Users</h2>

        {isLoading ? (
          <p className="text-center text-primary">Loading users...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load users.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-secondary border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-secondary text-left border-b">
                  <th className="p-3 text-primary">Name</th>
                  <th className="p-3 text-primary">Albums</th>
                  <th className="p-3 text-primary text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <tr
                    key={user.email}
                    className="border-b hover:bg-primary relative"
                  >
                    <td className="p-3 text-secondary-foreground capitalize">{user.name}</td>
                    <td className="p-3 text-secondary-foreground">
                      {user.albums ? user.albums.length : 0} Albums
                    </td>
                    <td className="p-3 relative text-center ">
                      <button
                        onClick={() => navigate(`/all-users/user/${user._id}`)}
                        className="text-background underline hover:text-secondary"
                      >
                        <Eye size={15}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View All Albums Section */}
      <Card
        className="cursor-pointer hover:shadow-xl transition bg-primary mt-8"
        onClick={() => navigate("/user/create-album")}
      >
        <CardContent className="p-2 text-center">
          <h3 className="text-xl font-semibold text-primary-foreground">Create Album</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
