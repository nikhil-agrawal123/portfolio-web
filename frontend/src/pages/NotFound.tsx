import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";

// 5x7 bitmap glyphs
const FOUR = ["#...#", "#...#", "#...#", "#####", "....#", "....#", "....#"];
const ZERO = [".###.", "#...#", "#..##", "#.#.#", "##..#", "#...#", ".###."];

const PAD = 2;
const COLS = PAD + 5 + 1 + 5 + 1 + 5 + PAD;
const ROWS = PAD + 7 + PAD;
const CELL = 20;
const SWEEP = 2.4; // seconds for the scan line to cross the grid

// One row of the "404" bitmap, padded to the full grid width
const rowOf = (r: number) => {
  const g = r - PAD;
  if (g < 0 || g >= 7) return ".".repeat(COLS);
  return ".".repeat(PAD) + FOUR[g] + "." + ZERO[g] + "." + FOUR[g] + ".".repeat(PAD);
};

const NotFound = () => {
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const dots = useMemo(
    () =>
      Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => ({
          r,
          c,
          on: rowOf(r)[c] === "#",
          flicker: 2 + Math.random() * 3,
          offset: Math.random() * 3,
        }))
      ).flat(),
    []
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      <h1 className="sr-only">404 — page not found</h1>

      <svg
        viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
        className="w-full max-w-2xl"
        aria-hidden="true"
      >
        {dots.map(({ r, c, on, flicker, offset }) => {
          const cx = c * CELL + CELL / 2;
          const cy = r * CELL + CELL / 2;
          const lightAt = (c / COLS) * SWEEP; // when the scan line reaches this column

          if (on) {
            return (
              <g key={`${r}-${c}`}>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={CELL * 0.5}
                  fill="hsl(var(--primary) / 0.25)"
                  initial={{ opacity: 0 }}
                  animate={reduce ? { opacity: 0.6 } : { opacity: [0, 0.9, 0.35] }}
                  transition={{ delay: lightAt, duration: 1.2 }}
                />
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={CELL * 0.3}
                  fill="hsl(var(--primary))"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={reduce ? { scale: 1, opacity: 1 } : { scale: [0, 1.4, 1, 1.12, 1], opacity: 1 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          delay: lightAt,
                          duration: 2.6,
                          times: [0, 0.15, 0.3, 0.65, 1],
                          repeat: Infinity,
                          repeatDelay: SWEEP,
                        }
                  }
                />
              </g>
            );
          }

          return (
            <motion.circle
              key={`${r}-${c}`}
              cx={cx}
              cy={cy}
              r={CELL * 0.12}
              fill="hsl(var(--muted-foreground))"
              initial={{ opacity: 0.15 }}
              animate={reduce ? undefined : { opacity: [0.12, 0.45, 0.12] }}
              transition={{ duration: flicker, delay: offset, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}

        {!reduce && (
          <motion.rect
            y={0}
            width={CELL * 1.5}
            height={ROWS * CELL}
            fill="url(#scan)"
            initial={{ x: -CELL * 2 }}
            animate={{ x: COLS * CELL }}
            transition={{ duration: SWEEP, ease: "linear", repeat: Infinity, repeatDelay: 2.6 }}
          />
        )}
        <defs>
          <linearGradient id="scan" x1="0" x2="1">
            <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="0.5" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
            <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : SWEEP, duration: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
          This route isn't in the training data.
        </p>
        <p className="text-muted-foreground mb-8">
          No activations found for <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{location.pathname}</code>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            <ArrowLeft size={16} /> Back home
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            <BookOpen size={16} /> Read the blog
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default NotFound;
