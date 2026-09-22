import { PORTFOLIO_DATA } from "@/data/portfolioData";

export interface GithubStats {
  publicRepos: number;
  followers: number;
  topLanguages: string[];
}

interface RepoResponse {
  language: string | null;
  fork: boolean;
}

// Markup/scripting noise, plus languages deliberately not featured on the site.
const EXCLUDED_LANGUAGES = new Set(["Shell", "HTML", "Prolog"]);

const API = `https://api.github.com/users/${PORTFOLIO_DATA.profile.handle}`;
const init = {
  headers: { Accept: "application/vnd.github+json" },
  next: { revalidate: 3600 },
};

/** Live profile numbers from the GitHub API, refreshed hourly; falls back to static values. */
export async function getGithubStats(): Promise<GithubStats> {
  const fallback: GithubStats = {
    ...PORTFOLIO_DATA.fallbackStats,
    topLanguages: ["Java", "TypeScript", "C#"],
  };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(API, init),
      fetch(`${API}/repos?per_page=100`, init),
    ]);
    if (!userRes.ok || !reposRes.ok) return fallback;

    const user = (await userRes.json()) as { public_repos: number; followers: number };
    const repos = (await reposRes.json()) as RepoResponse[];

    const counts = new Map<string, number>();
    for (const r of repos) {
      if (r.fork || !r.language || EXCLUDED_LANGUAGES.has(r.language)) continue;
      counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    }
    const topLanguages = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([lang]) => lang);

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      topLanguages: topLanguages.length ? topLanguages : fallback.topLanguages,
    };
  } catch {
    return fallback;
  }
}
