"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "React Native", "Expo", "Tailwind", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Python", "PostgreSQL", "Supabase", "Redis"] },
  { category: "Mobile", items: ["Expo Router", "React Native", "TypeScript", "Zustand"] },
  { category: "Tools", items: ["Git", "Docker", "Vercel", "OpenAI API", "Figma", "FFmpeg"] },
];

const stats = [
  { value: "16", label: "Projects built" },
  { value: "DJ", label: "By night" },
  { value: "Dev", label: "By day" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-12 bg-amber-400" />
          <span className="text-xs text-amber-400 tracking-widest uppercase">Who I am</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-16"
        >
          About
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              DJ Dagô by night, building software by day. Born in Mozambique, based in Portugal.
              Two paths running in parallel.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              I studied Computer Engineering at IST — Instituto Superior Técnico, Lisbon. Worked at
              Accenture and Teleperformance. Then the decks called louder and I spent years building
              a DJ career across Portugal and Mozambique.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Recently I came back to code with a different mindset — building things I actually need
              and care about. An app for DJs. A tool to legalize my music library. A private app for
              my friend group. Everything here was built from real problems, not tutorials.
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              I&apos;m not a senior developer with 10 years of experience. I&apos;m someone who builds fast,
              learns by shipping, and puts real products out there. This portfolio keeps growing.
              Open to freelance, collaborations, and interesting problems.
            </p>

            {/* Stats */}
            <div className="flex gap-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-8"
          >
            {skills.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + gi * 0.1 }}
              >
                <h4 className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-medium">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-lg border border-white/5 text-gray-300 font-mono hover:border-amber-400/30 hover:text-amber-400 transition-all duration-300 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
