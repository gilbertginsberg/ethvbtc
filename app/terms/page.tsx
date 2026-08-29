import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — ETH vs BTC",
  description: "Terms governing use of ethvbtc.com.",
};

export default function TermsOfService() {
  return (
    <LegalPage title="Terms of Service" updated="August 29, 2026">
      <p>
        By accessing or using ethvbtc.com (&ldquo;the Site&rdquo;), you agree to these
        Terms of Service. If you don&rsquo;t agree, please don&rsquo;t use the Site.
      </p>

      <h2>Not financial advice</h2>
      <p>
        The Site displays cryptocurrency market data — including prices, market
        capitalizations, ratios, and hypothetical or illustrative projections (such as the
        &ldquo;flippening&rdquo; price and growth-rate estimates) — for informational and
        educational purposes only. Nothing on the Site is, or should be construed as,
        financial, investment, legal, or tax advice, or a recommendation to buy, sell, or
        hold any asset. Cryptocurrency markets are volatile; always do your own research
        and consult a qualified professional before making financial decisions.
      </p>

      <h2>Data accuracy</h2>
      <p>
        Market data is sourced from third parties, primarily the CoinGecko API, and is
        provided &ldquo;as is.&rdquo; We cache and refresh data on a delay (typically
        seconds to minutes) and cannot guarantee it is complete, accurate, or current at
        any given moment. If our upstream data source is unavailable, the Site may
        display cached data with a notice. We are not liable for decisions made based on
        data shown on the Site.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Scrape, cache, or redistribute the Site&rsquo;s data at a scale that degrades service for other users;</li>
        <li>Attempt to circumvent rate limits, caching, or other technical protections;</li>
        <li>Use the Site for any unlawful purpose or in a way that infringes the rights of others.</li>
      </ul>

      <h2>Advertising and third-party links</h2>
      <p>
        The Site may display ads (e.g. via Google AdSense) and affiliate links (e.g. to
        cryptocurrency exchanges). We are not responsible for the content, accuracy, or
        practices of third-party sites linked from or advertised on the Site. Some links
        may be affiliate links, meaning we may earn a commission if you sign up or
        transact through them, at no extra cost to you.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Site&rsquo;s design, layout, and original content are owned by the Site
        operator. Market data displayed remains the property of its respective source
        (CoinGecko). The Bitcoin and Ethereum names and marks belong to their respective
        communities/projects and are used here for identification purposes only.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
        warranties of any kind, express or implied, including fitness for a particular
        purpose, non-infringement, or uninterrupted availability.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, the Site operator will not be liable for
        any indirect, incidental, or consequential damages, including financial losses,
        arising from your use of or reliance on the Site.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Site after
        changes are posted constitutes acceptance of the updated Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms can be sent to the site operator via the contact
        details listed on ethvbtc.com.
      </p>
    </LegalPage>
  );
}
