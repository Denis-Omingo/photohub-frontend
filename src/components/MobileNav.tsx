import { Menu} from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import AuthButton from "./GoogleAuthButton";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { getAuth, signOut } from "firebase/auth";
import { signOut as signOutAction } from "@/redux/user/userSlice";
import { app } from "@/firebase";

const MobileNav=()=>{
    const { currentUser } = useSelector((state: RootState) => state.user);
    const dispatch=useDispatch();

    const logout=async()=>{
        const auth = getAuth(app);
            try {
                await signOut(auth);
                dispatch(signOutAction()); 
            } catch (error) {
                console.error("Error during logout:", error);
        }
        }
    return(
       <Sheet>
            <SheetTrigger>
                <Menu className="text-primary-overlay"/>
            </SheetTrigger>
            <SheetContent className="space-y-3 bg-primary">
                <SheetTitle>
                   {
                    currentUser?(<span className="capitalize text-primary-foreground">Hi {currentUser.displayName}</span>):( <span>Login to PhotoHub</span>)
                   }
                </SheetTitle>
                <Separator/>
                    <SheetDescription className="flex">
                        {currentUser ? (
                            <Button 
                            variant="ghost" 
                            className="flex-1 font-bold bg-secondary text-secondary-foreground" 
                            onClick={() => logout()}
                            >
                            Log Out
                            </Button>
                        ) : (
                            <AuthButton>
                            <Button 
                                variant="ghost" 
                                className="flex-1 font-bold bg-secondary text-secondary-foreground"
                            >
                                Log In
                            </Button>
                            </AuthButton>
                        )}
                        </SheetDescription>
            </SheetContent>
       </Sheet>
    )
}
export default MobileNav;