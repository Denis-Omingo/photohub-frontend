import { RootState } from "@/redux/store";
import { CircleUserRound, LogOut, User, UserPen } from "lucide-react"
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useLogout } from "@/api/LogOutApi";

const UsernameMenu=()=> {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const logout=useLogout()
    const navigate=useNavigate()
    return (
       <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center px-3 font-bold hover:text-secondary gap-2'>
                <CircleUserRound className="text-secondary-foreground capitalize"/>
                {currentUser?.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-secondary text-secondary-foreground">
               <DropdownMenuItem>
                    <Button 
                    variant="ghost"
                    className="flex flex-1 font-bold bg-secondary text-secondary-foreground hover:text-secondary hover:bg-secondary-foreground"
                    onClick={() => navigate("/user/update-profile")}
                    >
                    <UserPen size={16} /> Update Profile
            </Button>
                    </DropdownMenuItem>
               <Separator/>

                    <DropdownMenuItem>
                    <Button 
                    variant="ghost"
                    className="flex flex-1 font-bold bg-secondary text-secondary-foreground hover:text-secondary hover:bg-secondary-foreground"
                    onClick={() => navigate("/user/view-profile")}
                    >
                    <User size={16} /> View Profile
            </Button>
                    </DropdownMenuItem>
               <Separator/>

               <Separator/>

               <DropdownMenuItem>
                    <Button variant='ghost' onClick={logout} className="flex flex-1 font-bold bg-secondary text-secondary-foreground hover:text-secondary hover:bg-secondary-foreground m-0">
                    <LogOut size={16} /> Log Out
                    </Button>
               </DropdownMenuItem>
               <Separator/>
            
            </DropdownMenuContent>
       </DropdownMenu> 
    )
}

export default UsernameMenu
