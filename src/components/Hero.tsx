import { useState, useEffect, useCallback, useMemo } from "react";
import photohub1 from "../assets/photohub1.jpg";
import photohub2 from "../assets/photohub2.jpg";
import photohub3 from "../assets/photohub3.jpg";
import photohub4 from "../assets/photohub4.jpg";
import { Button } from "./ui/button";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import AuthButton from "./GoogleAuthButton";
import React from "react";

const Hero = React.memo(() => {
  // Memoize image list
  const images = useMemo(() => [photohub1, photohub2, photohub3, photohub4], []);

  const [currentImages, setCurrentImages] = useState<string[]>(images);

  // Optimize Redux state selection
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
    shallowEqual
  );

  const navigate = useNavigate();

  // Optimized Image Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) => [...prev.slice(1), prev[0]]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Memoized event handler for image clicks
  const handleImageClick = useCallback((index: number) => {
    setCurrentImages((prev) => {
      const clickedImage = prev[index];
      return [clickedImage, ...prev.filter((_, i) => i !== index)];
    });
  }, []);

  // Memoized navigation function
  const handleViewAlbums = useCallback(() => navigate("/albums"), [navigate]);

  return (
    <section>
      {/* Main Section */}
      <div className="bg-primary text-primary-foreground min-h-[80vh] flex items-center justify-center pb-2">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full px-4 md:w-4/5">
          {/* Left Section */}
          <div className="col-span-1 md:col-span-3 flex items-center justify-center relative">
            <img
              src={currentImages[0]}
              alt="Main display"
              className="w-full h-64 md:h-90 lg:h-[500px] object-cover shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Right Section */}
          <div className="col-span-1 md:col-span-2 flex flex-col justify-center space-y-6 text-center md:text-left">
            {currentUser ? (
              <>
                <h1 className="heading-l2">Hello, {currentUser.userName}</h1>
                <p className="text-sm md:text-lg">
                  You are logged in and ready to manage your albums. Enjoy browsing through your collection and other people's albums.
                </p>
              </>
            ) : (
              <>
                <h1 className="heading-l2">Welcome To PhotoHub</h1>
                <p className="text-sm md:text-lg">
                  Sign in or Sign Up Today and get a chance to create your online album. We ensure your images are well organized and safe. You also have a chance to view other people's albums.
                </p>
              </>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {currentImages.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-16 md:h-24 lg:h-32 object-cover rounded-lg shadow-md cursor-pointer"
                  loading="lazy"
                  onClick={() => handleImageClick(index + 1)}
                />
              ))}
            </div>

            {/* Button Section */}
            <div>
              {currentUser ? (
                <Button
                  variant="ghost"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                  onClick={handleViewAlbums}
                >
                  View Albums
                </Button>
              ) : (
                <AuthButton>
                  <span className="bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary py-2 px-3">
                    Get Started
                  </span>
                </AuthButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      {!currentUser && (
        <div className="bg-secondary text-secondary-foreground min-h-[40vh] flex items-center justify-center p-2">
          <div>
            <h2 className="heading-l2 text-secondary-foreground">Here is how it works</h2>
            <ol className="text-sm md:text-lg">
              <li>
                <span>Sign Up</span> or <span>Sign In</span> if you already have an account.
              </li>
              <li>You will have access to the home page and the ability to create, upload, and delete images.</li>
              <li>You can also view your albums, other people's albums, and images.</li>
            </ol>
            <h3 className="heading-l3">Get Started Now!</h3>
          </div>
        </div>
      )}
    </section>
  );
});

export default Hero;
