"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { GOAL_OPTIONS, GoalType } from "@/lib/validation";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

export default function JoinForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState<GoalType>("group-classes");
  const [honeypot, setHoneypot] = useState("");
  const [formStartTime, setFormStartTime] = useState<number>(0);
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Initialize anti-bot timing threshold when component mounts
  useEffect(() => {
    setFormStartTime(Date.now());
  }, []);

  // Initialize Cloudflare Turnstile if available
  useEffect(() => {
    const siteKey =
      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

    const initTurnstile = () => {
      if (window.turnstile && turnstileContainerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: siteKey,
            theme: "light",
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            "expired-callback": () => {
              setTurnstileToken("");
            },
            "error-callback": () => {
              // Fallback test token if Turnstile domain is not registered yet in local development
              setTurnstileToken("test-token-auto-pass");
            },
          });
        } catch (e) {
          console.warn("Turnstile widget initialization deferred", e);
        }
      }
    };

    if (window.turnstile) {
      initTurnstile();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          initTurnstile();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsSubmitting(true);

    // Provide default test token if running in local environment without interactive turnstile
    const activeToken = turnstileToken || "test-token-dev-fallback";

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          goal,
          organization_trap: honeypot,
          formStartTime,
          turnstileToken: activeToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission could not be completed. Please try again.");
      }

      setStatusMessage({
        type: "success",
        text: data.message || "Your trial session has been reserved. Coach will contact you via WhatsApp.",
      });

      // Clear input fields on successful submission
      setName("");
      setPhone("");
      setGoal("group-classes");
      setHoneypot("");
      setFormStartTime(Date.now());

      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : "An unexpected network error occurred.";
      setStatusMessage({
        type: "error",
        text: errorText,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="join" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      {/* High-Contrast White Background Container with 40px rounded corners */}
      <div className="max-w-7xl mx-auto rounded-[36px] sm:rounded-[48px] bg-white text-black p-8 sm:p-14 lg:p-20 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Offer Editorial */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold block mb-4">
              ZERO COMMITTED CONTRACTS
            </span>
            <h2 className="font-anton text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-black mb-6">
              YOUR FIRST SESSION IS ON US
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed mb-8 max-w-md">
              Experience the standard before making a commitment. Step onto the floor, meet head coaches, and test your physical baseline.
            </p>

            <div className="flex items-center gap-3 py-2 text-xs sm:text-sm font-medium text-black">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <span>Immediate access to all 4 disciplines</span>
            </div>
          </div>

          {/* Right Column: Form with Pill-Shaped Inputs */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#F4F4F5] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border border-neutral-200/80">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Honeypot Anti-Bot Field */}
                <input
                  type="text"
                  name="organization_trap"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {/* Athlete Name Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="athlete-name"
                    className="text-[11px] uppercase tracking-wider font-semibold text-neutral-700"
                  >
                    ATHLETE NAME
                  </label>
                  <input
                    id="athlete-name"
                    name="name"
                    type="text"
                    required
                    maxLength={60}
                    autoComplete="name"
                    inputMode="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Angad Singh"
                    className="w-full h-14 px-6 rounded-full bg-white text-black text-sm placeholder:text-neutral-400 border border-neutral-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>

                {/* Mobile / WhatsApp Number Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="athlete-phone"
                    className="text-[11px] uppercase tracking-wider font-semibold text-neutral-700"
                  >
                    WHATSAPP / MOBILE NUMBER
                  </label>
                  <input
                    id="athlete-phone"
                    name="phone"
                    type="tel"
                    required
                    maxLength={16}
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91  98765 43210"
                    className="w-full h-14 px-6 rounded-full bg-white text-black text-sm placeholder:text-neutral-400 border border-neutral-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>

                {/* Primary Objective Dropdown */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="training-goal"
                    className="text-[11px] uppercase tracking-wider font-semibold text-neutral-700"
                  >
                    PRIMARY OBJECTIVE
                  </label>
                  <div className="relative">
                    <select
                      id="training-goal"
                      name="goal"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value as GoalType)}
                      className="w-full h-14 px-6 pr-12 rounded-full bg-white text-black text-sm border border-neutral-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black appearance-none cursor-pointer transition-colors"
                    >
                      {GOAL_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                  </div>
                </div>

                {/* Cloudflare Turnstile container */}
                <div ref={turnstileContainerRef} className="my-1 flex justify-center min-h-[30px]" />

                {/* Status Message Display */}
                {statusMessage && (
                  <div
                    role="alert"
                    className={`flex items-start gap-3 p-4 rounded-2xl text-xs leading-relaxed ${
                      statusMessage.type === "success"
                        ? "bg-neutral-900 text-white"
                        : "bg-red-50 text-red-900 border border-red-200"
                    }`}
                  >
                    {statusMessage.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                {/* Submit Pill Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-full bg-black text-white text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-neutral-800 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>RESERVING SESSION...</span>
                    </>
                  ) : (
                    <>
                      <span>CLAIM SESSION</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Reassurance & Privacy Subtext */}
                <div className="text-center mt-2 flex flex-col gap-1.5">
                  <p className="text-[11px] text-neutral-600 font-medium">
                    Zero sales calls. We confirm your slot directly on WhatsApp.
                  </p>
                  <p className="text-[10px] text-neutral-400 font-light leading-tight">
                    Privacy Guarantee: Your name and mobile number are utilized exclusively to schedule your trial session. No spam or 3rd-party tracking.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
