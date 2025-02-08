import { useDispatch } from "react-redux";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { app } from "@/firebase";
import { signInFailure, signInStart } from "@/redux/user/userSlice";
import { useCreateMyUser } from "@/api/MyUserApi";

interface AuthButtonProps {
    children: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({ children }) => {
    const dispatch = useDispatch();
    const { mutateAsync: createUser } = useCreateMyUser();

    const handleClick = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        dispatch(signInStart()); // 🔄 Start loading state

        try {
            const result: UserCredential = await signInWithPopup(auth, provider);
            const { uid, email } = result.user;

            if (email && uid) {
                await createUser({ userId: uid, email }); // ✅ Handles success/failure in hook
                console.log("User signed in:", result.user);
            }
        } catch (error: any) {
            dispatch(signInFailure(error.message)); 
            console.error("Google sign-in failed:", error.message);
        }
    };

    return <span onClick={handleClick}>{children}</span>;
};

export default AuthButton;
