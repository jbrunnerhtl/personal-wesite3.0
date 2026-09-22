import type { Metadata } from "next";
import { headers } from "next/headers";
import { ArrowLeft } from "lucide-react";
import "./globals.css";
import { fontClasses } from "./fonts";
import FallbackBackground from "@/components/3d/FallbackBackground";
import GithubIcon from "@/components/icons/GithubIcon";
import Button from "@/components/ui/Button";
import { THEME_INIT_SCRIPT } from "@/lib/themeScript";
import { DEFAULT_LOCALE, LOCALE_HEADER, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

// Rendered for every unmatched URL. It bypasses the [lang] layout, so it brings its own <html>,
// fonts, styles and theme script; the locale comes from the header the proxy sets.
async function locale() {
  const value = (await headers()).get(LOCALE_HEADER) ?? undefined;
  return hasLocale(value) ? value : DEFAULT_LOCALE;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary(await locale());
  return { title: `${t.notFound.title} — ${PORTFOLIO_DATA.profile.name}` };
}

export default async function GlobalNotFound() {
  const lang = await locale();
  const t = await getDictionary(lang);
  const { profile } = PORTFOLIO_DATA;

  return (
    <html lang={lang} data-theme="dark" className={fontClasses} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="isolate min-h-full bg-bg font-sans text-fg">
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
          <FallbackBackground />
        </div>

        <main className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-start justify-center px-5 py-24 sm:px-8 lg:px-10">
          <a
            href={`/${lang}`}
            className="absolute left-5 top-[max(1.25rem,env(safe-area-inset-top))] flex items-center gap-2.5 text-sm font-medium text-fg sm:left-8 lg:left-10"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-fg text-[11px] font-bold text-bg">JB</span>
            {profile.name}
          </a>

          <p className="eyebrow">
            <span className="text-accent">404</span>
            <span className="mx-2">/</span>
            {t.notFound.title}
          </p>
          {/* Reuses the hero's CSS reveal, so it animates without any client JS. */}
          <h1 className="mt-6 text-[clamp(5rem,22vw,13rem)] font-semibold leading-[0.85] tracking-[-0.06em]">
            <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] pr-[0.06em] -mr-[0.06em]">
              <span className="reveal-word text-chrome inline-block" style={{ animationDelay: "0.1s" }}>
                404
              </span>
            </span>
          </h1>
          <h2 className="mt-8 text-[clamp(1.5rem,4.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-fg">
            {t.notFound.heading}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">{t.notFound.text}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`/${lang}`}>
              <span className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> {t.notFound.back}
              </span>
            </Button>
            <Button variant="secondary" href={profile.githubUrl}>
              <span className="flex items-center gap-2">
                <GithubIcon className="h-4 w-4" /> GitHub
              </span>
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
