"use client";

import React, { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface AnimatedCounterProps {
  value: number;
  /** Seconds to wait after the number scrolls into view, e.g. to sync with a parent fade-in. */
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Counts up from 0 to `value` once it scrolls into view.
 * The server renders the final value (no-JS / SEO); the client resets to 0 on mount and counts up.
 * Framer writes the digits straight to the DOM, so counting never re-renders React.
 */
export default function AnimatedCounter({ value, delay = 0, duration = 2, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(value);
  const display = useTransform(count, (v) => Math.round(v));

  // Reset before the number is seen (hero stats are still faded out; others are below the fold).
  useEffect(() => {
    if (!reduceMotion) count.set(0);
  }, [count, reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(count, value, { duration, delay, ease: EASE });
    return () => controls.stop();
  }, [inView, reduceMotion, count, value, duration, delay]);

  return (
    <motion.span
      ref={ref}
      // Fixed-width digits plus a reserved width stop the layout from shifting while counting.
      className={`inline-block text-right tabular-nums ${className}`}
      style={{ minWidth: `${String(value).length}ch` }}
    >
      {display}
    </motion.span>
  );
}

/** Renders a translated template like "{n} followers" with the number counting up. */
export function CountUpText({ template, n, delay }: { template: string; n: number; delay?: number }) {
  const [before, after = ""] = template.split("{n}");
  return (
    <>
      {before}
      <AnimatedCounter value={n} delay={delay} />
      {after}
    </>
  );
}
