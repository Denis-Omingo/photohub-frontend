import { Menu} from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const MobileNav=()=>{
    return(
       <Sheet>
            <SheetTrigger>
                <Menu className="text-primary-foreground"/>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    <span>Welcome to PhotoHub</span>
                </SheetTitle>
                <Separator/>
                <SheetDescription className="flex">
                    <Button className="flex-1 font-bold bg-primary">Log In</Button>
                </SheetDescription>
            </SheetContent>
       </Sheet>
    )
}
export default MobileNav;