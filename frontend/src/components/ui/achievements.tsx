"use client";
import { motion } from "framer-motion";
import { Trophy, Award, GitBranch, ExternalLink } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
  link?: string;
}

const achievements: Achievement[] = [
  {
    title: "HackLLM — 1st Place",
    description:
      "Won among 200+ teams building a pipeline to detect and mitigate LLM hallucinations via confidence scoring and validation heuristics.",
    tag: "2025",
    icon: <Trophy className="w-6 h-6" />,
    link: undefined,
  },
  {
    title: "Google GDG Solution Challenge",
    description:
      "Ranked top 2.4% nationally (36th / 1500+ teams) for a scalable, socially impactful technical solution.",
    tag: "2025",
    icon: <Award className="w-6 h-6" />,
    link: undefined,
  },
  {
    title: "Open Source Contributions",
    description:
      "Zulip (extended Linux distro support), SheSync (production React + Node.js modules for a women's health platform), CryptoTracker (real-time market data features).",
    tag: "Ongoing",
    icon: <GitBranch className="w-6 h-6" />,
    link: undefined,
  },
];

export const Achievements = () => {
  return (
    <section className="relative py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Recognitions and contributions from hackathons, competitions, and open source.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-full bg-muted">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                {item.title}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                )}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
