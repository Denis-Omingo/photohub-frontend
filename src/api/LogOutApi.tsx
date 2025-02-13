import { useDispatch } from "react-redux";
import { signOut as firebaseSignOut, getAuth } from "firebase/auth";
import { signOut } from "@/redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { app } from "@/firebase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);

    const logout = async () => {
        try {
            //  Sign out from Firebase (if using Firebase Auth)
            await firebaseSignOut(auth);

            // Clear the auth_token cookie via backend
            await fetch(`${API_BASE_URL}/api/logout`, {
                method: "POST",
                credentials: "include", //  Ensures cookies are sent
            });

            //  Reset Redux store
            dispatch(signOut());

            //  Clear localStorage tokens (if stored)
            localStorage.removeItem("token");

            console.log("Logged out successfully!-");

            //  Redirect to login page (optional)
            navigate("/"); //  Redirect after logout
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return logout;
};
