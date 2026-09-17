"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { timeline } from "@/lib/site";

/**
 * THE SIGNATURE.
 *
 * A permanent instrument rail down the left edge carrying the arc of one
 * recovered job: ring -> no answer -> text sent -> reply -> ranked -> booked
 * -> on site -> paid. Each node is a link to its section, and the node you are
 * standing in grows to say so.
 *
 * The track doubles as the page's scroll bar: it fills continuously with scroll
 * position, while the nodes light up in steps as their sections arrive. Below
 * xl the rail is replaced by a hairline top bar (see components/Nav.tsx).
 */

const TOP_PAD = 116; // px reserved above the track for the rail heading
const BOTTOM_PAD = 88;
const TRACK_X = 40; // px from the rail's left edge to the track

/** Index of the timeline node whose section currently owns the viewport. */
export function useActiveNode() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.42;
      let next = 0;

      timeline.forEach((node, i) => {
        if (node.id === "top") return;
        const el = document.getElementById(node.id);
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });

      // The last node only lights once the page bottom is genuinely in view.
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 140;
      if (atEnd) next = timeline.length - 1;

      setActive(next);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

export function LiveLine() {
  const pathname = usePathname();
  const active = useActiveNode();
  const reduced = useReducedMotion();
  const last = timeline.length - 1;

  // The charge is the scroll bar: a scaleY on a single px-wide bar, so it is a
  // GPU transform rather than a per-frame layout. Springing it smooths the
  // wheel's steps; reduced motion reads the raw value and lands exactly.
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const progress = reduced ? scrollYProgress : smoothed;

  const grow = reduced
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

  // The rail tells the story of the marketing page. It has nothing to say on
  // the legal routes, so it stays off there.
  if (pathname !== "/") return null;

  const trackInset = { top: TOP_PAD, bottom: BOTTOM_PAD };

  return (
    <nav
      aria-label="Job timeline"
      /* Anchored to the content column, not the window edge, so the rail stays
         next to the page on ultrawide displays instead of drifting away.
         The panel itself never takes a click — only the node links do. */
      style={{ left: "max(0px, calc((100vw - 1376px) / 2))" }}
      className="pointer-events-none fixed inset-y-0 z-40 hidden w-[196px] border-r border-line bg-void/70 backdrop-blur-sm xl:block"
    >
      <div className="absolute left-8 top-11 text-[11px] font-medium tracking-[0.01em] text-dim">
        Job timeline
      </div>
      <div className="absolute left-8 top-[68px] h-px w-24 bg-line-bright" />

      {/* Unlit track */}
      <div
        aria-hidden
        className="absolute w-px bg-line-bright"
        style={{ left: TRACK_X, ...trackInset }}
      />

      {/* Charge — the scroll bar */}
      <motion.div
        aria-hidden
        className="absolute w-px origin-top bg-gradient-to-b from-signal-dim via-signal to-signal-soft shadow-[0_0_12px_rgb(var(--signal-rgb)/0.55)]"
        style={{ left: TRACK_X, ...trackInset, scaleY: progress }}
      />

      {/* Nodes */}
      <div className="absolute inset-x-0" style={trackInset}>
        {timeline.map((node, i) => {
          const passed = i <= active;
          const isActive = i === active;

          return (
            <a
              key={node.id}
              href={`#${node.id}`}
              aria-current={isActive ? "true" : undefined}
              className="group pointer-events-auto absolute flex -translate-y-1/2 items-center rounded-full py-1 pr-3"
              style={{ top: `${(i / last) * 100}%`, left: TRACK_X }}
            >
              {/* Fixed slot, so the label holds still while the dot grows. */}
              <span className="relative -ml-[9px] flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                {node.highlight && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border transition-colors duration-500"
                    style={{
                      borderColor: passed
                        ? "rgb(var(--signal-rgb) / 0.55)"
                        : "rgb(var(--signal-rgb) / 0.3)",
                    }}
                  />
                )}

                <motion.span
                  aria-hidden
                  className="block rounded-full border transition-[border-color,background,box-shadow] duration-500 group-hover:border-signal"
                  animate={{
                    width: isActive ? 13 : 8,
                    height: isActive ? 13 : 8,
                  }}
                  transition={grow}
                  style={{
                    borderColor: passed
                      ? "var(--color-signal)"
                      : "var(--color-line-bright)",
                    background: passed
                      ? "var(--color-signal)"
                      : "var(--color-void)",
                    boxShadow: isActive
                      ? "0 0 0 3px rgb(var(--signal-rgb) / 0.14), 0 0 14px rgb(var(--signal-rgb) / 0.5)"
                      : "none",
                  }}
                />
              </span>

              <motion.span
                className="ml-2.5 whitespace-nowrap transition-colors duration-500 group-hover:text-text"
                animate={{ fontSize: isActive ? 15 : 13 }}
                transition={grow}
                style={{
                  color: isActive
                    ? "var(--color-text)"
                    : node.highlight
                      ? "var(--color-signal)"
                      : passed
                        ? "var(--color-muted)"
                        : "var(--color-dim)",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {node.label}
              </motion.span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
