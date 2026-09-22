"use client";

import { useSyncExternalStore } from "react";
import { LIGHT_QUERY, STORAGE_KEY } from "./themeScript";

export type ThemePref = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

function resolve(pref: ThemePref): ResolvedTheme {
  if (pref !== "system") return pref;
  return window.matchMedia(LIGHT_QUERY).matches ? "light" : "dark";
}

// The <html> attributes are the single source of truth; React subscribes to them.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme", "data-theme-pref"] });

  // Follow the OS setting live while in "system" mode.
  const media = window.matchMedia(LIGHT_QUERY);
  const onMedia = () => {
    if (readPref() === "system") document.documentElement.setAttribute("data-theme", resolve("system"));
  };
  media.addEventListener("change", onMedia);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onMedia);
  };
}

const readPref = () => (document.documentElement.getAttribute("data-theme-pref") as ThemePref) || "system";
const readResolved = () => (document.documentElement.getAttribute("data-theme") as ResolvedTheme) || "dark";

export function useThemePref(): ThemePref {
  return useSyncExternalStore(subscribe, readPref, () => "system");
}

export function useResolvedTheme(): ResolvedTheme {
  return useSyncExternalStore(subscribe, readResolved, () => "dark");
}

/** Applies a mode, with a circular reveal from `origin` where View Transitions are supported. */
export function setThemePref(pref: ThemePref, origin?: { x: number; y: number }) {
  try {
    localStorage.setItem(STORAGE_KEY, pref);
  } catch {
    // Private mode or blocked storage: the mode still applies for this visit.
  }

  const root = document.documentElement;
  const next = resolve(pref);
  const apply = () => {
    root.setAttribute("data-theme", next);
    root.setAttribute("data-theme-pref", pref);
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (next === readResolved() || reduceMotion || !document.startViewTransition || !origin) {
    apply();
    return;
  }

  const transition = document.startViewTransition(apply);
  const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => {});
}
