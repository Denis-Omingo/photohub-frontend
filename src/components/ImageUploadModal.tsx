import { useState } from "react";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import { useUploadPhoto } from "@/api/MyImageApi";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  albumId: string;
  token: string;
}

Modal.setAppElement("#root");

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, albumId, token }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadPhoto, isLoading } = useUploadPhoto();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

  
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPEG, JPG, and PNG files are allowed");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5MB");
        return;
      }

      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!albumId || !selectedFile) return;

    try {
      await uploadPhoto({ albumId, photoFile: selectedFile, token });

      setSelectedFile(null); // Reset file after successful upload
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-md shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Upload Image</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        className="mb-4 w-full"
      />

      {selectedFile && (
        <div className="mb-4 flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md">
          <span className="text-sm text-gray-700">
            {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </span>
          <button onClick={removeFile} className="text-red-500 hover:text-red-700">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpload} disabled={isLoading || !selectedFile}>
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
