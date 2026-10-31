import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const serifDisplay = Source_Serif_4({
  variable: "--font-serif-display",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Accounting, Tax & Advisory Services in Fort Lauderdale | NexGen Financial Experts",
    template: "%s | NexGen Financial Experts",
  },
  description: site.description,
  keywords: [
    "accounting services Fort Lauderdale",
    "tax preparation Fort Lauderdale",
    "bookkeeping Fort Lauderdale",
    "business tax services Florida",
    "fractional CFO startup",
    "audit services Fort Lauderdale",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Accounting, Tax & Advisory Services in Fort Lauderdale | NexGen Financial Experts",
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: "NexGen Financial Experts",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1f3a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${serifDisplay.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
