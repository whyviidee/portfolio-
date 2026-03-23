"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timeline = [
  {
    year: "2014",
    title: "Computer Engineering",
    place: "IST — Instituto Superior Tecnico, Lisbon",
    description: "Started studying Computer Engineering at one of Portugal's top technical universities.",
  },
  {
    year: "2018",
    title: "IT Consulting",
    place: "Accenture",
    description: "Worked on enterprise IT consulting projects, learning how large-scale systems operate.",
  },
  {
    year: "2019",
    title: "Tech Support",
    place: "Teleperformance",
    description: "Technical support and troubleshooting, sharpening communication and problem-solving skills.",
  },
  {
    year: "2020",
    title: "DJ Dago — Full-time",
    place: "Portugal & Mozambique",
    description: "Left tech to pursue a full-time DJ career. Built a name across clubs, festivals, and private events in two countries.",
  },
  {
    year: "2025",
    title: "Back to Code",
    place: "Independent",
    description: "Returned to software development with a new mindset — building real products from real problems, not tutorials.",
  },
  {
    year: "2026",
    title: "Freelance & Open",
    place: "Full-stack Dev + DJ",
    description: "Shipping apps, taking freelance projects, and still spinning records. Open to collaborations and interesting problems.",
    current: true,
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-12 bg-amber-400" />
          <span className="text-xs text-amber-400 tracking-widest uppercase">Journey</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-16"
        >
          Experience
        </motion.h2>

        {/* Timeline — single column, line on the left */}
        <div className="relative pl-10">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-10 top-6">
                  <div
                    className={`w-[15px] h-[15px] rounded-full border-2 ${
                      item.current
                        ? "bg-amber-400 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                        : "bg-[#0F1117] border-white/20"
                    }`}
                  />
                </div>

                {/* Card */}
                <div
                  className="p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300"
                  style={{ background: "rgba(22, 27, 39, 0.5)" }}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-amber-400 text-sm font-mono font-bold">{item.year}</span>
                    <span className="text-xs text-gray-600">{item.place}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
