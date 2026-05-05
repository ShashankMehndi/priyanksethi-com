/**
 * Brand Tokens - aligned with the Stunning Dentistry network palette.
 *
 * Per the SD brand guideline (`stunningdentistry-au/src/lib/brand-tokens.ts`),
 * every property in the SD family - including this doctor portfolio - uses:
 *   primary blue + dark navy + accent gold + ivory section bands.
 *
 * The doctor's legacy yellow/gold/red palette was retired during the visual
 * realignment so priyanksethi.com slots cleanly into the SD network look.
 *
 * Typography matches SD Combined `Brand_Guidelines.md`: Inter for all
 * headings and body (no secondary display serif).
 *
 * The CSS custom-property mirror lives in src/app/globals.css. If you change
 * a token here, change the corresponding `--brand-*` variable too.
 */

export const PALETTE = {
  label: "Stunning Dentistry - World-Class Clinic",
  blue: {
    primary: "#0058C8",
    hover: "#0048A3",
    light: "#2563EB",
    deep: "#001070",
  },
  gold: {
    primary: "#C9A84C",
    soft: "#D4BC70",
    deep: "#8D6E1B",
    top: "#F9E08E",
    mid: "#D4AF37",
  },
  ink: {
    primary: "#1B2A4A",
    soft: "#4A5878",
    deep: "#0F1A30",
  },
  accent: "#DE3926",
  surface: {
    background: "#FFFFFF",
    foreground: "#171717",
    sectionWarm: "#FBF6EA",
    sectionAlt: "#F3E8D6",
  },
  gradients: {
    brandBlue: "linear-gradient(135deg, #0057B8 0%, #2563EB 100%)",
    deepNavy: "linear-gradient(160deg, #001070 0%, #0057B8 100%)",
    trustStrip: "linear-gradient(136deg, #0057B8 0%, #001070 100%)",
    goldLuxury: "linear-gradient(180deg, #F9E08E 0%, #D4AF37 48%, #8D6E1B 100%)",
    goldCta: "linear-gradient(180deg, #F2C94C 0%, #D4AF37 45%, #8D6E1B 100%)",
  },
} as const;

export const TYPE = {
  body: "Inter, sans-serif",
  display: "Inter, sans-serif",
} as const;
