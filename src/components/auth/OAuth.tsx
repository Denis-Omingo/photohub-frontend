import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { app } from "../../firebase";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '@/redux/user/userSlice';

const useGoogleLogin = () => {
    const dispatch = useDispatch();
    const loginWithGoogle = async (): Promise<void> => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result: UserCredential = await signInWithPopup(auth, provider);
            
            // Dispatch user data to Redux store
            dispatch(signInSuccess(result.user));

            console.log("User signed in:", result.user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Could not sign in with Google:", error.message);
            } else {
                console.error("An unknown error occurred during Google sign-in.");
            }
        }
    };

    return loginWithGoogle; 
};

export default useGoogleLogin;
