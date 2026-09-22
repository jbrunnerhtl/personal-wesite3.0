"use client";

import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
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

      <StaggerContainer className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO_DATA.skills.map((group) => (
          <StaggerItem key={group.id} className="min-w-0 bg-bg p-5 sm:p-8">
            <h3 className="eyebrow mb-5">{t.skills.groups[group.id]}</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:block sm:space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
