import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer id="facility" className="relative w-full bg-black text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand & Address */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                  <Dumbbell className="w-4 h-4 -rotate-45" strokeWidth={2.5} />
                </div>
                <span className="font-anton text-3xl tracking-wider text-white">
                  CLUB VIVA
                </span>
              </div>
              <p className="text-sm text-white/70 font-light leading-relaxed max-w-sm mb-8">
                High-performance athletic sanctuary based in Jalandhar. Engineering disciplined bodies, combat conditioning, and kinetic power.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">
                HEADQUARTERS
              </span>
              <p className="text-xs sm:text-sm text-white/90 font-light">
                442-R, Model Town Market, Jalandhar, Punjab 144003
              </p>
            </div>
          </div>

          {/* Navigation Directory */}
          <div className="md:col-span-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-6">
              NAVIGATION
            </span>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm tracking-widest uppercase font-semibold text-white/70">
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  DISCIPLINE
                </a>
              </li>
              <li>
                <a href="#facility" className="hover:text-white transition-colors">
                  FACILITY
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  TRAINERS
                </a>
              </li>
              <li>
                <a href="#join" className="hover:text-white transition-colors">
                  LOCATION
                </a>
              </li>
              <li>
                <a href="#join" className="hover:text-white transition-colors">
                  CONTACT
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/club_viva_jalandhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  INSTAGRAM
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-2">
                DIRECT CHANNEL
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                DIRECT LINE
              </span>
              <a
                href="tel:+919810834976"
                className="font-anton text-2xl sm:text-3xl text-white tracking-wider hover:text-white/80 transition-colors"
              >
                +91 98108 34976
              </a>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">
                INSTAGRAM
              </span>
              <a
                href="https://instagram.com/club_viva_jalandhar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-white/90 hover:text-white underline underline-offset-4 font-mono transition-colors"
              >
                @club_viva_jalandhar
              </a>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-2">
                FLOOR HOURS
              </span>
              <p className="text-xs sm:text-sm text-white/90 font-light">
                Mon — Sat: 06:00 – 22:00
              </p>
              <p className="text-xs text-white/50 font-light mt-0.5">
                Sun: 08:00 – 14:00 (Recovery)
              </p>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] text-white/40 font-mono tracking-widest uppercase">
          <p>© 2024 CLUB VIVA JALANDHAR. ALL RIGHTS RESERVED. PUSH YOURSELF.</p>
          <p>PUNJAB ATHLETICS CO.</p>
        </div>
      </div>
    </footer>
  );
}
