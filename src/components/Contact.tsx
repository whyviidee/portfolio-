"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Download } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/whyviidee" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/whyviidee" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/deejay.dago" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <div className="h-px w-12 bg-amber-400" />
          <span className="text-xs text-amber-400 tracking-widest uppercase">Let&apos;s work together</span>
          <div className="h-px w-12 bg-amber-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Get in touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Got an idea, a project, or something you want to build?
          Let&apos;s talk — together we make it happen.
          Open to freelance, collaborations, and new challenges.
        </motion.p>

        <motion.a
          href="mailto:ydagot@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="inline-flex items-center gap-3 px-10 py-4 bg-amber-400 text-black font-semibold rounded-full hover:bg-amber-300 transition-all duration-300 hover:scale-105 active:scale-95 text-lg mb-16"
        >
          <Mail size={20} />
          Send me an email
        </motion.a>

        <motion.a
          href="/cv.pdf"
          download
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/10 text-white rounded-full hover:border-amber-400/30 transition-all duration-300 hover:scale-105 ml-4"
        >
          <Download size={18} />
          Download CV
        </motion.a>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.08 }}
              className="p-3 border border-white/5 rounded-full text-gray-500 hover:text-white hover:border-white/20 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
