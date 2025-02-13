
export type ImageUploadResponse = {
  _id?: string; // Optional if it's not yet saved in the database
  filename: string;
  filePath: string; // URL or local path
  album?: string; 
  createdAt?: string;
  updatedAt?: string;
};
export type ImageUploadRequest = {
  albumId: string;
  photoFile: File; 
  token: string;
};

export type Album = {
  _id: string;
  title: string;
  description?:string;
  images?: ImageUploadResponse[]; 
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id?: string;
  email: string;
  userName?: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
  albums?: Album[]; 
};

  
  