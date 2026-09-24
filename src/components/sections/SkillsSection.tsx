"use client";

import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/MotionWrapper";
import SkillMarquee from "@/components/ui/SkillMarquee";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { useI18n } from "@/i18n/I18nProvider";

export default function SkillsSection() {
  const { t } = useI18n();
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
      <SectionHeader
        index="03"
        label={t.skills.label}
        title={
          <>
            {t.skills.title} <span className="text-chrome">{t.skills.titleHighlight}</span>
          </>
        }
      >
        {t.skills.intro}
      </SectionHeader>

      <FadeIn className="space-y-8 sm:space-y-10">
        {PORTFOLIO_DATA.skills.map((group, i) => (
          <SkillMarquee key={group.id} label={t.skills.groups[group.id]} items={group.items} direction={i % 2 ? -1 : 1} />
        ))}
      </FadeIn>
    </section>
  );
}
