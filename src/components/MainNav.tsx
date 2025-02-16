import { LogIn } from "lucide-react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import UsernameMenu from "./UsernameMenu";
import AuthButton from "./GoogleAuthButton";
import { Link, useLocation } from "react-router-dom";

const MainNav = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  // Function to check if a link is active
  const getLinkClasses = (path: string) =>
    location.pathname === path
      ? "text-secondary font-semibold border-b-2 border-secondary"
      : "text-background hover:text-secondary transition duration-300";

  return (
    <nav className="flex justify-between items-center w-full px-6 py-3 bg-primary">
      <div className="flex gap-6">
        <Link to="/home" className={getLinkClasses("/home")}>
          Home
        </Link>
        <Link to="/about" className={getLinkClasses("/about")}>
          About
        </Link>
        <Link to="/my-albums" className={getLinkClasses("/my-albums")}>
          My Albums
        </Link>
      </div>

      <div>
        {currentUser ? (
          <UsernameMenu />
        ) : (
          <AuthButton>
            <LogIn className="text-primary-foreground" />
          </AuthButton>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
