"use client";
import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Research data — every number below is from the paper                */
/* ------------------------------------------------------------------ */

/** Marked layers. `col` is the column in the 9-column schematic network below;
    `depth` is the position in the real model the paper reports. */
const loci = [
  {
    col: 0,
    depth: "layer 1",
    tag: "Distress is decoded",
    detail: "Linear probes read user distress at ~0.97 AUROC. The model knows from the very first layer.",
  },
  {
    col: 4,
    depth: "L17 · H10",
    tag: "Integration head",
    detail: "Head patching isolates the one head where distress should meet request risk. The steering gate is injected here.",
    node: 1,
  },
  {
    col: 6,
    depth: "~72% depth",
    tag: "Safety decision",
    detail: "Causal tracing puts the refusal decision here — reached without the distress signal ever routed into it.",
  },
];

const refusal = [
  { model: "Llama-3.1-8B", before: 16, after: 97 },
  { model: "Qwen3-4B", before: 21, after: 82 },
];

const findings = [
  {
    k: "The gap",
    body: "A 1,500-scenario factorial benchmark over 6 controlled conditions separates user distress from request risk. Llama-3.1-8B, Qwen3-4B, GPT-5.4-mini and Gemini-3.6-flash answer 41–77% of distress + risky requests they should decline — while refusing ≥89% of overt harm. The safety behaviour is context-blind, not absent.",
  },
  {
    k: "The mechanism",
    body: "Probing, causal tracing and head patching locate every stage of the failure. Distress is represented early and represented well; it simply never reaches the circuit that decides to refuse.",
  },
  {
    k: "The fix",
    body: "A conjunctive activation-steering gate — a refusal direction gated on risk — applied at the integration layer. CAA, RepE, CAST and CoT/few-shot baselines were reimplemented; none are selective. Gains hold from 4B to 70B, with 80–96% helpfulness and GSM8K/MMLU capability retained.",
  },
];

const leadership = [
  { role: "Web Development & Curation Lead", org: "E-Cell, IIIT Delhi", period: "Dec 2024 — Present" },
  { role: "Development Lead", org: "Byld Club", period: "Aug 2025 — Present" },
  { role: "Development Lead", org: "Esya, IIIT Delhi Tech Fest", period: "2025" },
];

/* ------------------------------------------------------------------ */
/*  Bits                                                               */
/* ------------------------------------------------------------------ */

const CountUp = ({ to, duration = 1.1 }: { to: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setN(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduceMotion]);

  return <span ref={ref}>{n}</span>;
};

/** The network: layers of varying head counts, fully connected, with a pulse of light
    propagating from the first layer to the last. The layers this research works on are
    marked. Schematic — 9 layers stand in for the real depth.

    Animation is deliberately ONE transform-driven element. The page body uses
    background-attachment: fixed, so anything that repaints (opacity, fill) forces a
    full-page repaint every frame, pegs the main thread, and stalls framer-motion's rAF. */
const NeuralNet = () => {
  const reduceMotion = useReducedMotion();

  const CYCLE = 5;
  const heads = [3, 5, 4, 6, 5, 6, 4, 4, 3]; // heads per layer — varied, as in a real stack
  const x = (i: number) => 60 + i * 85;
  const MID = 125;
  const GAP = 26;
  const y = (layer: number, j: number) => MID - ((heads[layer] - 1) * GAP) / 2 + j * GAP;
  const marked = new Map(loci.map((l, i) => [l.col, i]));

  /* Signals travelling the network: each one hops from a head in layer 1 to a head in the
     last layer, through real node positions, so it rides the drawn connections. Each is a
     single <g> animating transform only — see the note above on why nothing here repaints.
     Keyframes are generated because every signal takes a different route. */
  const SIGNALS = 9;
  const routes = Array.from({ length: SIGNALS }, (_, p) =>
    heads.map((n, i) => ({ px: x(i), py: y(i, (p * 2 + i * 3) % n) })),
  );

  const signalCss = routes
    .map((route, p) => {
      const hops = route
        .map((pt, i) => {
          const t = 5 + (i / (route.length - 1)) * 55; // visible from 5% to 60% of the cycle
          return `  ${t.toFixed(1)}% { transform: translate(${pt.px}px, ${pt.py}px) scale(1); }`;
        })
        .join("\n");
      const a = route[0];
      const z = route[route.length - 1];
      return `@keyframes nn-sig-${p} {
  0% { transform: translate(${a.px}px, ${a.py}px) scale(0); }
${hops}
  66% { transform: translate(${z.px}px, ${z.py}px) scale(0); }
  100% { transform: translate(${a.px}px, ${a.py}px) scale(0); }
}
.nn-sig-${p} { animation: nn-sig-${p} ${CYCLE}s linear infinite; animation-delay: -${((p * CYCLE) / SIGNALS).toFixed(2)}s; }`;
    })
    .join("\n");


  return (
    <div className="mt-12">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Where the failure lives
        </h4>
        <span className="font-mono text-[11px] text-muted-foreground/70">schematic</span>
      </div>

      {/* The diagram scrolls in its own track on small screens rather than shrinking to
          illegibility — the page itself never scrolls sideways. */}
      <div className="-mx-1 overflow-x-auto px-1 pb-2">
        <style>{signalCss}</style>
        <svg
          viewBox="0 0 820 265"
          className="w-full min-w-[560px]"
          role="img"
          aria-label="Schematic neural network of nine layers with varying numbers of attention heads, fully connected, with activation propagating from the first layer to the last. Three layers are marked: layer 1, where probes decode user distress; the L17 head 10 integration head, where the steering gate is injected; and roughly 72 percent depth, where the safety decision is made."
        >

          {/* marked-layer capsules */}
          {loci.map((l, i) => {
            const n = heads[l.col];
            const top = MID - ((n - 1) * GAP) / 2 - 16;
            const h = (n - 1) * GAP + 32;
            return (
              <rect
                key={`cap-${i}`}
                x={x(l.col) - 16}
                y={top}
                width={32}
                height={h}
                rx={16}
                fill="hsl(var(--primary) / 0.06)"
                stroke="hsl(var(--primary) / 0.35)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            );
          })}

          {/* connections */}
          {heads.slice(0, -1).map((n, i) =>
            Array.from({ length: n }).map((_, a) =>
              Array.from({ length: heads[i + 1] }).map((_, b) => (
                <line
                  key={`e-${i}-${a}-${b}`}
                  x1={x(i)}
                  y1={y(i, a)}
                  x2={x(i + 1)}
                  y2={y(i + 1, b)}
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.14}
                  strokeWidth={0.75}
                />
              )),
            ),
          )}

          {/* signals travelling layer 1 -> last layer */}
          <g>
            {routes.map((_, p) => (
              <g key={`sig-${p}`} className={`nn-signal nn-sig-${p}`}>
                <circle cx={0} cy={0} r={7} fill="hsl(var(--primary) / 0.18)" />
                <circle cx={0} cy={0} r={3} fill="hsl(var(--primary))" />
              </g>
            ))}
          </g>

          {/* heads */}
          {heads.map((n, i) => {
            const isMarked = marked.has(i);
            return Array.from({ length: n }).map((_, j) => {
              const isHead = loci.some((l) => l.col === i && l.node === j);
              return (
                <g key={`n-${i}-${j}`}>
                  {isHead && (
                    <circle
                      cx={x(i)}
                      cy={y(i, j)}
                      r={11}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth={1.5}
                    />
                  )}
                  <circle
                    cx={x(i)}
                    cy={y(i, j)}
                    r={isMarked ? 6 : 4.5}
                    fill={isMarked ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.55)"}
                  />
                </g>
              );
            });
          })}

          {/* badges sit on one baseline, with stems of varying length down to each
              layer — layers differ in height, so anchoring badges to them reads as ragged */
          }
          {loci.map((l, i) => {
            const n = heads[l.col];
            const top = MID - ((n - 1) * GAP) / 2 - 16;
            return (
              <g key={`b-${i}`}>
                <line
                  x1={x(l.col)}
                  y1={top}
                  x2={x(l.col)}
                  y2={30}
                  stroke="hsl(var(--primary) / 0.4)"
                  strokeWidth={1}
                />
                <circle cx={x(l.col)} cy={19} r={11} fill="hsl(var(--primary))" />
                <text
                  x={x(l.col)}
                  y={23.5}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  fill="hsl(var(--primary-foreground))"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* axis */}
          <text x={60} y={256} textAnchor="middle" fontSize={11} fill="hsl(var(--muted-foreground))">
            input
          </text>
          <text x={410} y={256} textAnchor="middle" fontSize={11} fill="hsl(var(--muted-foreground) / 0.7)">
            depth
          </text>
          <text x={740} y={256} textAnchor="middle" fontSize={11} fill="hsl(var(--muted-foreground))">
            output
          </text>
        </svg>
      </div>

      {/* what each marked layer is */}
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {loci.map((l, i) => (
          <motion.div
            key={l.tag}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "400px" }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.12 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <span className="font-mono text-[11px] text-primary">{l.depth}</span>
            </div>
            <p className="font-display text-sm font-semibold text-foreground">{l.tag}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-foreground/65">{l.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/** Refusal rate before vs. after the steering gate. One scale, 0–100%. */
const RefusalChart = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  return (
    <figure ref={ref} className="mt-12 rounded-lg border border-border/60 bg-background/50 p-4 sm:p-6">
      <figcaption className="mb-1 font-display text-sm font-semibold text-foreground">
        Refusal rate on distress&nbsp;+&nbsp;risky requests
      </figcaption>
      <p className="mb-6 text-xs text-muted-foreground">
        Share of requests the model declines, where declining is the correct behaviour.
      </p>

      <div className="space-y-7">
        {refusal.map((row, i) => (
          <div key={row.model}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-sm font-medium text-foreground">{row.model}</span>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {row.before}% → {row.after}%
              </span>
            </div>

            {/* before */}
            <div className="flex items-center gap-3">
              <span className="w-[4.25rem] shrink-0 text-right text-[10px] text-muted-foreground sm:w-24 sm:text-[11px]">before</span>
              <div className="relative h-2.5 flex-1 rounded-[3px] bg-muted/60">
                <motion.div
                  initial={reduceMotion ? { width: `${row.before}%` } : { width: 0 }}
                  animate={inView ? { width: `${row.before}%` } : undefined}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                  title={`${row.model}, before steering: ${row.before}%`}
                  className="h-full rounded-[3px] bg-muted-foreground/45"
                />
              </div>
            </div>

            {/* after */}
            <div className="mt-[3px] flex items-center gap-3">
              <span className="w-[4.25rem] shrink-0 text-right text-[10px] text-muted-foreground sm:w-24 sm:text-[11px]">after steering</span>
              <div className="relative h-2.5 flex-1 rounded-[3px] bg-muted/60">
                <motion.div
                  initial={reduceMotion ? { width: `${row.after}%` } : { width: 0 }}
                  animate={inView ? { width: `${row.after}%` } : undefined}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.12 }}
                  title={`${row.model}, after steering: ${row.after}%`}
                  className="h-full rounded-[3px] bg-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* scale */}
      <div className="mt-5 flex items-center gap-3">
        <span className="w-[4.25rem] shrink-0 sm:w-24" />
        <div className="flex flex-1 justify-between border-t border-border/60 pt-1.5 font-mono text-[10px] tabular-nums text-muted-foreground/70">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </figure>
  );
};

/* ------------------------------------------------------------------ */

export const Experience = () => {
  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold md:text-5xl">
            <span className="text-foreground">Exp</span>
            <span className="text-gradient">erience</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Aligned models notice a user is in distress. Then they answer anyway. I work on why.
          </p>
        </motion.div>

        {/* ---- the role ---- */}
        {/* No entrance animation on this wrapper: it is taller than the viewport, so a
            viewport-triggered fade can leave the whole section stuck at opacity 0. Its
            children animate individually instead. */}
        <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-10">
          <div className="flex flex-col gap-6 border-b border-border/60 pb-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">FlameNLP · IIIT Delhi</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
                Undergraduate Research Intern
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">Advised by Prof. Md. Shad Akhtar</p>
            </div>
            <span className="shrink-0 self-start rounded-full border border-border/60 px-3 py-1 font-mono text-xs text-muted-foreground">
              Apr 2026 — Present
            </span>
          </div>

          {/* headline result */}
          <div className="grid gap-8 py-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
            <div>
              <p className="font-display text-4xl font-bold leading-none text-foreground sm:text-5xl md:text-6xl">
                <CountUp to={16} />%
                <span className="mx-2 text-xl text-muted-foreground/50 sm:mx-3 sm:text-2xl md:text-3xl">→</span>
                <span className="text-gradient">
                  <CountUp to={97} duration={1.5} />%
                </span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Refusal on distress&nbsp;+&nbsp;risky requests, after steering
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/[0.05] p-4">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm italic leading-relaxed text-foreground/90">
                  Safety Alignment is Context-Blind: Models Detect Distress but Do Not Act on It
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-primary">
                  Under review · ICLR 2027
                </p>
              </div>
            </div>
          </div>

          <NeuralNet />
          <RefusalChart />

          {/* findings */}
          <div className="mt-12 grid gap-8 border-t border-border/60 pt-10 md:grid-cols-3">
            {findings.map((f, i) => (
              <motion.div
                key={f.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <h4 className="mb-2 font-display text-base font-semibold text-foreground">
                  <span className="mr-2 font-mono text-xs text-primary">0{i + 1}</span>
                  {f.k}
                </h4>
                <p className="text-sm leading-relaxed text-foreground/70">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---- leadership ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14"
        >
          <h3 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Also leading
          </h3>
          <ul>
            {leadership.map((item) => (
              <li
                key={`${item.role}-${item.org}`}
                className="group flex flex-col gap-1 border-t border-border/60 py-4 transition-colors last:border-b hover:border-primary/40 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="text-sm text-foreground">
                  {item.role}
                  <span className="text-muted-foreground"> @ {item.org}</span>
                  <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 -translate-y-px text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">{item.period}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
