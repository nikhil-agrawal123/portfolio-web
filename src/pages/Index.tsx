import { Home, User, Briefcase, FileText, Code2 } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { Timeline } from "@/components/ui/timeline";
import { TechStack } from "@/components/ui/tech-stack";

const navItems = [
  { name: "Home", url: "#home", icon: Home },
  { name: "Skills", url: "#skills", icon: Code2 },
  { name: "About", url: "#about", icon: User },
  { name: "Resume", url: "https://drive.google.com/file/d/1z7QM5hB6BuCVTcDZFpWPXb9Ae-SK6zPj/view?usp=sharing", icon: Briefcase },
];

const products = [
  {
    title: "Health Chat Nexus",
    link: "https://health-chat-nexus.vercel.app/",
    thumbnail: "healthChat.png",
  },
  {
    title: "College ERP System",
    link: "https://github.com/nikhil-agrawal123/ERP-project",
    thumbnail: "CollegeERP.png",
  },
  {
    title: "Simple C Scheduler",
    link: "https://github.com/nikhil-agrawal123/scheduler",
    thumbnail: "scheduler.png",
  },
  {
    title: "LinkedIn Automation with n8n",
    link: "https://github.com/nikhil-agrawal123/LinkedIn-automation-with-n8n",
    thumbnail: "automation.png",
  },
  {
    title: "Deepfake Image Detection",
    link: "https://github.com/nikhil-agrawal123/deepfake-detection",
    thumbnail: "deepfake.png",
  },
  {
    title: "Time Series Cloud Forecasting",
    link: "https://github.com/nikhil-agrawal123/ISRO_BAH",
    thumbnail: "timeseries.png",
  },
];

const timelineData = [
  {
    title: "2024",
    content: (
      <div>
        <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8">
          Led development of multiple full-stack applications, focusing on modern React patterns and cloud architecture.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop"
            alt="coding workspace"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=500&fit=crop"
            alt="code on screen"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop"
            alt="laptop coding"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&h=500&fit=crop"
            alt="development setup"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div>
        <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8">
          Expanded expertise in cloud technologies and microservices architecture.
        </p>
        <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8">
          Collaborated with cross-functional teams to deliver scalable solutions for enterprise clients.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop"
            alt="team collaboration"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=500&fit=crop"
            alt="office work"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=500&fit=crop"
            alt="meeting"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop"
            alt="tech team"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2023-2024",
    content: (
      <div>
        <p className="text-foreground/80 text-xs md:text-lg font-normal mb-4">
          Completed my class 12th and cleared JEE Advance starting my Journey with Computer Science and Applied Mathamatics in IIIT-Delhi.
        </p>
      </div>
    ),
  },
];

const profileData = {
  name: "Nikhil Agrawal",
  title: "Full Stack Developer | AI/ML Enthusiast",
  location: "Delhi, India",
  avatar: "portfolio.jpg",
  bio: "Passionate about building scalable web applications and exploring cutting-edge AI/ML technologies.",
  socials: {
    github: "https://github.com/nikhil-agrawal123",
    linkedin: "https://www.linkedin.com/in/nikhil-agrawal-6b238831a/",
    email: "nikhilagrawal6448@gmail.com",
  },
};

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <NavBar items={navItems} />
      <section id="home" className="relative">
        <HeroParallax products={products} profile={profileData} />
      </section>
      <section id="skills" className="relative">
        <TechStack />
      </section>
      <section id="about" className="relative">
        <Timeline data={timelineData} />
      </section>
    </div>
  );
};

export default Index;
