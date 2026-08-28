import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
