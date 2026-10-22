"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center pt-8 pb-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Huge Editorial Type & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Location Tag */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/70 font-medium">
                MODEL TOWN · JALANDHAR, PUNJAB
              </span>
            </div>

            {/* Giant Headline: PUSH YOURSELF */}
            <h1 className="font-anton text-[4.5rem] sm:text-[6.5rem] lg:text-[7.75rem] leading-[0.88] tracking-tight text-white mb-6 select-none">
              PUSH
              <br />
              <span className="text-outline hover:text-white/20 transition-colors duration-500">
                YOURSELF.
              </span>
            </h1>

            {/* Program Line */}
            <p className="text-sm sm:text-base text-white/80 font-light tracking-wide mb-10 max-w-xl">
              Group Classes · Personal Training · MMA · Kickboxing
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <button
                onClick={() => scrollTo("join")}
                className="px-8 py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-widest hover:bg-neutral-200 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                BOOK A FREE TRIAL
              </button>
              <button
                onClick={() => scrollTo("programs")}
                className="px-8 py-4 rounded-full border border-white/25 text-white font-medium text-xs sm:text-sm uppercase tracking-widest hover:border-white hover:bg-white/5 active:scale-95 transition-all duration-200"
              >
                EXPLORE PROGRAMS
              </button>
            </div>

            {/* Timetable / Cohort Sub-elements */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-6 max-w-lg">
              <div>
                <p className="font-anton text-xl tracking-wider text-white">06:00 – 22:00</p>
                <p className="text-[11px] uppercase tracking-widest text-white/50 font-medium mt-1">
                  MONDAY TO SATURDAY
                </p>
              </div>
              <div>
                <p className="font-anton text-xl tracking-wider text-white">ELITE COHORT</p>
                <p className="text-[11px] uppercase tracking-widest text-white/50 font-medium mt-1">
                  PURE DISCIPLINE
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Contrast Hero Photo with Diagonal Cut */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full flex justify-center lg:justify-end"
          >
            {/* Outer container with large rounded corners and diagonal cut */}
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] aspect-[4/5] rounded-[36px] sm:rounded-[44px] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl hero-diagonal-cut group">
              <Image
                src="/images/hero-deadlift.jpg"
                alt="Intense high-contrast deadlift training session with chalk dust rising at Club Viva Jalandhar"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Contrast vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

              {/* Bottom Badge with Diagonal Cut Alignment */}
              <div className="absolute bottom-6 left-6 right-8 flex items-end justify-between pointer-events-none">
                <div>
                  <span className="inline-block text-[10px] font-mono tracking-widest text-white/60 mb-0.5">
                    CV // 01-PRO
                  </span>
                  <p className="font-anton text-xs sm:text-sm tracking-wider text-white">
                    POWERLIFTING & FUNCTIONAL ARENA
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
