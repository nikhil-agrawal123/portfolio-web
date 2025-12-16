import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";

interface ProfileCardProps {
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

export const ProfileCard = ({
  name,
  title,
  location,
  avatar,
  bio,
  socials,
}: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, rotateY: -10 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="glass rounded-2xl p-6 md:p-8 max-w-sm w-full"
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-60 blur-xl" />
        <img
          src={avatar}
          alt={name}
          className="relative w-full h-full rounded-full object-cover border-2 border-primary/30"
        />
        {/* Online indicator */}
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center"
      >
        <h3 className="text-xl md:text-2xl font-bold font-display text-foreground mb-1">
          {name}
        </h3>
        <p className="text-primary font-medium text-sm md:text-base mb-2">
          {title}
        </p>
        <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs md:text-sm mb-4">
          <MapPin className="w-3 h-3" />
          <span>{location}</span>
        </div>
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-6">
          {bio}
        </p>
      </motion.div>

      {/* Social Links */}
      {socials && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          {socials.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300"
            >
              <Github className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          )}
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300"
            >
              <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          )}
          {socials.twitter && (
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300"
            >
              <Twitter className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          )}
          {socials.email && (
            <a
              href={`mailto:${socials.email}`}
              className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all duration-300"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
