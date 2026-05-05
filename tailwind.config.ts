import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Doctor portfolio palette — gold + ink + accent
        brand: {
          gold: "var(--brand-gold)",
          "gold-soft": "var(--brand-gold-soft)",
          "gold-deep": "var(--brand-gold-deep)",
          ink: "var(--brand-ink)",
          "ink-soft": "var(--brand-ink-soft)",
          accent: "var(--brand-accent)",
        },
        section: {
          warm: "var(--section-surface)",
          alt: "var(--section-surface-alt)",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Playfair Display", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      keyframes: {
        marqueeScroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "marquee-scroll": "marqueeScroll var(--dur, 30s) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
