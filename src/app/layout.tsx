import type { Metadata } from "next";
import "./globals.css";
import Navegacao from "@/components/historia/Navegacao";
import Rodape from "@/components/historia/Rodape";
import { SITE_URL } from "@/data/site";

const DESCRICAO =
  "Sou de Maputo e vivo em Lisboa. Passei a vida a juntar pessoas, na pista e nas festas que criei, e agora construo apps, sites e ferramentas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yuri Dagot · De Maputo a Lisboa",
    template: "%s · Yuri Dagot",
  },
  description: DESCRICAO,
  keywords: ["Yuri Dagot", "Dagô", "Maputo", "Lisboa", "programador", "apps", "websites", "DJ", "portfolio"],
  authors: [{ name: "Yuri Dagot" }],
  creator: "Yuri Dagot",
  openGraph: {
    title: "Yuri Dagot · De Maputo a Lisboa",
    description: DESCRICAO,
    url: SITE_URL,
    siteName: "Yuri Dagot",
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuri Dagot · De Maputo a Lisboa",
    description: DESCRICAO,
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
  alternateName: ["Dagô", "WhyViiDee", "dagotinho"],
  jobTitle: "Programador e DJ",
  birthPlace: "Maputo, Moçambique",
  homeLocation: "Lisboa, Portugal",
  url: SITE_URL,
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
    <html lang="pt">
      <head>
        <link rel="preload" href="/fonts/zodiak-700.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/satoshi-400.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navegacao />
        {children}
        <Rodape />
      </body>
    </html>
  );
}
