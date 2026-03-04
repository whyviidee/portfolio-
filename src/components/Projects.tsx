"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          className="group relative rounded-2xl overflow-hidden border border-white/5 cursor-pointer transition-all duration-500 hover:border-white/10"
          style={{ background: "rgba(22, 27, 39, 0.6)" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Color accent top bar */}
          <div
            className="h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
            style={{ background: project.color }}
          />

          <div className="p-8 md:p-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: `${project.color}20`, color: project.color }}
                  >
                    {project.type}
                  </span>
                  <span className="text-xs text-gray-600">{project.year}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
              <motion.div
                animate={hovered ? { x: 4, y: -4 } : { x: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 group-hover:text-amber-400 transition-colors"
              >
                <ArrowUpRight size={24} />
              </motion.div>
            </div>

            <p className="text-gray-400 mb-8 leading-relaxed">{project.description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md text-gray-500 border border-white/5 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-amber-400" />
            <span className="text-xs text-amber-400 tracking-widest uppercase">Selected work</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Projects
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
