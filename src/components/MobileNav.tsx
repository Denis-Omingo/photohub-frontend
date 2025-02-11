import { Menu} from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import AuthButton from "./GoogleAuthButton";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useLogout } from "@/api/LogOutApi";

const MobileNav=()=>{
    const { currentUser } = useSelector((state: RootState) => state.user);
    const logout=useLogout();
    return(
       <Sheet>
            <SheetTrigger>
                <Menu className="text-primary-overlay"/>
            </SheetTrigger>
            <SheetContent className="space-y-3 bg-primary">
                <SheetTitle>
                   {
                    currentUser?(<span className="capitalize text-primary-foreground">Hi {currentUser.userName}</span>):( <span>Login to PhotoHub</span>)
                   }
                </SheetTitle>
                <Separator/>
                    <SheetDescription className="flex">
                        {currentUser ? (
                            <Button 
                            variant="ghost" 
                            className="flex-1 font-bold bg-secondary text-secondary-foreground" 
                            onClick={logout}
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