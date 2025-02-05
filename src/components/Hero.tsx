import { useState, useEffect } from "react";
import photohub1 from "../assets/photohub1.jpg";
import photohub2 from "../assets/photohub2.jpg";
import photohub3 from "../assets/photohub3.jpg";
import photohub4 from "../assets/photohub4.jpg";
import { Button } from "./ui/button";
import loginWithGoogle from "./auth/OAuth"

const images: string[] = [
  photohub1,
  photohub2,
  photohub3,
  photohub4,
];

const Hero: React.FC = () => {
  const [currentImages, setCurrentImages] = useState<string[]>(images);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  const handleImageClick = (index: number): void => {
    setCurrentImages((prev) => {
      const clickedImage = prev[index];
      const filteredImages = prev.filter((_, i) => i !== index);
      return [clickedImage, ...filteredImages];
    });
  };

  return (
   <section>
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
          <h1 className="heading-l2 ">Welcome To PhotoHub</h1>
          <p className="text-sm md:text-lg">
            Sign in or Sign Up Today and get a chance to create your online album.
             We ensure your images are well organized and safe. You also have a chance to view other people's albums.
          </p>
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
          <div className="">
            <Button variant="ghost" className="bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary" onClick={loginWithGoogle}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-background text-secondary min-h-[40vh] flex items-center justify-center p-2">
        <div className="">
            <h2 className="heading-l2">Here is how it works</h2>
            <ol>
                <li><span>Sign Up</span>or <span>Sign In</span> in case you already have an account</li>
                <li>You will have access to the home page and ability to create, upload and delete images</li>
                <li>You can also view your albums, other people's albums and images</li>
            </ol>
            <h3 className="heading-l3">Get Started Now!</h3>
        </div>
    </div>
   </section>

  );
};

export default Hero;
