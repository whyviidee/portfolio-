import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yuridagot.dev"),
  title: {
    default: "Yuri Dagot — Full-Stack Developer",
    template: "%s — Yuri Dagot",
  },
  description:
    "Full-stack developer from Mozambique. Building mobile apps, SaaS platforms, and websites that ship.",
  keywords: ["developer", "full-stack", "mozambique", "react", "next.js", "mobile", "expo", "portfolio"],
  authors: [{ name: "Yuri Dagot" }],
  creator: "Yuri Dagot",
  openGraph: {
    title: "Yuri Dagot — Full-Stack Developer",
    description: "Building apps, platforms & websites — from Mozambique to the world.",
    url: "https://yuridagot.dev",
    siteName: "Yuri Dagot",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuri Dagot — Full-Stack Developer",
    description: "Building apps, platforms & websites — from Mozambique to the world.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yuri Dagot",
  alternateName: "DJ Dagô",
  jobTitle: "Full-Stack Developer",
  url: "https://yuridagot.dev",
  sameAs: [
    "https://github.com/whyviidee",
    "https://linkedin.com/in/whyviidee",
    "https://instagram.com/deejay.dago",
  ],
  knowsAbout: ["React", "Next.js", "React Native", "Expo", "Supabase", "TypeScript", "Node.js", "Python"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Cursor />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
