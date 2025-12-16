import { Home, User, Briefcase, Code2, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { Timeline } from "@/components/ui/timeline";
import { TechStack } from "@/components/ui/tech-stack";
import { Contact2 } from "@/components/ui/contact-2";

const navItems = [
  { name: "Home", url: "#home", icon: Home },
  { name: "Skills", url: "#skills", icon: Code2 },
  { name: "About", url: "#about", icon: User },
  { name: "Contact", url: "#contact", icon: Mail },
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
  {
    title: "Python Assembly Interpreter",
    link : "https://github.com/nikhil-agrawal123/CO_project",
    thumbnail: "assembly.png",
  }
];

const timelineData = [
  {
    title: "2025 - Present",
    content: (
      <div>
        <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8">
          Led development of multiple full-stack applications, focusing on modern React patterns and cloud architecture.
        </p>
        <ul className="list-disc list-inside text-foreground/80 text-xs md:text-sm font-normal mb-8 space-y-2">
          <li>Worked on various projects involving AI/ML integration, enhancing user experiences with intelligent features.</li>
          <li>Learned basic concepts of AI/ML and implemented them in small projects.</li>
          <li>Exploring DSA concepts to strengthen problem-solving skills on leetcode.</li>
          <li>Currently learning Mobile Development using React Native and Expo with some concepts of Docker.</li>
        </ul>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="deepfake.png"
            alt="deepfake detection"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="ecell.png"
            alt="ecell website"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="healthChat.png"
            alt="=health chat nexus"
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
        <p className="text-foreground/80 text-lg md:text-lg font-normal mb-8">
          Started learning web development and AI/ML concepts through online courses and personal projects.
        </p>
        <ul className="list-disc list-inside text-foreground/80 text-xs md:text-sm font-normal mb-8 space-y-2">
          <li>Created a small clone of Amazon UI.</li>
          <li>Build and explored some basic Backend projects using Node.js and FastAPI.</li>
        </ul>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="amazon.png"
            alt="amazon clone"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="fast.png"
            alt="fastapi backend"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="grader.png"
            alt="project grader"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2023 - 2024",
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
  title: "Full Stack Developer | AI/ML Enthusiast | Automation Explorer",
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
      <section id="contact" className="relative">
        <Contact2
          title="Get In Touch"
          description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
          phone="+91 9811782270"
          email="nikhilagrawal6448@gmail.com"
          web={{ label: "Nikhil Agrawal", url: "https://portfolio-eight-omega-35.vercel.app/" }}
        />
      </section>
    </div>
  );
};

export default Index;
