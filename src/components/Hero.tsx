"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const name = "Yuri Dagot";
const chars = name.split("");

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full flex flex-col justify-center overflow-hidden"
      style={{ minHeight: "100svh", padding: "0 1.5rem" }}
    >
      {/* Ambient background — GPU accelerated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ willChange: "transform" }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="text-xs text-amber-400 tracking-widest uppercase font-medium">
            Available for hire
          </span>
        </motion.div>

        {/* Name character-by-character */}
        <h1 className="font-bold leading-none mb-6" style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}>
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.035,
                ease,
              }}
              className={char === " " ? "inline-block mr-[0.3em]" : "inline-block"}
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
        >
          <div className="h-px w-12 bg-amber-400" />
          <span className="text-xl sm:text-2xl text-gray-300 font-light">Full-Stack Developer</span>
        </motion.div>

        {/* One-liner */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease }}
          className="text-gray-500 text-base sm:text-lg max-w-xl mb-12 leading-relaxed"
        >
          Building apps, platforms & websites — from Mozambique to the world.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease }}
          className="flex flex-wrap gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="px-8 py-3 bg-amber-400 text-black text-sm font-semibold rounded-full hover:bg-amber-300 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            View my work
          </button>
          <a
            href="mailto:ydagot@gmail.com"
            className="px-8 py-3 border border-white/10 text-white text-sm rounded-full hover:border-amber-400/50 transition-all duration-200"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-amber-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
