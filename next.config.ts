import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site (out/), deployed to GitHub Pages by .github/workflows/deploy.yml.
  output: "export",
  // Emit /en/index.html instead of /en.html, which static hosts like GitHub Pages serve directly.
  trailingSlash: true,
  // e.g. "/personal-wesite3.0" for a GitHub Pages project site; empty locally.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  experimental: {
    // Root layouts live under app/[lang] and app/(root), so unmatched URLs need app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
