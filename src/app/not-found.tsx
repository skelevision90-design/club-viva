import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black mb-8">
        <Dumbbell className="w-6 h-6 -rotate-45" strokeWidth={2.5} />
      </div>

      <span className="text-xs uppercase font-mono tracking-[0.25em] text-white/50 mb-3">
        404 ERROR // PAGE NOT LOCATED
      </span>

      <h1 className="font-anton text-6xl sm:text-8xl tracking-tight text-white mb-6">
        OUT OF BOUNDS.
      </h1>

      <p className="text-sm sm:text-base text-white/70 font-light max-w-md mb-10 leading-relaxed">
        The training corridor you are looking for does not exist or has been relocated to another sector.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>RETURN TO CLUB VIVA</span>
      </Link>
    </div>
  );
}
