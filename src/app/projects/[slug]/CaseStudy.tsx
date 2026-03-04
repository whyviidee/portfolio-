"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
} as const;

export default function CaseStudy({ project }: { project: Project }) {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            All projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: `${project.color}20`, color: project.color }}
            >
              {project.type}
            </span>
            <span className="text-xs text-gray-600">{project.year}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">{project.longDescription}</p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ background: `linear-gradient(to right, ${project.color}, transparent)` }}
          className="h-px origin-left mb-16"
        />

        {/* Problem → Solution → Result */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { label: "Problem", content: project.problem, num: "01" },
            { label: "Solution", content: project.solution, num: "02" },
            { label: "Result", content: project.result, num: "03" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
              className="relative p-6 rounded-2xl border border-white/5"
              style={{ background: "rgba(22, 27, 39, 0.5)" }}
            >
              <span className="text-5xl font-bold text-white/5 absolute top-4 right-4 font-mono">
                {item.num}
              </span>
              <h3 className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: project.color }}>
                {item.label}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-xl border border-white/8 text-sm text-gray-300 font-mono hover:border-amber-400/30 hover:text-amber-400 transition-all duration-300"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        {(project.liveUrl || project.githubUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex gap-4"
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-black font-semibold rounded-full hover:bg-amber-300 transition-all duration-300 hover:scale-105"
              >
                <ExternalLink size={16} />
                Live demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white rounded-full hover:border-white/30 transition-all duration-300"
              >
                <Github size={16} />
                Source
              </a>
            )}
          </motion.div>
        )}

        {/* Next project */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-24 pt-12 border-t border-white/5 text-center"
        >
          <Link href="/#projects" className="text-gray-500 hover:text-amber-400 transition-colors text-sm">
            ← Back to all projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
