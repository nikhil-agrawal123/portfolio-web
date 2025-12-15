"use client";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

type Expression = "normal" | "happy" | "surprised" | "wink" | "sleepy" | "excited";

const expressions: Expression[] = ["normal", "happy", "surprised", "wink", "sleepy", "excited"];

// Interactive Eye Component
const InteractiveEye = ({ scrollProgress }: { scrollProgress: number }) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [expression, setExpression] = useState<Expression>("normal");

  // Follow mouse
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!eyeRef.current) return;
    
    const rect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
    const distance = Math.min(
      Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 20,
      8
    );
    
    setPupilPosition({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Click to change expression
  const handleClick = () => {
    const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
    setExpression(randomExpression);
    
    // Reset to normal after a bit
    setTimeout(() => setExpression("normal"), 2000);
  };

  const getEyeShape = () => {
    switch (expression) {
      case "happy":
        return "rounded-t-full rounded-b-[50%] scale-y-75";
      case "surprised":
        return "rounded-full scale-110";
      case "wink":
        return "rounded-full scale-y-[0.2]";
      case "sleepy":
        return "rounded-full scale-y-50";
      case "excited":
        return "rounded-full animate-pulse";
      default:
        return "rounded-full";
    }
  };

  const getPupilSize = () => {
    switch (expression) {
      case "surprised":
        return "w-4 h-4";
      case "excited":
        return "w-5 h-5";
      case "sleepy":
        return "w-2 h-2";
      default:
        return "w-3 h-3";
    }
  };

  return (
    <motion.div
      ref={eyeRef}
      className="relative cursor-pointer"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: scrollProgress > 0.05 ? 1 : 0, 
        scale: scrollProgress > 0.05 ? 1 : 0 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Eye container */}
      <div className={`
        relative w-10 h-10 md:w-12 md:h-12 
        bg-background border-2 border-primary/60 
        flex items-center justify-center
        transition-all duration-200
        shadow-lg shadow-primary/20
        ${getEyeShape()}
        ${isBlinking ? "scale-y-[0.1]" : ""}
      `}>
        {/* Iris */}
        <motion.div
          className="relative w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center"
          animate={{
            x: pupilPosition.x,
            y: pupilPosition.y,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Pupil */}
          <motion.div
            className={`${getPupilSize()} rounded-full bg-foreground transition-all duration-200`}
            animate={{
              x: pupilPosition.x * 0.3,
              y: pupilPosition.y * 0.3,
            }}
          />
          {/* Highlight */}
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white/80" />
        </motion.div>

        {/* Expression overlays */}
        <AnimatePresence>
          {expression === "happy" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-3 border-b-2 border-primary rounded-b-full"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Eyelashes for some expressions */}
      {expression === "excited" && (
        <>
          <div className="absolute -top-2 left-1 w-0.5 h-2 bg-primary/60 rotate-[-20deg]" />
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-primary/60" />
          <div className="absolute -top-2 right-1 w-0.5 h-2 bg-primary/60 rotate-[20deg]" />
        </>
      )}
    </motion.div>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  
  // Track scroll progress as a number for the eye
  const [scrollValue, setScrollValue] = useState(0);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => setScrollValue(v));
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div
      className="w-full bg-background font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-foreground max-w-4xl font-display font-bold">
          My Journey
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-sm">
          A timeline of my professional growth and key milestones that have shaped my career.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-muted border border-border p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-muted-foreground font-display">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-muted-foreground font-display">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        {/* Interactive Eye at the top of the line */}
        <div className="absolute md:left-8 left-8 top-0 -translate-x-1/2 translate-x-[1px] z-50">
          <InteractiveEye scrollProgress={scrollValue} />
        </div>

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-12 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-primary/60 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
