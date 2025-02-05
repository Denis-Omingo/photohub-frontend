// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "photo-hub-6e34c.firebaseapp.com",
  projectId: "photo-hub-6e34c",
  storageBucket: "photo-hub-6e34c.firebasestorage.app",
  messagingSenderId: "683725405018",
  appId: "1:683725405018:web:909d79e616cc07c3ddd163"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);