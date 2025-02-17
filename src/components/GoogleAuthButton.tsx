import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { app } from "@/firebase";
import { signInStart, signInSuccess, signInFailure } from "@/redux/user/userSlice";
import { User } from "@/types";
import { useCreateMyUser } from "@/api/MyUserApi";

interface AuthButtonProps {
    children: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({ children }) => {
    const dispatch = useDispatch();
    const { createUser, isLoading } = useCreateMyUser();
    const [isSigningIn, setIsSigningIn] = useState(false);

    const handleClick = useCallback(async () => {
        if (isLoading || isSigningIn) return; 

        setIsSigningIn(true); 

        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        dispatch(signInStart());

        try {
            const result: UserCredential = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;

            if (!firebaseUser?.email) {
                throw new Error("Missing user details from Firebase");
            }

            const idToken = await firebaseUser.getIdToken();

            
            const user: User = {
                email: firebaseUser.email,
                name: firebaseUser.displayName || "",
                userName:"",
                addressLine1: "",
                city: "",
                country: "",
            };

        
            await createUser({ 
                user, 
                token: idToken 
            });

            dispatch(signInSuccess(user)); 
     
        } catch (error: any) {
            dispatch(signInFailure(error.message));
            console.error("Google sign-in failed:", error.message);
        } finally {
            setIsSigningIn(false); 
        }
    }, [createUser, dispatch, isLoading, isSigningIn]);

    return (
        <span 
            onClick={handleClick} 
            style={{ cursor: isSigningIn || isLoading ? "not-allowed" : "pointer", opacity: isSigningIn || isLoading ? 0.6 : 1 }}
        >
            {isSigningIn || isLoading ? "Signing in..." : children}
        </span>
    );
};

export default AuthButton;
