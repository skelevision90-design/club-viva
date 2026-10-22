"use client";

import { useState } from "react";
import Link from "next/link";
import { Dumbbell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-white rounded-full px-2 py-1"
          aria-label="Club Viva Homepage"
        >
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black group-hover:scale-105 transition-transform duration-300">
            <Dumbbell className="w-5 h-5 -rotate-45" strokeWidth={2.5} />
          </div>
          <span className="font-anton text-2xl tracking-wider text-white">
            CLUB VIVA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest text-white/70"
          aria-label="Primary Navigation"
        >
          <button
            onClick={() => scrollTo("programs")}
            className="hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
          >
            TRAINING
          </button>
          <button
            onClick={() => scrollTo("transformations")}
            className="hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
          >
            RESULTS
          </button>
          <button
            onClick={() => scrollTo("facility")}
            className="hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
          >
            FACILITY
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => scrollTo("join")}
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white active:scale-95 transition-all duration-200"
          >
            BOOK A FREE TRIAL
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => scrollTo("join")}
            className="px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] font-semibold uppercase tracking-wider"
          >
            FREE TRIAL
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-neutral-950/95 border-b border-white/10 px-6 py-8 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-6 text-base font-anton tracking-wider text-white/90">
              <button
                onClick={() => scrollTo("programs")}
                className="text-left py-2 hover:text-white border-b border-white/5 transition-colors"
              >
                TRAINING
              </button>
              <button
                onClick={() => scrollTo("transformations")}
                className="text-left py-2 hover:text-white border-b border-white/5 transition-colors"
              >
                RESULTS
              </button>
              <button
                onClick={() => scrollTo("facility")}
                className="text-left py-2 hover:text-white border-b border-white/5 transition-colors"
              >
                FACILITY
              </button>
              <button
                onClick={() => scrollTo("join")}
                className="w-full mt-4 py-3 rounded-full bg-white text-black font-semibold text-center text-xs uppercase tracking-widest"
              >
                BOOK A FREE TRIAL
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
