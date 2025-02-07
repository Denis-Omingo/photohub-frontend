import { RootState } from "@/redux/store";
import { CircleUserRound } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { getAuth, signOut } from "firebase/auth";
import {app} from '../firebase'
import { signOut as signOutAction } from "@/redux/user/userSlice";

const UsernameMenu=()=> {
    const auth = getAuth(app);
    const { currentUser } = useSelector((state: RootState) => state.user);
    const dispatch =useDispatch();
    const logout=async()=>{
        try {
            await signOut(auth);
            dispatch(signOutAction()); 
        } catch (error) {
            console.error("Error during logout:", error);
    }
    }
    return (
       <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center px-3 font-bold hover:text-secondary gap-2'>
                <CircleUserRound className="text-secondary-foreground"/>
                {currentUser?.displayName}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-secondary text-secondary-foreground">
               <DropdownMenuItem>
                    <Link to='/user-profile' className="font-bold hover:text-secondary">Profile</Link>
               </DropdownMenuItem>
               <Separator/>

               <DropdownMenuItem>
                    <Button variant='ghost' onClick={()=>logout()} className="flex flex-1 font-bold bg-secondary text-secondary-foreground hover:text-secondary hover:bg-secondary-foreground">Log Out</Button>
               </DropdownMenuItem>
               <Separator/>
            </DropdownMenuContent>
       </DropdownMenu> 
    )
}

export default UsernameMenu
