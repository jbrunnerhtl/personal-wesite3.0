// Language-independent facts, sourced from https://github.com/jbrunnerhtl
// (profile README, public repositories, their READMEs and source trees).
// Translatable copy (titles, descriptions, notes) lives in src/i18n/dictionaries.

import type { Dictionary } from "@/i18n/dictionaries/en";

export type ProjectId = keyof Dictionary["projects"]["items"];
export type RepoName = keyof Dictionary["projects"]["repoNotes"];

export interface ProjectItem {
  id: ProjectId;
  repo: string;
  language: string;
  stack: string[];
  demoUrl?: string;
  year: string;
}

export interface SkillGroup {
  id: keyof Dictionary["skills"]["groups"];
  items: string[];
}

const GITHUB = "https://github.com/jbrunnerhtl";

export const PORTFOLIO_DATA = {
  profile: {
    name: "Jan Brunner",
    handle: "jbrunnerhtl",
    email: "brunnerjan1102@gmail.com",
    school: "HTL Leonding",
    codingSince: 2022,
    githubUrl: GITHUB,
    websiteV2: "https://jbrunnerhtl.github.io/personal-website2.0/",
  },
  // Used when the GitHub API is unreachable at build/revalidate time.
  fallbackStats: {
    publicRepos: 26,
    followers: 11,
  },
  projects: [
    {
      id: "fruit-auth",
      repo: "FruitAuthDBFrontend",
      language: "TypeScript",
      stack: ["TypeScript", "Express", "JWT", "bcrypt", "SQLite"],
      year: "2026",
    },
    {
      id: "crow",
      repo: "Crow-demo-backend",
      language: "C++",
      stack: ["C++", "Crow", "CMake", "REST"],
      year: "2026",
    },
    {
      id: "driving-tracker",
      repo: "DrivingTracker",
      language: "Java",
      stack: ["Java", "JavaFX", "H2", "JUnit", "Maven"],
      demoUrl: "https://jbrunnerhtl.github.io/Driving_Tracker_Java_Docs/",
      year: "2026",
    },
    {
      id: "rpn",
      repo: "RpnCalculator",
      language: "C#",
      stack: ["C#", ".NET 8", "Avalonia", "xUnit"],
      year: "2025",
    },
    {
      id: "online-shop",
      repo: "Online-Shop",
      language: "TypeScript",
      stack: ["React", "TypeScript", "Vite", "React Router", "json-server"],
      year: "2025",
    },
    {
      id: "fitness",
      repo: "Project-Fitness-and-Health",
      language: "JavaScript",
      stack: ["HTML", "CSS", "JavaScript", "Auth0"],
      demoUrl:
        "https://jbrunnerhtl.github.io/Project-Fitness-and-Health/fitness-and-health-website/Mainpage/",
      year: "2025",
    },
  ] satisfies ProjectItem[],
  moreRepos: [
    { name: "quarus-db-syp", language: "Java" },
    { name: "Rust-Todo-List", language: "Rust" },
    { name: "Address-Book", language: "Java" },
    { name: "Medical", language: "Java" },
    { name: "Cryptographie", language: "C#" },
    { name: "Leetcode", language: "C#" },
    { name: "personal-website2.0", language: "TypeScript" },
  ] satisfies { name: RepoName; language: string }[],
  skills: [
    { id: "languages", items: ["Java", "TypeScript", "C#", "C++", "Rust", "SQL", "PL/SQL", "Shell"] },
    { id: "frameworks", items: ["React", "Express", "JavaFX", "Quarkus", "Avalonia", "Crow"] },
    { id: "data", items: ["PostgreSQL", "SQLite", "H2"] },
    { id: "tooling", items: ["Git", "Docker", "Kubernetes", "Maven", "CMake", "AsciiDoc", "Linux"] },
  ] satisfies SkillGroup[],
};

export const repoUrl = (repo: string) => `${GITHUB}/${repo}`;
