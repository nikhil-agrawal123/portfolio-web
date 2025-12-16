"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Code2, 
  Database, 
  Globe, 
  Cpu, 
  Brain, 
  Layers, 
  Server, 
  Smartphone,
  Palette,
  GitBranch
} from "lucide-react";

interface TechCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const techCategories: TechCategory[] = [
  {
    title: "Frontend",
    icon: <Globe className="w-6 h-6" />,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Backend",
    icon: <Server className="w-6 h-6" />,
    skills: ["Node.js", "Python", "Express", "FastAPI"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Database",
    icon: <Database className="w-6 h-6" />,
    skills: ["PostgreSQL", "MongoDB","MySQL" , "Redis (still learning)", "Firebase"],
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "AI/ML",
    icon: <Brain className="w-6 h-6" />,
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Mobile",
    icon: <Smartphone className="w-6 h-6" />,
    skills: ["React Native", "Expo (still learning)"],
    color: "from-rose-500 to-red-500",
  },
  {
    title: "DevOps",
    icon: <Layers className="w-6 h-6" />,
    skills: ["Docker", "AWS", "Vercel", "GitHub Actions"],
    color: "from-indigo-500 to-violet-500",
  },
];

const TechCard = ({ category, index }: { category: TechCategory; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]),
    springConfig
  );
  
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    springConfig
  );
  
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]),
    springConfig
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)]">
        {/* Gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Icon and title */}
        <div className="relative flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
            {category.icon}
          </div>
          <h3 className="text-xl font-display font-bold text-foreground">
            {category.title}
          </h3>
        </div>
        
        {/* Skills */}
        <div className="relative flex flex-wrap gap-2">
          {category.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: skillIndex * 0.1, duration: 0.3 }}
              viewport={{ once: true }}
              className="px-3 py-1 text-sm rounded-full bg-secondary/50 text-foreground/80 border border-border/50 transition-colors hover:bg-primary/10 hover:border-primary/30"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 50, damping: 20 };
  
  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
    springConfig
  );

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 overflow-hidden bg-background"
    >
      {/* Animated background elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">Tech</span>{" "}
            <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I work with across web development, mobile, and AI/ML domains
          </p>
        </motion.div>

        {/* Tech grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, index) => (
            <TechCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Floating icons decoration */}
        <div className="absolute top-20 left-10 opacity-10">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code2 className="w-16 h-16 text-primary" />
          </motion.div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cpu className="w-20 h-20 text-accent" />
          </motion.div>
        </div>
        <div className="absolute top-1/2 right-20 opacity-10 hidden lg:block">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <GitBranch className="w-12 h-12 text-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
