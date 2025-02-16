import { Mail, Phone, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6 border border-border">
        <h1 className="text-3xl font-bold text-secondary text-center mb-4">About The Developer</h1>
        
        <p className="text-lg text-center text-secondary mb-4">
          Hi, I'm <span className="font-semibold">Denis Omingo</span>, a passionate Web Developer with expertise in MERN stack and Next.js. 
          I specialize in building high-performance applications, WordPress development, SEO, and social media management.
        </p>

        <p className="text-lg text-center text-secondary mb-4">
          This project is a dynamic <span className="font-semibold">Photo Gallery Web App</span>, where users can log in, create albums, upload images, and explore other users' albums. 
          It is built using <span className="font-semibold">MERN, Shadcn, TypeScript, and Tailwind CSS</span>. 
          Data is fetched efficiently using <span className="font-semibold">React Query</span>, and <span className="font-semibold">Lucide Icons</span> enhance the UI experience.
        </p>

        <p className="text-lg text-center text mb-6">
          I am currently open to job opportunities. Feel free to reach out via email, call, or WhatsApp.
        </p>

        {/* Contact Information */}
        <div className="flex flex-col items-center gap-4">
          <a href="mailto:omingodenis7@gmail.com" className="flex items-center gap-2 text-primary hover:text-secondary transition">
            <Mail className="w-5 h-5" /> omingodenis7@gmail.com
          </a>
          <a href="tel:+254113890709" className="flex items-center gap-2 text-primary hover:text-secondary transition">
            <Phone className="w-5 h-5" /> +254 113 890 709
          </a>
          <a href="https://omingodenis.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-secondary transition">
            <Globe className="w-5 h-5" /> omingodenis.vercel.app
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
