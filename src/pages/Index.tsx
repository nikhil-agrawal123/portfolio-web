import { Home, User, Briefcase, FileText } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { HeroParallax } from "@/components/ui/hero-parallax";

const navItems = [
  { name: "Home", url: "#home", icon: Home },
  { name: "About", url: "#about", icon: User },
  { name: "Projects", url: "#projects", icon: Briefcase },
  { name: "Resume", url: "#resume", icon: FileText },
];

const products = [
  {
    title: "E-Commerce Platform",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    title: "Dashboard Analytics",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    title: "Mobile App Design",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
  },
  {
    title: "Brand Identity",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
  },
  {
    title: "Social Platform",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
  },
  {
    title: "AI Assistant",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
  },
  {
    title: "Finance App",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop",
  },
  {
    title: "Travel Website",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
  },
  {
    title: "Health Tracker",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
  },
  {
    title: "Music Streaming",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800&h=600&fit=crop",
  },
  {
    title: "Real Estate",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
  },
  {
    title: "Food Delivery",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
  },
  {
    title: "Fitness Platform",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
  },
  {
    title: "Education Portal",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
  },
  {
    title: "Crypto Exchange",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <NavBar items={navItems} />
      <section id="home" className="relative">
        <HeroParallax products={products} />
      </section>
    </div>
  );
};

export default Index;
