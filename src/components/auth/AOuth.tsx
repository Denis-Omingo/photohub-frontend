import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { app } from "../../firebase";
import { signInSuccess } from "@/redux/user/userSlice";
import { Dispatch } from "redux";

/**
 * Logs in a user with Google and updates the Redux store.
 * @param {Dispatch} dispatch - Redux dispatch function
 * @returns {Promise<void>} - Resolves when authentication is successful
 */
const loginWithGoogle = async (dispatch: Dispatch): Promise<void> => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
        const result: UserCredential = await signInWithPopup(auth, provider);

        // Dispatch user data to Redux store
        dispatch(signInSuccess(result.user));

        console.log("User signed in:", result.user);
    } catch (error) {
        console.error(
            "Google sign-in failed:",
            error instanceof Error ? error.message : "An unknown error occurred."
        );
    }
};

export default loginWithGoogle;
