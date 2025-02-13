
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useCreateAlbum } from "@/api/MyAlbumApi";


const albumSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
});

type AlbumFormData = z.infer<typeof albumSchema>;

const CreateAlbum = () => {
  const navigate = useNavigate();
  const { createAlbum, isLoading } = useCreateAlbum();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const token = localStorage.getItem("auth_token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlbumFormData>({
    resolver: zodResolver(albumSchema),
    defaultValues: { title: "" },
  });

  const onSubmit = async (data: AlbumFormData) => {
    if (!user || !token) {
      toast.error("You must be logged in to create an album.");
      return;
    }

    console.log("From Create Album:", data)

    try {
      await createAlbum({ title: data.title, token });
      navigate("/my-albums");
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-lg p-6 bg-white rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <PlusCircle className="text-secondary" />
            Create New Album
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Album Title */}
            <div>
              <Label htmlFor="title">Album Title</Label>
              <Input id="title" {...register("title")} placeholder="Enter album title" />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-primary text-secondary-foreground flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Album"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAlbum;
