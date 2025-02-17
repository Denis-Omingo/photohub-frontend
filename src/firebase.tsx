
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "photo-hub-6e34c.firebaseapp.com",
  projectId: "photo-hub-6e34c",
  storageBucket: "photo-hub-6e34c.firebasestorage.app",
  messagingSenderId: "683725405018",
  appId: "1:683725405018:web:909d79e616cc07c3ddd163"
};


export const app = initializeApp(firebaseConfig);