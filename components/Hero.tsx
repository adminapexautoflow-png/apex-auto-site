"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/lib/content";
import { BookCall } from "./ui/Cta";
import { CallConsole } from "./CallConsole";

/**
 * Page-load sequence: eyebrow, then the headline lifts in word by word, then
 * everything under it, then the console starts running the call. One
 * orchestrated moment rather than four unrelated fades.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const words = hero.headline.split(" ");

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      /* The first node of the Live Line rail links here. */
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28"
    >
      {/* Ambient: one signal bloom behind the console */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[6%] h-[520px] w-[520px] rounded-full bg-signal/[0.07] blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line-bright to-transparent"
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_minmax(0,420px)] lg:gap-16">
        <div>
          <motion.div className="flex items-center gap-3" {...rise(0)}>
            <span aria-hidden className="h-px w-8 bg-signal/70" />
            <span className="eyebrow">{hero.eyebrow}</span>
          </motion.div>

          <h1 className="display mt-7 text-[2.6rem] leading-[0.97] sm:text-[3.6rem] lg:text-[4.15rem]">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="inline-block"
                  initial={reduced ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.15 + i * 0.055,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted"
            {...rise(0.65)}
          >
            {hero.sub}
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap gap-3" {...rise(0.78)}>
            <BookCall>{hero.primary}</BookCall>
            <a
              href="#how-it-works"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-line-bright px-6 py-3.5 text-[0.9375rem] font-semibold text-text transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/60 hover:text-signal"
            >
              {hero.secondary}
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 2v11M4 9l4 4 4-4" strokeLinecap="square" />
              </svg>
            </a>
          </motion.div>

          <motion.p
            className="mt-9 border-l border-line-bright pl-4 text-sm text-dim"
            {...rise(0.9)}
          >
            {hero.trust}
          </motion.p>
        </div>

        {/* w-full so the console's own max-width governs it; a shrink-to-fit
            wrapper leaves it narrower than the column on phones. */}
        <motion.div
          className="w-full max-w-[420px] justify-self-center lg:justify-self-end"
          {...rise(0.5)}
        >
          <CallConsole />
        </motion.div>
      </div>
    </section>
  );
}
