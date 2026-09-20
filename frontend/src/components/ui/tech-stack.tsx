"use client";
import React from "react";
import { motion } from "framer-motion";

const groups = [
  {
    label: "AI / ML",
    note: "training, steering, interpreting",
    skills: [
      "PyTorch",
      "HuggingFace Transformers",
      "PEFT (LoRA)",
      "vLLM",
      "Scikit-learn",
      "LangChain",
      "LangSmith",
      "Ollama",
      "OpenCV",
      "CatBoost",
      "MLflow",
    ],
  },
  {
    label: "Languages",
    note: "research, systems, web",
    skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript", "TypeScript"],
  },
  {
    label: "Data & Retrieval",
    note: "relational state, vector search",
    skills: ["ChromaDB", "FAISS", "Pinecone", "MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    label: "Web & APIs",
    note: "how the models get served",
    skills: ["FastAPI", "Flask", "React", "Node.js", "Express", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Tools & Infra",
    note: "reproducing and shipping it",
    skills: ["Git", "Docker", "Linux", "Google Cloud", "GitHub Actions", "Vercel", "Jupyter"],
  },
];

const focusAreas = [
  "Large Language Models",
  "Mechanistic Interpretability",
  "AI Safety",
  "Deep Learning",
  "NLP",
  "Generative AI",
  "RAG",
];

export const TechStack = () => {
  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="mb-5 font-display text-3xl font-bold md:text-5xl">
            <span className="text-foreground">Tech</span> <span className="text-gradient">Stack</span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            I work mostly on{" "}
            {focusAreas.map((area, i) => (
              <React.Fragment key={area}>
                <span className="text-foreground/90">{area}</span>
                {i < focusAreas.length - 2 && ", "}
                {i === focusAreas.length - 2 && " and "}
              </React.Fragment>
            ))}
            .
          </p>
        </motion.div>

        {/* the index */}
        <div>
          {groups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "240px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border-t border-border last:border-b"
            >
              {/* hairline that fills in on hover */}
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full"
              />

              <div className="grid gap-x-10 gap-y-3 py-8 md:grid-cols-[13rem_1fr] md:py-10">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary md:text-xl">
                    {group.label}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{group.note}</p>
                </div>

                <ul className="flex flex-wrap items-baseline gap-x-1 gap-y-2">
                  {group.skills.map((skill, j) => (
                    <li key={skill} className="flex items-baseline gap-x-1">
                      <span className="text-[15px] leading-relaxed text-foreground/80 transition-colors duration-300 group-hover:text-foreground md:text-base">
                        {skill}
                      </span>
                      {j < group.skills.length - 1 && (
                        <span aria-hidden="true" className="px-1 text-muted-foreground/35">
                          ·
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
