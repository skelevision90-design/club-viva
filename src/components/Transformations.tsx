"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TransformationItem {
  id: string;
  name: string;
  statBadge: string;
  programType: string;
  copy: string;
  image: string;
  imageAlt: string;
}

const transformations: TransformationItem[] = [
  {
    id: "harman",
    name: "HARMAN",
    statBadge: "-14KG FAT LOSS",
    programType: "16 WEEKS PROGRAM",
    copy: "Rebuilt body composition from ground up via progressive overload and strict macro periodization.",
    image: "/images/transform-harman.jpg",
    imageAlt: "Harman showing verified physique outcome after 16 weeks of progressive overload training",
  },
  {
    id: "simran",
    name: "SIMRAN",
    statBadge: "DEADLIFT 210KG",
    programType: "POWER COHORT",
    copy: "Surpassed state powerlifting threshold through calibrated CNS loading and hip drive restoration.",
    image: "/images/transform-simran.jpg",
    imageAlt: "Simran chalking hands before lifting 210kg deadlift at Club Viva",
  },
  {
    id: "vikram",
    name: "VIKRAM",
    statBadge: "+6KG LEAN MASS",
    programType: "HYPERTROPHY CYCLE",
    copy: "Engineered dense muscle mass across kinetic chain with hyper-specific time under tension regimens.",
    image: "/images/transform-vikram.jpg",
    imageAlt: "Vikram performing gymnastics rings strength movement showcasing lean hypertrophy gains",
  },
];

export default function Transformations() {
  return (
    <section id="transformations" className="relative w-full py-24 sm:py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 sm:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-medium block mb-3">
            VERIFIED PHYSIQUE OUTCOMES
          </span>
          <h2 className="font-anton text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl">
            ZERO GIMMICKS. RUTHLESS CONSISTENCY.
          </h2>
        </div>

        {/* 3 Athlete Image Strips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {transformations.map((item, index) => {
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col group"
              >
                {/* Photo with pill badge overlay */}
                <div className="relative w-full aspect-[3/4] rounded-[32px] sm:rounded-[36px] overflow-hidden bg-neutral-900 border border-white/10 mb-6">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Pill Badge Top-Left */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-mono tracking-wider border border-white/20">
                      {item.statBadge}
                    </span>
                  </div>
                </div>

                {/* Caption Details */}
                <div className="px-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-anton text-2xl text-white tracking-wider">
                      {item.name}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                      {item.programType}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {item.copy}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
