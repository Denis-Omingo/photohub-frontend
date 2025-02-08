// import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
// import { app } from "../../firebase";
// import { signInSuccess } from "@/redux/user/userSlice";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store"; // Import Redux dispatch type
// import { useCreateMyUser } from "@/api/MyUserApi";

// const GoogleLoginButton = () => {
//     const dispatch = useDispatch<AppDispatch>(); //  Correct Redux dispatch type
//     const { mutateAsync: createUser } = useCreateMyUser();

//     const loginWithGoogle = async () => {
//         const auth = getAuth(app);
//         const provider = new GoogleAuthProvider();

//         try {
//             const result: UserCredential = await signInWithPopup(auth, provider);

//             //  Ensure we have valid user data
//             if (!result?.user?.email || !result?.user?.uid) {
//                 console.error("Google sign-in returned incomplete user data.");
//                 return;
//             }

//             //  Handle user creation with error handling
//             await createUser({ userId: result.user.uid, email: result.user.email })
//                 .catch((err) => console.error("User creation failed:", err));

//             dispatch(signInSuccess(result.user));
//             console.log("User signed in:", result.user);
//         } catch (error) {
//             console.error(
//                 "Google sign-in failed:",
//                 error instanceof Error ? error.message : "An unknown error occurred."
//             );
//         }
//     };

//     return <button onClick={loginWithGoogle}>Sign in with Google</button>;
// };

// export default GoogleLoginButton;
