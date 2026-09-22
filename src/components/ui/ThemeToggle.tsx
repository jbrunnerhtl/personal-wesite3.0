"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { setThemePref, useThemePref, type ThemePref } from "@/lib/theme";
import { useI18n } from "@/i18n/I18nProvider";
import { fmt } from "@/i18n/config";

const ORDER: ThemePref[] = ["dark", "light", "system"];
const ICON: Record<ThemePref, typeof Sun> = { dark: Moon, light: Sun, system: Monitor };

/** Cycles dark → light → system. */
export default function ThemeToggle() {
  const pref = useThemePref();
  const { t } = useI18n();
  const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
  const Icon = ICON[pref];
  const current = t.theme[pref];

  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setThemePref(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      className="relative grid h-10 w-10 place-items-center md:h-8 md:w-8 overflow-hidden rounded-full text-muted transition-colors hover:bg-tint/[0.06] hover:text-fg"
      aria-label={fmt(t.theme.ariaLabel, { current, next: t.theme[next] })}
      title={fmt(t.theme.title, { current })}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={pref}
          initial={{ y: 14, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          <Icon className="h-4 w-4" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
