import { LogIn } from "lucide-react";
import loginWithGoogle from "./auth/OAuth";
const MainNav =()=>{
    return(
       <LogIn onClick={loginWithGoogle} className="text-primary-foreground"/>
    )
}

export default MainNav;