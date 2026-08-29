import type { Metadata } from "next";
import { Roboto } from "next/font/google";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
