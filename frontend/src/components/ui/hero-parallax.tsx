import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "./button";
import { SocialIcons } from "./social-icons";

interface ProfileData {
  name: string;
  title: string;
  location: string;
  avatar: string;
  bio: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const resumeLink = 'https://drive.google.com/file/d/1CUeRVK1hx84sAWGuMoMeaAXbQRjUdNUv/view?usp=sharing' ;

// Geometric lines SVG component
const GeometricLines = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
    viewBox="0 0 1000 800"
    preserveAspectRatio="xMidYMid slice"
  >
    {/* Triangle 1 - top right */}
    <motion.polygon
      points="700,50 900,200 600,250"
      fill="none"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="1"
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        pathLength: 1,
        y: [0, -10, 0],
      }}
      transition={{ 
        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        pathLength: { duration: 2, delay: 0.5 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
    />
    {/* Triangle 2 - middle right */}
    <motion.polygon
      points="750,300 950,450 680,500"
      fill="none"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="1"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.2, 0.5, 0.2],
        y: [0, 15, 0],
      }}
      transition={{ 
        opacity: { duration: 5, delay: 0.8, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 7, delay: 0.8, repeat: Infinity, ease: "easeInOut" },
      }}
    />
    {/* Lines crossing */}
    <motion.line
      x1="600" y1="100" x2="950" y2="400"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="0.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.line
      x1="700" y1="50" x2="650" y2="600"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="0.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.1, 0.4, 0.1] }}
      transition={{ duration: 5, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.line
      x1="550" y1="200" x2="900" y2="300"
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="0.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 4.5, delay: 1.4, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const MarqueeRow = ({
  products,
  direction,
  speed = 100,
}: {
  products: { title: string; link: string; thumbnail: string }[];
  direction: "left" | "right";
  speed?: number;
}) => {
  const [isPaused, setIsPaused] = React.useState(false);
  
  // Calculate total width for seamless loop
  const cardWidth = 30 * 16; // 30rem in pixels
  const gap = 80; // 5rem gap in pixels
  const totalWidth = (cardWidth + gap) * products.length;

  const x = useMotionValue(direction === "left" ? 0 : -totalWidth);


  useAnimationFrame((time, delta) => {
    if (!isPaused) {
      const moveBy = (direction === "left" ? -speed : speed) * (delta / 1000);
      const currentX = x.get();
      let newX = currentX + moveBy;
      
      // Reset for seamless loop
      if (direction === "left" && newX <= -totalWidth) {
        newX = 0;
      } else if (direction === "right" && newX >= 0) {
        newX = -totalWidth;
      }
      
      x.set(newX);
    }
  });


  return (
    <div 
      className="flex mb-20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-20"
        style={{ x }}
      >
        {/* Duplicate products for seamless loop */}
        {[...products, ...products, ...products, ...products].map((product, idx) => (
          <ProductCard
            product={product}
            key={`${product.title}-${idx}`}
            isMarquee={true}
          />
        ))}
      </motion.div>
    </div>
  );
};

export const HeroParallax = ({
  products,
  profile,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  profile?: ProfileData;
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0.3, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [-600, 400]),
    springConfig
  );

  const midpoint = Math.ceil(products.length / 2);
  const firstRow = products.slice(0, midpoint);
  const secondRow = products.slice(midpoint);

  const scrollToProjects = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div
      ref={ref}
      className="min-h-screen md:h-[280vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Hero Section */}
      <div className="min-h-screen relative flex items-center">
        <GeometricLines />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full py-20 md:py-0">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-12">
            
            {/* Left Content */}
            <div className="flex-1 z-10 text-center lg:text-left order-2 lg:order-1">
              {/* Intro Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center mb-6"
              >
                <span className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium relative">
                  Hello, I am
                  <span className="absolute -bottom-1 left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary" />
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-foreground mb-4"
              >
                {profile?.name || "Creative Developer"}
              </motion.h1>

              {/* Title/Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-muted-foreground text-lg md:text-xl mb-8"
              >
                {profile?.title || "A Professional Web Developer and UI/UX Designer."}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                  onClick={() => window.open(resumeLink, '_blank')}
                >
                  Download CV
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border/60 bg-secondary/30 hover:bg-secondary/50 px-8"
                  onClick={scrollToProjects}
                >
                  My Work
                </Button>
              </motion.div>

              {/* Social Links with Tooltips */}
              {profile?.socials && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex items-center mt-8 justify-center lg:justify-start"
                >
                  <SocialIcons socials={profile.socials} />
                </motion.div>
              )}
            </div>

            {/* Right - Profile Image */}
            {profile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10 order-1 lg:order-2"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl opacity-50" />
                  
                  {/* Image */}
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="relative w-full h-full object-cover rounded-full border-2 border-primary/20"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden md:flex"
          onClick={scrollToProjects}
        >
          <div className="w-8 h-14 rounded-full border-2 border-primary/50 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4 text-primary" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Parallax Projects Section - Desktop only with Marquee */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="will-change-transform hidden md:block px-8"
      >
        <MarqueeRow products={firstRow} direction="left" speed={100} />
        <MarqueeRow products={secondRow} direction="right" speed={100} />
      </motion.div>
      
      {/* Mobile: Animated grid of projects */}
      <div className="md:hidden px-4 pb-8">
        <h2 className="text-2xl font-bold font-display text-foreground mb-6 text-center">My Projects</h2>
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {products.map((product) => (
            <motion.a
              key={product.title}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileTap={{ scale: 0.96 }}
              className="relative h-36 rounded-xl overflow-hidden border border-border/60 shadow-sm bg-card"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <h3 className="absolute bottom-2 left-2 right-2 text-foreground font-display font-semibold text-xs leading-tight line-clamp-2">
                {product.title}
              </h3>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  isMarquee = false,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate?: MotionValue<number>;
  isMarquee?: boolean;
}) => {
  const style = isMarquee ? {} : { x: translate };

  return (
    <motion.div
      style={style}
      whileHover={{
        y: -20,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0 will-change-transform"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover/product:shadow-2xl transition-shadow duration-300"
      >
        <img
          src={product.thumbnail}
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-xl"
          alt={product.title}
          loading="lazy"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-background/90 pointer-events-none rounded-xl transition-opacity duration-300"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-foreground font-display font-semibold text-xl transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};