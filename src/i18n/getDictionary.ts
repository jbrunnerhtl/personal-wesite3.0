import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.en),
  de: () => import("./dictionaries/de").then((m) => m.de),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
