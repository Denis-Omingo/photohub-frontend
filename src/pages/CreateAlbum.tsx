import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const albumSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  coverImage: z.instanceof(File, { message: "Cover image is required" }), // ✅ Fix applied here
  description: z.string().max(200, "Description cannot exceed 200 characters").optional(),
  creator: z.string().nonempty("Creator name is required"),
  createdAt: z.string(),
});

type AlbumFormData = z.infer<typeof albumSchema>;

const CreateAlbum = () => {
  const navigate = useNavigate();
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AlbumFormData>({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      title: "",
      description: "",
      creator: "John Doe", // Replace with dynamic user name
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    },
  });

  const onSubmit = (data: AlbumFormData) => {
    console.log("Album Data:", data);
    toast.success("Album created successfully!");
    navigate("/albums"); // Redirect after creation
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      setValue("coverImage", file, { shouldValidate: true }); // ✅ Ensure validation
      setCoverPreview(URL.createObjectURL(file));
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
              {errors.title && <p className="text-primary">{errors.title.message}</p>}
            </div>

            {/* Cover Image */}
            <div>
              <Label htmlFor="coverImage">Cover Image (Max: 2MB)</Label>
              <Input id="coverImage" type="file" accept="image/*" onChange={handleCoverImageChange} />
              {coverPreview && <img src={coverPreview} alt="Cover Preview" className="mt-2 w-full h-40 object-cover rounded-md border" />}
              {errors.coverImage && <p className="text-primary text-sm">{errors.coverImage.message}</p>} {/* ✅ Fix applied here */}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Short Description</Label>
              <Textarea id="description" {...register("description")} placeholder="Enter a short description (max 200 characters)" />
              {errors.description && <p className="text-primary text-sm">{errors.description.message}</p>}
            </div>

            {/* Total Number of Images (default 0) */}
            <div>
              <Label>Total Images</Label>
              <Input type="number" value={0} disabled />
            </div>

            {/* Creator */}
            <div>
              <Label>Creator Name</Label>
              <Input type="text" {...register("creator")} disabled />
            </div>

            {/* Created Date */}
            <div>
              <Label>Created Date</Label>
              <Input type="text" {...register("createdAt")} disabled />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-secondary hover:primary text-white flex items-center justify-center gap-2">
              <Upload size={18} />
              Create Album
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAlbum;
