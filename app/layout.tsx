import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
// Aliased so `Analytics` never reads as this project's own analytics helper.
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import PageViewTracker from "@/components/PageViewTracker";
import { site } from "@/lib/content";
import "./globals.css";

// Loaded site-wide (next/font requires this at the root) but only ever
// referenced from the hero via CSS variables — every other section keeps
// the existing system-font stack untouched.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const title = "BUY OR PASS | Pokémon Card Decision System";
const description =
  "Learn how to evaluate Pokémon cards using price, demand, scarcity, population, liquidity and grading data before deciding whether to buy, negotiate, wait or pass.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.url),
  title,
  description,
  applicationName: site.name,
  keywords: [
    "Pokémon card investing",
    "PSA grading",
    "card valuation",
    "collectible investing",
    "card market analysis",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`min-h-dvh antialiased ${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
      >
        <PageViewTracker />
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
