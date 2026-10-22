"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProgramItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  reverseOnDesktop?: boolean;
}

const programs: ProgramItem[] = [
  {
    id: "group-classes",
    number: "01",
    title: "GROUP CLASSES",
    description:
      "High-intensity metabolic conditioning and strength intervals engineered for relentless communal output.",
    tags: ["HIIT", "60 MINS"],
    image: "/images/program-group.jpg",
    imageAlt: "Athletes performing synchronized kettlebell swings during high-intensity group conditioning",
    reverseOnDesktop: false,
  },
  {
    id: "personal-training",
    number: "02",
    title: "PERSONAL TRAINING",
    description:
      "Bespoke biomechanics, structured periodization, and continuous biometric accountability tailored to your ceiling.",
    tags: ["1-ON-1", "HYPERTROPHY"],
    image: "/images/program-personal.jpg",
    imageAlt: "Personal coach guiding athlete through heavy barbell deadlift biomechanics",
    reverseOnDesktop: true,
  },
  {
    id: "mma-conditioning",
    number: "03",
    title: "MMA CONDITIONING",
    description:
      "Grappling resilience, explosive takedown mechanics, and anaerobic stamina forged inside the caged sector.",
    tags: ["COMBAT", "GRAPPLING"],
    image: "/images/program-mma.jpg",
    imageAlt: "Mixed martial arts athlete demonstrating explosive high kick technique inside the training cage",
    reverseOnDesktop: false,
  },
  {
    id: "kickboxing-combat",
    number: "04",
    title: "KICKBOXING COMBAT",
    description:
      "Precision pad work, evasive head movement, and Dutch-style combinations designed for combat readiness.",
    tags: ["DUTCH DRILLS", "PRECISION"],
    image: "/images/program-kickboxing.jpg",
    imageAlt: "Kickboxer landing precise strikes on coach's focus mitts during striking drills",
    reverseOnDesktop: true,
  },
];

export default function Programs() {
  return (
    <section id="programs" className="relative w-full py-24 sm:py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 sm:mb-28">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-medium block mb-3">
              CURATED METHODOLOGY
            </span>
            <h2 className="font-anton text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white">
              WHAT WE TRAIN
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-white/70 font-light leading-relaxed">
            No routine machine circuits. We build raw operational capacity, explosive striking force, and uncompromising resilience.
          </p>
        </div>

        {/* 4 Stacked Large Program Rows */}
        <div className="flex flex-col gap-24 sm:gap-32">
          {programs.map((item, index) => {
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  item.reverseOnDesktop ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content Block */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    item.reverseOnDesktop ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"
                  }`}
                >
                  <div className="flex items-start gap-6 sm:gap-8 mb-4">
                    <span className="font-anton text-5xl sm:text-7xl text-neutral-600 select-none">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-anton text-2xl sm:text-4xl text-white tracking-wide mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-lg mb-6">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-[11px] font-semibold tracking-wider uppercase border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo Block: Rounded Capsule Mask */}
                <div
                  className={`lg:col-span-6 w-full ${
                    item.reverseOnDesktop ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[32px] sm:rounded-[40px] overflow-hidden bg-neutral-900 border border-white/10 group">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
