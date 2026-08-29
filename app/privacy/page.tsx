import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — ETH vs BTC",
  description: "How ethvbtc.com collects, uses, and protects information.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated="August 29, 2026">
      <p>
        This Privacy Policy explains what information ethvbtc.com (&ldquo;the
        Site,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects when you visit, and how
        that information is used. The Site is a free, informational cryptocurrency market
        data tracker. We don&rsquo;t require an account and don&rsquo;t knowingly collect
        more information than described below.
      </p>

      <h2>Information we collect</h2>
      <p>We collect two categories of information automatically as you use the Site:</p>
      <ul>
        <li>
          <strong>Usage analytics.</strong> We use analytics tools to understand aggregate
          traffic and feature usage — for example, which sections of the page get scrolled
          to, or which chart timeframe is used most. This helps us decide what to build
          next.
        </li>
        <li>
          <strong>Advertising cookies.</strong> If ad slots on the Site are active, our
          advertising partner(s) may set cookies or use similar technologies to serve and
          measure ads.
        </li>
      </ul>

      <h2>Analytics providers we use</h2>
      <p>The Site uses the following analytics services:</p>
      <ul>
        <li>
          <strong>Vercel Analytics</strong> — a privacy-focused, cookie-less analytics
          service that reports aggregate page views and Core Web Vitals. It does not use
          cookies or track individuals across sites.
        </li>
        <li>
          <strong>Matomo Analytics</strong> — a self-hosted or cloud-based analytics
          platform we use to understand visitor behavior on the Site (e.g. page views,
          session duration, and which features like the ratio chart&rsquo;s timeframe
          toggle are used most). Matomo may use cookies to distinguish visitors and
          sessions. Where required by applicable law, Matomo is configured to respect
          Do Not Track signals and to anonymize IP addresses.
        </li>
      </ul>
      <p>
        Neither analytics provider is used to identify you personally. Data collected is
        aggregated and used only to improve the Site.
      </p>

      <h2>Advertising</h2>
      <p>
        The Site is designed to display ads via Google AdSense and, potentially, other
        advertising networks. These providers may use cookies or device identifiers to
        serve ads relevant to you and to measure ad performance. You can opt out of
        personalized advertising through{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>{" "}
        or via{" "}
        <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">
          aboutads.info
        </a>
        .
      </p>

      <h2>Third-party market data</h2>
      <p>
        Price, market cap, and volume data displayed on the Site is sourced from the{" "}
        <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">
          CoinGecko
        </a>{" "}
        API. Your browser or our server fetches this data to render the Site; CoinGecko&rsquo;s
        own privacy practices apply to that request.
      </p>

      <h2>Cookies</h2>
      <p>
        Cookies set on this Site are used for analytics (Matomo) and advertising purposes
        as described above. You can control or delete cookies through your browser
        settings at any time. Blocking cookies may affect ad personalization but will not
        prevent the Site&rsquo;s core data and charts from working.
      </p>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        The Site is not directed at children under 13, and we do not knowingly collect
        personal information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on
        this page with an updated &ldquo;Last updated&rdquo; date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this Privacy Policy can be sent to the site operator via the
        contact details listed on ethvbtc.com.
      </p>
    </LegalPage>
  );
}
