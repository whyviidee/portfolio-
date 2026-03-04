export type Project = {
  slug: string;
  title: string;
  type: string;
  description: string;
  longDescription: string;
  tech: string[];
  color: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  problem: string;
  solution: string;
  result: string;
};

export const projects: Project[] = [
  {
    slug: "agendadj",
    title: "AgendaDJ",
    type: "Mobile App",
    description: "Platform connecting DJs with fans and event organizers across Mozambique.",
    longDescription:
      "Full-stack mobile platform built for the DJ ecosystem — booking, events, backstage access, AI-powered tools, and real-time communities.",
    tech: ["Expo", "React Native", "TypeScript", "Supabase", "PostgreSQL", "Edge Functions", "OpenAI"],
    color: "#F59E0B",
    year: "2025 — In Progress",
    problem:
      "DJs in Mozambique had no centralized platform to manage bookings, share events, and connect with fans. Information was scattered across WhatsApp groups and Instagram.",
    solution:
      "Built a full mobile app with event management, AI event import from images/text, real-time community chat, press kits, and a multi-tenant booking system.",
    result:
      "40+ screens, 20 database tables, 8 edge functions, AI multi-event import, communities with real-time messaging, and press kit generation.",
  },
  {
    slug: "lisboa-rio",
    title: "Lisboa Rio",
    type: "Design Concept",
    description: "Mobile app concept for a Lisbon riverside club — loyalty, events, and VIP access.",
    longDescription:
      "Design concept for a native mobile experience for Lisboa Rio club, exploring loyalty rewards, event discovery, QR tickets, referral mechanics, and engagement-driven UX.",
    tech: ["Expo", "React Native", "TypeScript", "Figma"],
    color: "#3B82F6",
    year: "2026 — Proposal",
    problem: "Clubs rely on Instagram and third-party platforms with no direct loyalty channel or branded experience for their regulars.",
    solution:
      "Designed a native app concept with loyalty point system, event browsing, QR ticket scanning, tier-based benefits, and referral mechanics.",
    result: "Full design concept with 10+ screens — login, events, QR tickets, virtual card, loyalty program, and engagement features.",
  },
  {
    slug: "tokyo-jamaica",
    title: "Tokyo Jamaica",
    type: "Design Concept",
    description: "Redesign concept for a music streaming app — dark aesthetic, fluid interactions.",
    longDescription:
      "UI/UX redesign concept for a music app, exploring dark glassmorphism aesthetics, micro-interactions, and fluid navigation patterns.",
    tech: ["Figma", "React Native", "Framer Motion", "Glassmorphism"],
    color: "#8B5CF6",
    year: "2026 — Proposal",
    problem: "Music apps feel generic. Most follow the same tired Spotify-clone layout with no personality.",
    solution:
      "Explored a bold dark aesthetic with glassmorphism, animated waveforms, gesture-based navigation, and a unique visual identity.",
    result: "High-fidelity prototype with custom components, demonstrating advanced UI/UX and animation capabilities.",
  },
  {
    slug: "txx-app",
    title: "TxxTxxTxx",
    type: "Web App",
    description: "Private social app for a friend group — xitique tracker, trips, and AI games.",
    longDescription:
      "Mobile-first web app for a Mozambican friend group of 12. Manages their xitique (rotating savings), trip planning, AI-powered roasts, and social games.",
    tech: ["React", "TypeScript", "Vite", "OpenAI API"],
    color: "#A855F7",
    year: "2025",
    problem: "Managing a xitique, tracking who paid, and coordinating group trips across WhatsApp was chaos.",
    solution:
      "Built a private app with rotating payment schedules, MB WAY shortcuts, trip modules, member profiles, and AI roast generator — Mozambican context built-in.",
    result: "Used by 12 members. Xitique tracking, trip coordination, and AI-powered social games all in one place.",
  },
  {
    slug: "dj-webpage",
    title: "DJ Dagô Website",
    type: "Website",
    description: "Personal booking website for DJ Dagô — events, contact, and direct booking.",
    longDescription:
      "Fast static website for DJ Dagô's booking and event presence, with upcoming events listing and direct WhatsApp booking CTA.",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "#F97316",
    year: "2025",
    problem: "As a DJ active across Portugal and Mozambique, I needed a direct booking channel beyond Instagram.",
    solution: "Built a minimal, fast static site with event listings, booking info, and direct WhatsApp CTA. No frameworks, no bloat.",
    result: "Live booking page for DJ Dagô, clean dark aesthetic matching the brand, used for direct bookings and event discovery.",
  },
  {
    slug: "rna-tours",
    title: "RNA Tours",
    type: "Website",
    description: "Tourism website for a Lisbon-based travel agency — clean, fast, multilingual.",
    longDescription:
      "Clean marketing website for a Lisbon tourism company, with tour listings, booking inquiries, and multilingual support.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    color: "#10B981",
    year: "2026 — Proposal",
    problem: "The agency had an outdated website that wasn't converting visitors into bookings.",
    solution: "Built a fast, modern site with clear tour pages, contact forms, and optimized for SEO and performance.",
    result: "Deployed on Vercel with 95+ Lighthouse score, multilingual routes, and a clean conversion-focused design.",
  },
  {
    slug: "discord-bot-ai",
    title: "Discord AI Bot",
    type: "Bot / API",
    description: "AI-powered Discord bot — context-aware conversations, moderation, and commands.",
    longDescription:
      "Discord bot powered by Claude API with context-aware multi-turn conversations, server moderation tools, and custom slash commands.",
    tech: ["Node.js", "Discord.js", "Claude API", "TypeScript"],
    color: "#6366F1",
    year: "2025",
    problem: "Discord communities need intelligent bots that actually understand context, not just pattern-match commands.",
    solution:
      "Built a bot using Claude API for multi-turn conversations with memory, custom moderation workflows, and extensible command system.",
    result: "Deployed bot handling multi-turn AI conversations, server moderation, and 10+ custom slash commands.",
  },
];
