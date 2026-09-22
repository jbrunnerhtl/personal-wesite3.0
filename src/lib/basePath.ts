// Sub-path the site is served from, e.g. "/personal-wesite3.0" on GitHub Pages project sites.
// Set at build time by the deploy workflow; empty for local builds and custom domains.
// next/link and metadata handle this automatically; plain <a> hrefs and history calls must use it.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Home URL of a locale, with trailing slash to match the static export's folder layout. */
export const localePath = (locale: string) => `${BASE_PATH}/${locale}/`;
