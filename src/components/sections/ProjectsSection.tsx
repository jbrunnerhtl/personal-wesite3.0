"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { CountUpText } from "@/components/ui/AnimatedCounter";
import { PORTFOLIO_DATA, repoUrl } from "@/data/portfolioData";
import { useI18n } from "@/i18n/I18nProvider";
import { fmt } from "@/i18n/config";

// GitHub's own language colors.
const LANG_COLOR: Record<string, string> = {
  Java: "#b07219",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "C#": "#178600",
  "C++": "#f34b7d",
  Rust: "#dea584",
  HTML: "#e34c26",
};

function LangDot({ language }: { language: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span className="h-2 w-2 rounded-full" style={{ background: LANG_COLOR[language] ?? "#8b949e" }} />
      {language}
    </span>
  );
}

export default function ProjectsSection({ repoCount }: { repoCount: number }) {
  const { t } = useI18n();
  const { projects, moreRepos, profile } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
      <SectionHeader
        index="02"
        label={t.projects.label}
        title={
          <>
            {t.projects.title} <span className="text-chrome">{t.projects.titleHighlight}</span>
          </>
        }
      >
        {t.projects.intro}
      </SectionHeader>

      <StaggerContainer className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <StaggerItem key={p.id} className="h-full min-w-0">
            <article className="card card-hover group relative flex h-full flex-col p-5 sm:p-8">
              <div className="flex items-center justify-between">
                <LangDot language={p.language} />
                <span className="flex items-center gap-3">
                  {p.teamSize && (
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                      {fmt(t.projects.team, { n: p.teamSize })}
                    </span>
                  )}
                  <span className="font-mono text-xs text-faint">{p.year}</span>
                </span>
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight text-fg sm:mt-6 sm:text-2xl">
                <a href={p.repoUrl ?? repoUrl(p.repo)} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                  {t.projects.items[p.id].title}
                </a>
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{t.projects.items[p.id].description}</p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-5 text-sm">
                <span className="inline-flex min-w-0 items-center gap-2 text-muted transition-colors group-hover:text-fg">
                  <GithubIcon className="h-4 w-4 shrink-0" /> <span className="truncate">{p.repoLabel ?? p.repo}</span>
                </span>
                {p.demoUrl ? (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 -my-2 inline-flex shrink-0 items-center gap-1 py-2 pl-3 text-accent hover:underline"
                  >
                    {t.projects.live} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-faint transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                )}
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn className="mt-16 sm:mt-20">
        <div className="eyebrow mb-4">{t.projects.more}</div>
        <ul className="divide-y divide-line border-y border-line">
          {moreRepos.map((r) => (
            <li key={r.name}>
              <a
                href={repoUrl(r.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 py-4 transition-colors hover:bg-tint/[0.02] sm:gap-4 sm:px-2"
              >
                <span className="min-w-0 flex-1 truncate font-medium text-fg sm:w-56 sm:flex-none">{r.name}</span>
                <span className="hidden flex-1 truncate text-sm text-muted sm:block">{t.projects.repoNotes[r.name]}</span>
                <span className="shrink-0 sm:w-28">
                  <LangDot language={r.language} />
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button variant="secondary" href={`${profile.githubUrl}?tab=repositories`} icon={<ArrowUpRight className="h-4 w-4" />}>
            <CountUpText template={t.projects.all} n={repoCount} />
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
