/**
 * Single-tenant markdown loader for Dr. Priyank Sethi's portfolio.
 *
 * Reads markdown from `Doctor Priyank Sethi Content/India/` at the project
 * root. Each file has YAML frontmatter:
 *
 *   ---
 *   title: "..."
 *   description: "..."
 *   url: /path
 *   h1: "..."
 *   ogImage: /images/...
 *   schema: Person | Organization | DentalClinic | ...
 *   (plus optional rich data: cases, reviews, videos, form, etc.)
 *   ---
 *   # H1
 *   body markdown ...
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "Doctor Priyank Sethi Content", "India");

export type Frontmatter = Record<string, unknown>;

export type ContentPage = {
  /** Source file path relative to the content dir (for diagnostics) */
  source: string;
  /** Routable path, e.g. "/", "/about", "/case-studies/case/hardy-sandhu" */
  url: string;
  title: string;
  description: string;
  h1: string;
  ogImage?: string;
  schema?: string;
  /** Body markdown with the leading H1 stripped (the H1 is exposed via `h1`). */
  body: string;
  /** All frontmatter fields, including arbitrary rich-data shapes. */
  data: Frontmatter;
};

let cache: Map<string, ContentPage> | null = null;

/** Walks the content dir, parses every .md, and indexes by `url`. */
export function loadAllPages(): Map<string, ContentPage> {
  if (cache) return cache;
  const out = new Map<string, ContentPage>();
  if (!existsSync(CONTENT_DIR)) {
    cache = out;
    return out;
  }
  for (const file of walkMarkdown(CONTENT_DIR)) {
    try {
      const page = parseFile(file);
      if (page) out.set(page.url, page);
    } catch (err) {
      console.warn(`[content-loader] Failed to parse ${file}:`, err);
    }
  }
  cache = out;
  return out;
}

export function getPage(url: string): ContentPage | undefined {
  // Normalise: trim trailing slash except for root
  const key = url === "/" ? "/" : url.replace(/\/+$/, "");
  return loadAllPages().get(key);
}

export function getAllPages(): ContentPage[] {
  return [...loadAllPages().values()];
}

export function getPagesByPrefix(prefix: string): ContentPage[] {
  const norm = prefix.replace(/\/+$/, "");
  return getAllPages().filter((p) => p.url === norm || p.url.startsWith(norm + "/"));
}

/* ── internals ───────────────────────────────────────────────────────── */

function* walkMarkdown(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith("._") || entry === ".DS_Store") continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      yield* walkMarkdown(full);
    } else if (st.isFile() && entry.endsWith(".md")) {
      yield full;
    }
  }
}

function parseFile(path: string): ContentPage | null {
  const raw = readFileSync(path, "utf8");
  if (!raw.startsWith("---\n")) return null;
  const fmEnd = raw.indexOf("\n---", 4);
  if (fmEnd < 0) return null;
  const fmRaw = raw.slice(4, fmEnd);
  const body = raw.slice(fmEnd + 4).replace(/^\n+/, "");
  const data = parseYaml(fmRaw) as Frontmatter;
  if (!data || typeof data.url !== "string") return null;
  // Strip the leading body H1 - the page renderer uses `h1` from frontmatter.
  const bodyStripped = body.replace(/^#\s+[^\n]+\n+/, "");
  return {
    source: path.slice(ROOT.length + 1),
    url: data.url === "/" ? "/" : (data.url as string).replace(/\/+$/, ""),
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    h1: String(data.h1 ?? ""),
    ogImage: typeof data.ogImage === "string" ? data.ogImage : undefined,
    schema: typeof data.schema === "string" ? data.schema : undefined,
    body: bodyStripped,
    data,
  };
}
