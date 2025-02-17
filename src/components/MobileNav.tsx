import { Album, Home, LogIn, LogOut, Menu, User, UserPen } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import AuthButton from "./GoogleAuthButton";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useLogout } from "@/api/LogOutApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const MobileNav = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const logout = useLogout();
    const navigate = useNavigate();
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    // Update state when the location changes
    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    // Function to handle navigation and update active path instantly
    const handleNavigate = (path: string) => {
        setActivePath(path); // Set active before navigation to remove delay
        navigate(path);
    };

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-primary-overlay" />
            </SheetTrigger>
            <SheetContent className="space-y-3 bg-primary">
                <SheetTitle>
                    {currentUser ? (
                        <span className="capitalize text-primary-foreground">Hi {currentUser.name}</span>
                    ) : (
                        <span>Login to PhotoHub</span>
                    )}
                </SheetTitle>
                <Separator />

                {currentUser ? (
                    <SheetDescription className="flex flex-col gap-3 mx-auto w-full">
                        <Button
                            variant="ghost"
                            className={`flex-1 font-bold ${activePath === "/home" ? "bg-background text-secondary" : "bg-secondary text-secondary-foreground"}`}
                            onClick={() => handleNavigate("/home")}
                        >
                            <Home size={14} /> Home
                        </Button>

                        <Button
                            variant="ghost"
                            className={`flex-1 font-bold ${activePath === "/about" ? "bg-background text-secondary" : "bg-secondary text-secondary-foreground"}`}
                            onClick={() => handleNavigate("/about")}
                        >
                            <User size={14} /> About
                        </Button>

                        <Button
                            variant="ghost"
                            className={`flex-1 font-bold ${activePath === "/user/update-profile" ? "bg-background text-secondary" : "bg-secondary text-secondary-foreground"}`}
                            onClick={() => handleNavigate("/user/update-profile")}
                        >
                            <UserPen size={14} /> Update Profile
                        </Button>

                        <Button
                            variant="ghost"
                            className={`flex-1 font-bold ${activePath === "/user/view-profile" ? "bg-background text-secondary" : "bg-secondary text-secondary-foreground"}`}
                            onClick={() => handleNavigate("/user/view-profile")}
                        >
                            <User size={14} /> View Profile
                        </Button>

                        <Button
                            variant="ghost"
                            className={`flex-1 font-bold ${activePath === "/my-albums" ? "bg-background text-secondary" : "bg-secondary text-secondary-foreground"}`}
                            onClick={() => handleNavigate("/my-albums")}
                        >
                            <Album size={14} /> My Albums
                        </Button>

                        <Button
                            variant="ghost"
                            className={`flex-1 font-bold ${activePath === "/user/create-album" ? "bg-background text-secondary" : "bg-secondary text-secondary-foreground"}`}
                            onClick={() => handleNavigate("/user/create-album")}
                        >
                            <Album size={14} /> Create Album
                        </Button>

                        <Button
                            variant="ghost"
                            className="flex-1 font-bold bg-secondary text-secondary-foreground"
                            onClick={logout}
                        >
                            <LogOut size={14} /> Log Out
                        </Button>
                    </SheetDescription>
                ) : (
                    <SheetDescription className="flex">
                        <AuthButton>
                            <span className="flex gap-3 mx-auto w-full">
                                <Button
                                    variant="ghost"
                                    className="flex-1 font-bold bg-secondary text-secondary-foreground"
                                >
                                    <LogIn size={14} /> Log In
                                </Button>
                            </span>
                        </AuthButton>
                    </SheetDescription>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
