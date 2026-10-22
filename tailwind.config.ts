import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        surface: {
          900: "#0A0A0A",
          850: "#101010",
          800: "#141414",
          700: "#1E1E1E",
          600: "#2A2A2A",
          100: "#F4F4F5",
          50: "#FAFAFA",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.12)",
          medium: "rgba(255, 255, 255, 0.22)",
          dark: "rgba(0, 0, 0, 0.12)",
        },
      },
      fontFamily: {
        anton: ["var(--font-anton)", "Impact", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "40px",
        "6xl": "48px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tightest: "-0.06em",
        widestx: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
