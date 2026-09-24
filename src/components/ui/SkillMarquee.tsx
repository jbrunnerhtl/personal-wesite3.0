"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

/** Constant drift in px/s. */
const SPEED = 40;

interface Row {
  track: HTMLElement;
  set: HTMLElement;
  /** 1 moves left, -1 moves right. */
  dir: 1 | -1;
  offset: number;
  visible: boolean;
}

/**
 * One rAF loop for all rows, running only while a row is on screen and the tab is visible.
 * Transforms are written directly, so nothing re-renders.
 */
const rows = new Set<Row>();
let frame = 0;
let last = 0;

function tick(now: number) {
  // Clamp only real stalls (e.g. a debugger pause), so slow devices still move at the same speed.
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;
  for (const row of rows) {
    if (!row.visible) continue;
    const width = row.set.offsetWidth;
    if (!width) continue;
    row.offset = (((row.offset + SPEED * row.dir * dt) % width) + width) % width;
    row.track.style.transform = `translate3d(${-row.offset}px, 0, 0)`;
  }
  frame = requestAnimationFrame(tick);
}

function updateLoop() {
  const shouldRun = !document.hidden && [...rows].some((r) => r.visible);
  if (shouldRun && !frame) {
    last = performance.now();
    frame = requestAnimationFrame(tick);
  } else if (!shouldRun && frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

if (typeof document !== "undefined") document.addEventListener("visibilitychange", updateLoop);

function SkillList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="marquee-set">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span>{item}</span>
          <span aria-hidden className="px-4 text-faint sm:px-6">
            ·
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A group of skills as one endlessly looping line. The server renders the real list once (static
 * and wrapping without JS or with reduced motion); after mount, hidden copies fill the width.
 */
export default function SkillMarquee({
  label,
  items,
  direction = 1,
}: {
  label: string;
  items: string[];
  direction?: 1 | -1;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(0);

  // Enough copies to cover the viewport plus one set, so the wrap point is never visible.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const viewport = viewportRef.current!;
    const set = setRef.current!;
    const measure = () => {
      const width = set.offsetWidth;
      if (width) setCopies(Math.ceil(viewport.offsetWidth / width) + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(set);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const row: Row = { track: trackRef.current!, set: setRef.current!, dir: direction, offset: 0, visible: false };
    rows.add(row);
    const observer = new IntersectionObserver(([entry]) => {
      row.visible = entry.isIntersecting;
      updateLoop();
    });
    observer.observe(viewportRef.current!);
    return () => {
      observer.disconnect();
      rows.delete(row);
      updateLoop();
    };
  }, [direction]);

  return (
    <div>
      <h3 className="eyebrow mb-3 sm:mb-4">{label}</h3>
      <div ref={viewportRef} className="marquee-viewport">
        <div
          ref={trackRef}
          className="marquee-track text-[clamp(1.5rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-fg"
        >
          <div ref={setRef} className="marquee-set">
            <SkillList items={items} label={label} />
          </div>
          {Array.from({ length: copies }, (_, i) => (
            <div key={i} aria-hidden inert className="marquee-set">
              <SkillList items={items} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
