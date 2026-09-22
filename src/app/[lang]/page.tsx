import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import { getGithubStats } from "@/lib/github";

// Copy comes from the I18nProvider in the [lang] layout; GitHub stats are shared across locales.
export default async function Home() {
  const stats = await getGithubStats();

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection stats={stats} />
      <AboutSection />
      <ProjectsSection repoCount={stats.publicRepos} />
      <SkillsSection />
      <ContactSection followers={stats.followers} />
    </main>
  );
}
