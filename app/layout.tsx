import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const title = "ETH vs BTC — Live Market Cap Ratio & Flippening Tracker";
const description =
  "Live Ethereum vs Bitcoin market cap ratio, prices, and volume. Track the flippening in real time.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ethvbtc.com"),
  title,
  description,
  keywords: [
    "eth vs btc",
    "flippening",
    "ethereum market cap vs bitcoin",
    "eth btc ratio",
    "flippening tracker",
    "crypto market cap ratio",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: "https://ethvbtc.com",
    siteName: "ETH vs BTC",
    images: ["/api/og"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/api/og"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ETH vs BTC",
  url: "https://ethvbtc.com",
  description,
  publisher: {
    "@type": "Organization",
    name: "ETH vs BTC",
    url: "https://ethvbtc.com",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
      <Script id="matomo-analytics" strategy="beforeInteractive">
        {`
          var _paq = window._paq = window._paq || [];
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="https://geodework.matomo.cloud/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '8']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='https://cdn.matomo.cloud/geodework.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9197346169922497"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
    </html>
  );
}
