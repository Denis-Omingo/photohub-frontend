import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

const Header=()=>{
    return(
        <div className="bg-primary py-6 shadow-md shadow-primary">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold tracking-tight text-primary-foreground">
                    PhotoHub.ke
                </Link>
                <div className="md:hidden">
                    <MobileNav/>
                </div>
            </div>
        </div>
    )
}
export default Header;