import { RootState } from "@/redux/store";
import { shallowEqual, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Image, Album } from "lucide-react";
import { useNavigate } from "react-router-dom";


const MyUserProfilePage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
    shallowEqual
  );

  if (!currentUser) {
    return <p className="text-center text-muted-foreground">Loading user data...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Information Card */}
      <Card className="shadow-lg rounded-2xl border border-border p-4">
        <CardHeader>
          <CardTitle className="text-primary text-lg">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-secondary">Name: <span className="text-foreground font-medium capitalize">{currentUser.name}</span></p>
              <p className="text-secondary">Email: <span className="text-foreground font-medium">{currentUser.email}</span></p>
              <p className="text-secondary">Username: <span className="text-foreground font-medium">{currentUser.userName}</span></p>
            </div>
            <div>
              <p className="text-secondary">City: <span className="text-foreground font-medium capitalize">{currentUser.city}</span></p>
              <p className="text-secondary">Country: <span className="text-foreground font-medium capitalize">{currentUser.country}</span></p>
              <p className="text-secondary">Address: <span className="text-foreground font-medium capitalize">{currentUser.addressLine1}</span></p>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white"
              onClick={() => navigate("/user/update-profile")}
            >
              <Pencil size={16} /> Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Summary Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Albums Count */}
        <Card className="shadow-md rounded-xl border border-border p-4 text-center">
          <CardContent>
            <Album size={40} className="text-primary mx-auto" />
            <p className="text-lg font-semibold text-foreground mt-2">Albums</p>
            <p className="text-2xl font-bold text-secondary">0</p>
          </CardContent>
        </Card>

        {/* Photos Count */}
        <Card className="shadow-md rounded-xl border border-border p-4 text-center">
          <CardContent>
            <Image size={40} className="text-primary mx-auto" />
            <p className="text-lg font-semibold text-foreground mt-2">Photos</p>
            <p className="text-2xl font-bold text-secondary">0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyUserProfilePage;
