import { LogIn } from "lucide-react";
import { RootState } from "@/redux/store";
import {  useSelector } from "react-redux";
import UsernameMenu from "./UsernameMenu";
import AuthButton from "./GoogleAuthButton";


const MainNav =()=>{
    const { currentUser } = useSelector((state: RootState) => state.user);
   

 

    return(
        <>
        {currentUser ? (
        <div className="flex space-x-2 items-center">
          <UsernameMenu />
        </div>
        ) : (
        <AuthButton>
          <LogIn className="text-primary-foreground" />
        </AuthButton>
)}  
        </>
        
    )
}

export default MainNav;