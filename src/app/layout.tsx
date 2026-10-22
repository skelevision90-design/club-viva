import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Club Viva | Push Yourself — High-Performance Gym Jalandhar",
  description:
    "Jalandhar's premier athletic sanctuary for Group Classes, Personal Training, MMA Conditioning, and Kickboxing. Zero gimmicks. Pure discipline.",
  keywords: [
    "Club Viva Jalandhar",
    "gym in Jalandhar",
    "MMA training Punjab",
    "kickboxing Jalandhar",
    "personal training Model Town",
    "strength conditioning Jalandhar",
  ],
  authors: [{ name: "Club Viva Athletics" }],
  openGraph: {
    title: "Club Viva | Push Yourself — Jalandhar",
    description:
      "Engineered bodies, combat conditioning, and kinetic power. Claim your complimentary trial session.",
    url: "https://clubviva.in",
    siteName: "Club Viva",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} dark`}>
      <head>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
        />
      </head>
      <body className="bg-black text-white selection:bg-white selection:text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
