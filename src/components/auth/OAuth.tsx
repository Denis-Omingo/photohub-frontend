import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {app} from "../../firebase"

const loginWithGoogle = async () => {
    try {
        const provider=new GoogleAuthProvider();
        const auth=getAuth(app);

        const result=await signInWithPopup(auth, provider);

        console.log(result);
    } catch (error) {
        console.log("Could not sign in with Google", error);
    }
};

export default loginWithGoogle;


