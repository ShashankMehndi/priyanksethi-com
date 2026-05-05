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
        brand: {
          // Blue (primary)
          blue: "var(--brand-blue)",
          "blue-hover": "var(--brand-blue-hover)",
          "blue-light": "var(--brand-blue-light)",
          "blue-deep": "var(--brand-blue-deep)",
          // Gold (accent)
          gold: "var(--brand-gold)",
          "gold-soft": "var(--brand-gold-soft)",
          "gold-deep": "var(--brand-gold-deep)",
          "gold-mid": "var(--brand-gold-mid)",
          "gold-top": "var(--brand-gold-top)",
          // Ink
          ink: "var(--brand-ink)",
          "ink-soft": "var(--brand-ink-soft)",
          "ink-deep": "var(--brand-ink-deep)",
          // Accent (sparingly)
          accent: "var(--brand-accent)",
        },
        section: {
          warm: "var(--section-surface)",
          alt: "var(--section-surface-alt)",
        },
      },
      fontFamily: {
        /* SD Combined Brand Guidelines - Inter for headings and body */
        heading: ["var(--font-inter)", "Inter", "sans-serif"],
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
