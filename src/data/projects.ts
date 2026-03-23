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
  highlights: { label: string; value: string }[];
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
    highlights: [
      { label: "Screens", value: "40+" },
      { label: "DB Tables", value: "20" },
      { label: "Edge Functions", value: "8" },
      { label: "AI Features", value: "3" },
    ],
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
    highlights: [
      { label: "Commands", value: "10+" },
      { label: "AI Model", value: "Claude" },
      { label: "Uptime", value: "24/7" },
    ],
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
    highlights: [
      { label: "Load Time", value: "<1s" },
      { label: "Stack", value: "Static" },
      { label: "Bookings", value: "Direct" },
    ],
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
    highlights: [
      { label: "Screens", value: "10+" },
      { label: "Features", value: "6" },
      { label: "Type", value: "Concept" },
    ],
  },
  {
    slug: "musictolegal",
    title: "MUSICTOLEGAL",
    type: "Web App",
    description: "DJ library scanner — identifies tracks via audio fingerprinting and generates a legal purchase shopping list.",
    longDescription:
      "Full-stack tool for DJs to scan their music library, identify every track using acoustic fingerprinting and multiple fallback methods, and get direct purchase links to legalize their collection for ASAE inspections.",
    tech: ["Python", "Flask", "AcoustID", "MusicBrainz", "iTunes API", "Chromaprint"],
    color: "#1DB954",
    year: "2026",
    problem:
      "In Portugal, DJs need proof of purchase for every track they play publicly. Manually identifying hundreds of downloaded tracks and finding where to buy each one is impossible.",
    solution:
      "Built an 8-phase scan pipeline — acoustic fingerprinting, API identification, metadata matching, iTunes filename search, mashup/remix detection, and store link verification. Web UI with per-track rescan, filters, and smart store buttons.",
    result:
      "Scans entire DJ libraries, identifies 90%+ of tracks across multiple methods, generates verified purchase links for Beatport, Traxsource, Bandcamp, and iTunes. Detects remixes, mashups, and DJ mixes automatically.",
    highlights: [
      { label: "Match Rate", value: "90%+" },
      { label: "Scan Phases", value: "8" },
      { label: "Stores", value: "4" },
      { label: "Tests", value: "23" },
    ],
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
    highlights: [
      { label: "Lighthouse", value: "95+" },
      { label: "Languages", value: "3" },
      { label: "Deploy", value: "Vercel" },
    ],
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
    highlights: [
      { label: "Style", value: "Glassmorphism" },
      { label: "Animations", value: "12+" },
      { label: "Components", value: "Custom" },
    ],
  },
  {
    slug: "txx-app",
    title: "TxxTxxTxx App",
    type: "Mobile App",
    description: "Private social app for a friend group — xitique tracker, trips, and AI games.",
    longDescription:
      "Native mobile app for a Mozambican friend group of 12. Manages their xitique (rotating savings), trip planning, AI-powered roasts, and social games — with biometric auth and push notifications.",
    tech: ["Expo", "React Native", "TypeScript", "InstantDB", "Expo Router", "Biometrics"],
    color: "#C084FC",
    year: "2026 — In Progress",
    problem: "Managing a xitique, tracking who paid, and coordinating group trips across WhatsApp was chaos.",
    solution:
      "Built a native app with rotating payment schedules, MB WAY shortcuts, trip modules, member profiles, AI roast generator, Face ID/fingerprint auth, and push notifications — Mozambican context built-in.",
    result: "Native app with home dashboard, xitique wallet, trip management, gallery, games, events calendar, and voting — all with native performance and biometric security.",
    highlights: [
      { label: "Members", value: "12" },
      { label: "Modules", value: "7" },
      { label: "Auth", value: "Biometric" },
      { label: "DB", value: "InstantDB" },
    ],
  },
  {
    slug: "library-dj",
    title: "Library DJ",
    type: "Desktop App",
    description: "Desktop app for DJs to organize, clean, and enrich their music library — with AI genre suggestions.",
    longDescription:
      "Native desktop app built for DJs who need to organize thousands of tracks. Scans music folders, reads tags, detects duplicates, suggests genres via AI, and exports smart crates as M3U8 playlists. Built with Tauri and Rust for native performance.",
    tech: ["Tauri v2", "React 19", "Rust", "SQLite", "Zustand", "Gemini AI", "Discogs API"],
    color: "#22D3EE",
    year: "2026",
    liveUrl: "https://librarydj.me",
    problem:
      "DJs accumulate thousands of tracks with messy tags, missing genres, and duplicates. Manually cleaning a library of 16k+ tracks is impossible.",
    solution:
      "Built a desktop app that scans music folders, reads/writes tags, detects duplicates by hash, suggests genres via Gemini AI, looks up metadata on Discogs, and generates smart crates by genre, moment, or energy level.",
    result:
      "MVP published — signed .dmg, virtual scrolling for 16k+ tracks, AI genre suggestions, duplicate detection, smart crate export, backup/restore, and a landing page with protected downloads.",
    highlights: [
      { label: "Tracks", value: "16k+" },
      { label: "Backend", value: "Rust" },
      { label: "AI", value: "Gemini" },
      { label: "Price", value: "€45" },
    ],
  },
  {
    slug: "ika-dogwear",
    title: "Ika Dogwear",
    type: "E-Commerce",
    description: "Handcrafted dog collars and leashes — full e-commerce with admin CMS and order management.",
    longDescription:
      "Full e-commerce platform for a Portuguese artisan brand selling handcrafted paracord and biothane dog accessories. Features a custom admin CMS with inline editing, product management, order tracking, and SEO optimization.",
    tech: ["Next.js 16", "Tailwind v4", "Supabase", "Framer Motion", "Vercel Analytics"],
    color: "#741D28",
    year: "2026",
    problem:
      "A small artisan brand needed an online store that reflected the handmade quality of their products, with full control over content and orders — without paying Shopify fees.",
    solution:
      "Built a custom e-commerce with inline CMS editing, product CRUD, order management with status workflow, CSV export, cookie consent, FAQ accordion, and full SEO with JSON-LD schemas.",
    result:
      "Live store with admin dashboard (overview, products, orders), 95+ Lighthouse score, GDPR compliant, newsletter integration, and ready for Stripe checkout.",
    highlights: [
      { label: "Lighthouse", value: "95+" },
      { label: "Admin Tabs", value: "3" },
      { label: "SEO", value: "JSON-LD" },
      { label: "Deploy", value: "Vercel" },
    ],
  },
  {
    slug: "clutchups",
    title: "ClutchUps",
    type: "Web App",
    description: "Competitive Call of Duty wager platform — real money matches, tournaments, and leaderboards.",
    longDescription:
      "Full-stack competitive gaming platform where players wager real money on Call of Duty matches. Features ELO ranking, map draft system, real-time match flow via Supabase Presence, Stripe payments, LFG system, and an admin dispute resolution panel.",
    tech: ["Next.js 14", "TypeScript", "Supabase", "Stripe", "Realtime Presence"],
    color: "#EF4444",
    year: "2026",
    liveUrl: "https://clutchups.com",
    problem:
      "Competitive CoD players had no trusted platform for money matches with proper dispute resolution, fair matchmaking, and secure payments in the EU market.",
    solution:
      "Built a platform with real-time match flow (queue, ready check, captain vote, map draft, challenge phase, series vote), Stripe deposits/withdrawals, ELO-based leaderboard, report system with admin panel, and LFG posting.",
    result:
      "Live platform with Stripe payments (card, MBWay, PayPal), XP tier system (6 ranks), BO1/BO3/BO5/BO7 series, viewer sidebets, seeded PRNG map roulette, and full dispute resolution workflow.",
    highlights: [
      { label: "Payments", value: "Stripe" },
      { label: "Ranks", value: "6 Tiers" },
      { label: "Realtime", value: "Presence" },
      { label: "Maps", value: "BO7" },
    ],
  },
  {
    slug: "instagram-analytics",
    title: "Instagram Analytics",
    type: "Automation",
    description: "Instagram automation toolkit — analytics, publishing, captions, and content calendar for DJs.",
    longDescription:
      "Python automation suite for managing a DJ Instagram account. Pulls analytics via Meta API, generates captions, schedules posts, and tracks engagement metrics — built for the @deejay.dago account.",
    tech: ["Python", "Meta Graph API", "Instagram API", "Automation"],
    color: "#E1306C",
    year: "2026",
    problem:
      "Managing an Instagram presence as a DJ requires constant posting, tracking what works, and adapting content — all manually across multiple Meta tools.",
    solution:
      "Built 9 Python modules covering analytics dashboards, content publishing, caption generation, posting calendar, and engagement tracking — all connected to the Meta Graph API with long-lived tokens.",
    result:
      "Functional automation suite managing a 9.4k follower account. Best performing: Tuesdays at 9AM, carousels at 2.11% engagement. Publisher ready, ads module pending.",
    highlights: [
      { label: "Followers", value: "9.4k" },
      { label: "Modules", value: "9" },
      { label: "Best Time", value: "Tue 9AM" },
      { label: "Top Format", value: "Carousel" },
    ],
  },
  {
    slug: "songer",
    title: "SONGER",
    type: "Desktop App",
    description: "Music manager for DJs and collectors — library browser, player, Spotify integration, and downloads.",
    longDescription:
      "Desktop music manager built with Python and PyQt6. Browse your library, play tracks with a built-in player, search Spotify, download via yt-dlp, and manage tags with Mutagen — all in one app.",
    tech: ["Python", "PyQt6", "Spotipy", "yt-dlp", "Mutagen", "FFmpeg"],
    color: "#1DB954",
    year: "2025",
    githubUrl: "https://github.com/whyviidee/SONGER",
    problem:
      "DJs and music collectors need a single tool to browse their library, preview tracks, discover new music, and download — without switching between 5 different apps.",
    solution:
      "Built a desktop app with a library browser, built-in audio player, Spotify search integration, yt-dlp downloads, tag editing via Mutagen, and a home view with quick actions.",
    result:
      "v2.0.0 released — Liquid redesign, embedded player, library filters, Spotify integration, YouTube downloads, and cross-platform support.",
    highlights: [
      { label: "Version", value: "v2.0.0" },
      { label: "Player", value: "Built-in" },
      { label: "Downloads", value: "yt-dlp" },
      { label: "Tags", value: "Mutagen" },
    ],
  },
  {
    slug: "theoffice",
    title: "theOFFICE / GRVVE",
    type: "Web App",
    description: "AI-powered marketing system for music events — simulation mode with autonomous agents.",
    longDescription:
      "AI marketing engine for GRVVE event brand (Fiesta Dura, Salero, Bashment, Remember, Apupu). Autonomous agents handle content creation, scheduling, and audience targeting — currently in simulation mode with internal outputs.",
    tech: ["Node.js", "TypeScript", "React", "Phaser 3", "Supabase", "AI Agents"],
    color: "#7C3AED",
    year: "2026 — In Progress",
    problem:
      "Promoting multiple recurring music events across different audiences requires constant manual work — posts, stories, targeting, timing — that doesn't scale.",
    solution:
      "Built an AI agent system where autonomous marketing agents create content, plan campaigns, and simulate audience engagement for each event brand — with a React+Phaser visualization dashboard.",
    result:
      "Simulation mode functional with Express server, AI agents pipeline, and React+Phaser dashboard. Pending: real integrations with Meta Ads and Instagram publishing.",
    highlights: [
      { label: "Events", value: "5 Brands" },
      { label: "Mode", value: "Simulation" },
      { label: "Agents", value: "AI" },
      { label: "Viz", value: "Phaser 3" },
    ],
  },
  {
    slug: "gabineteos",
    title: "GabineteOS",
    type: "SaaS",
    description: "Accounting office SaaS — multi-org management for Portuguese accountants.",
    longDescription:
      "Enterprise SaaS platform for Portuguese accounting offices. Multi-organization management with client tracking, service workflows, activity logs, and team collaboration — built with a Turborepo monorepo architecture.",
    tech: ["Next.js 15", "NestJS", "Drizzle", "PostgreSQL", "Redis", "Turborepo", "Bun"],
    color: "#B8861A",
    year: "2026 — In Progress",
    problem:
      "Portuguese accounting offices juggle dozens of clients across spreadsheets and fragmented tools, with no centralized platform for workflows, deadlines, and team coordination.",
    solution:
      "Built a full-stack SaaS with NestJS backend (auth, organizations, clients, services), Drizzle ORM, PostgreSQL, Redis caching — and a Next.js 15 frontend with shadcn/ui. Turborepo monorepo managed with Bun.",
    result:
      "Backend phases 0-3 complete (auth, orgs, clients, services, activity). Frontend phase 4 pending — awaiting team alignment to begin.",
    highlights: [
      { label: "Backend", value: "NestJS" },
      { label: "ORM", value: "Drizzle" },
      { label: "Cache", value: "Redis" },
      { label: "Monorepo", value: "Turborepo" },
    ],
  },
];
