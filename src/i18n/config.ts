export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
/** Remembers an explicit language choice; read by the proxy on the next visit to "/". */
export const LOCALE_COOKIE = "lang";
/** Set by the proxy on every request, so pages outside the [lang] layout (the global 404) know the locale. */
export const LOCALE_HEADER = "x-locale";

export const hasLocale = (value: string | undefined): value is Locale =>
  !!value && (LOCALES as readonly string[]).includes(value);

/** Replaces {name} placeholders, e.g. fmt("All {n} repos", { n: 26 }). */
export function fmt(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}
