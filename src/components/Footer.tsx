"use client";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-gray-600">
          © {new Date().getFullYear()} Yuri Dagot — Built with Next.js, Framer Motion & Lenis
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs text-gray-600 hover:text-amber-400 transition-colors"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
