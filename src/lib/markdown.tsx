/**
 * Tight markdown → React renderer for portfolio content.
 *
 * Why not pull in `react-markdown` / `remark`: the content we render is small,
 * controlled, and our extractor emits a narrow subset (headings, paragraphs,
 * unordered lists, blockquotes, links, images, basic emphasis). Keeping this
 * inline lets us style every node the way the portfolio wants without
 * fighting a heavy renderer.
 */

import { Fragment, type ReactNode } from "react";

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "image"; alt: string; src: string }
  | { type: "raw"; text: string };

export function MarkdownBody({ source }: { source: string }) {
  const blocks = parse(source);
  return (
    <div className="prose-portfolio space-y-5 text-base leading-relaxed text-brand-ink-soft md:text-lg">
      {blocks.map((b, i) => (
        <Fragment key={i}>{renderBlock(b)}</Fragment>
      ))}
    </div>
  );
}

function renderBlock(b: Block): ReactNode {
  switch (b.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-heading text-2xl font-semibold text-brand-ink md:text-3xl">
          {inline(b.text)}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-10 font-heading text-xl font-semibold text-brand-ink md:text-2xl">
          {inline(b.text)}
        </h3>
      );
    case "h4":
      return (
        <h4 className="mt-8 font-heading text-lg font-semibold text-brand-ink">
          {inline(b.text)}
        </h4>
      );
    case "p":
      return <p>{inline(b.text)}</p>;
    case "ul":
      return (
        <ul className="ml-5 list-disc space-y-2 marker:text-brand-gold">
          {b.items.map((li, i) => (
            <li key={i}>{inline(li)}</li>
          ))}
        </ul>
      );
    case "blockquote":
      return (
        <blockquote className="border-l-4 border-brand-gold bg-section-warm/60 px-5 py-4 italic text-brand-ink-soft">
          {inline(b.text)}
        </blockquote>
      );
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          src={b.src}
          alt={b.alt}
          loading="lazy"
          className="w-full rounded-lg border border-section-alt"
        />
      );
    case "raw":
      return <p>{inline(b.text)}</p>;
  }
}

/* ── parser ──────────────────────────────────────────────────────────── */

function parse(src: string): Block[] {
  const lines = src.split("\n");
  const out: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    // Heading
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      out.push({ type: (`h${level}` as "h2" | "h3" | "h4"), text });
      i++;
      continue;
    }
    // Image-only line: ![alt](src)
    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (img) {
      out.push({ type: "image", alt: img[1], src: img[2] });
      i++;
      continue;
    }
    // Blockquote (consume contiguous > lines)
    if (line.startsWith(">")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        buf.push(lines[i].slice(1).trim());
        i++;
      }
      out.push({ type: "blockquote", text: buf.join(" ") });
      continue;
    }
    // Unordered list (consume contiguous - lines)
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      out.push({ type: "ul", items });
      continue;
    }
    // Paragraph (consume until blank line)
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,4}\s|>|[-*]\s|!\[)/.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    out.push({ type: "p", text: buf.join(" ") });
  }
  return out;
}

/* ── inline formatting (bold, italic, links) ────────────────────────── */

function inline(text: string): ReactNode {
  // Process in passes: links → bold → italic
  const parts = splitLinks(text);
  return parts.map((p, i) =>
    typeof p === "string" ? <Fragment key={i}>{splitBoldItalic(p)}</Fragment> : <Fragment key={i}>{p}</Fragment>
  );
}

function splitLinks(text: string): Array<string | ReactNode> {
  const out: Array<string | ReactNode> = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const isExternal = /^https?:\/\//.test(m[2]);
    out.push(
      <a
        key={`l-${m.index}`}
        href={m[2]}
        className="portfolio-link"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function splitBoldItalic(text: string): ReactNode {
  // Bold: **x**   Italic: *x* or _x_
  const segments: ReactNode[] = [];
  let buf = "";
  let i = 0;
  while (i < text.length) {
    if (text.startsWith("**", i)) {
      if (buf) {
        segments.push(buf);
        buf = "";
      }
      const end = text.indexOf("**", i + 2);
      if (end < 0) {
        buf += text.slice(i);
        break;
      }
      segments.push(<strong className="font-semibold text-brand-ink">{text.slice(i + 2, end)}</strong>);
      i = end + 2;
      continue;
    }
    if (text[i] === "*" || text[i] === "_") {
      const ch = text[i];
      const end = text.indexOf(ch, i + 1);
      if (end < 0) {
        buf += text[i];
        i++;
        continue;
      }
      if (buf) {
        segments.push(buf);
        buf = "";
      }
      segments.push(<em className="italic">{text.slice(i + 1, end)}</em>);
      i = end + 1;
      continue;
    }
    buf += text[i];
    i++;
  }
  if (buf) segments.push(buf);
  return segments.length === 1 ? segments[0] : <>{segments}</>;
}
