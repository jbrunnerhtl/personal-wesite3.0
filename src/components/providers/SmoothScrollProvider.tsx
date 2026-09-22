"use client";

import React, { useEffect, createContext, useContext, useRef } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { motionStore } from "@/lib/motionStore";

const LenisContext = createContext<React.RefObject<Lenis | null> | null>(null);

/** Smooth-scrolls to a section id, falling back to native scrolling. */
export function useScrollTo() {
  const lenisRef = useContext(LenisContext);
  return (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = lenisRef?.current;
    if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      motionStore.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      motionStore.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    motionStore.scrollPx = window.scrollY;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        motionStore.scrollProgress = max > 0 ? window.scrollY / max : 0;
        motionStore.scrollPx = window.scrollY;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", onScroll);
      };
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      autoRaf: true,
    });

    lenis.on("scroll", (l: Lenis) => {
      motionStore.scrollProgress = l.progress || 0;
      motionStore.scrollVelocity = l.velocity;
      motionStore.scrollPx = l.scroll;
    });

    lenisRef.current = lenis;

    return () => {
      window.removeEventListener("pointermove", onPointer);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}
