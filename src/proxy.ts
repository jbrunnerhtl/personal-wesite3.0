import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE, LOCALE_HEADER, hasLocale, type Locale } from "@/i18n/config";

/** Explicit choice (cookie) first, then the browser's Accept-Language, then the default. */
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(saved)) return saved;

  const ranked = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter((l) => l.base && !Number.isNaN(l.q))
    .sort((a, b) => b.q - a.q);

  return ranked.map((l) => l.base).find(hasLocale) ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefix = LOCALES.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (prefix) {
    // Tell the global 404 (which has no [lang] param) which language to render.
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, prefix);
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  // Depends on cookie + Accept-Language, so it must not be cached as one shared redirect.
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Skip Next internals and anything that looks like a file (favicon.ico, images, …).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
