/**
 * Brand Tokens — Dr. Priyank Sethi (portfolio)
 *
 * Doctor's personal palette. Distinct from the Stunning Dentistry network
 * palette (which is blue + muted gold). Here: a bright warm gold, ink, and a
 * red accent — carried over from the legacy priyanksethi.com site so the
 * brand stays visually continuous through the rebuild.
 *
 * The CSS custom-property mirror lives in src/app/globals.css. If you change
 * a token here, change the corresponding `--brand-*` variable too.
 */

export const PALETTE = {
  label: "Dr. Priyank Sethi — Portfolio",
  gold: {
    primary: "#FFB301",
    soft: "#FFD15C",
    deep: "#A87400",
  },
  ink: {
    primary: "#222222",
    soft: "#4A4A4A",
  },
  accent: "#DE3926",
  surface: {
    background: "#FFFFFF",
    foreground: "#171717",
    sectionWarm: "#FFFAF0",
    sectionAlt: "#F5EFE0",
  },
  gradients: {
    goldHero: "linear-gradient(135deg, #FFD15C 0%, #FFB301 50%, #A87400 100%)",
    inkRail: "linear-gradient(180deg, #222222 0%, #000000 100%)",
  },
} as const;

export const TYPE = {
  body: "Inter, sans-serif",
  display: "Playfair Display, serif",
} as const;
