
import { useState } from "react";
import { useUpdateAlbum } from "@/api/MyAlbumApi";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface UpdateMyAlbumPageProps {
  album: {
    _id: string;
    title: string;
    description?: string;
  };
  onClose: () => void;
}

const UpdateMyAlbumModal = ({ album, onClose }: UpdateMyAlbumPageProps) => {
  const { updateAlbum, isLoading } = useUpdateAlbum();
  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description || "");

  const handleUpdate = async () => {
    try {
      await updateAlbum({ albumId: album._id, title, description });
      onClose(); 
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Album</h2>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Album Title"
          className="mb-3"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Album Description"
          className="mb-3"
        />
        <Button onClick={handleUpdate} disabled={isLoading} className="w-full">
          {isLoading ? "Updating..." : "Update Album"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateMyAlbumModal;

