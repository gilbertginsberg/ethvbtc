import type { MetadataRoute } from "next";

const BASE_URL = "https://ethvbtc.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default: allow every crawler, including AI/answer-engine bots
        // (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) so the
        // site is eligible to be crawled and cited by generative search
        // and AI assistants (GEO), not just traditional search engines.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
