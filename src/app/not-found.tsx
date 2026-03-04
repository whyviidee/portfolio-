"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-8xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold mb-4 text-white">Page not found</h1>
        <p className="text-gray-500 mb-10">This page does not exist. But the portfolio does.</p>
        <Link
          href="/"
          className="px-8 py-3 bg-amber-400 text-black font-semibold rounded-full hover:bg-amber-300 transition-all"
        >
          Back to home
        </Link>
      </motion.div>
    </main>
  );
}
