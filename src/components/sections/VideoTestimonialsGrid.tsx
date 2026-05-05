import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Carousel } from "@/components/ui/Carousel";

/** Optional `portrait` = small headshot over the thumbnail (e.g. `/images/...`). */
export type VideoEntry = { youtubeId: string; title: string; portrait?: string };

export function VideoTestimonialsGrid({
  videos,
  eyebrow = "Patient stories on camera",
  title,
  lede,
  surface = "white",
  variant = "carousel",
}: {
  videos: VideoEntry[];
  eyebrow?: string;
  title: string;
  lede?: string;
  surface?: "white" | "warm" | "alt";
  variant?: "carousel" | "grid";
}) {
  const list = videos.filter((v) => v.youtubeId);
  return (
    <Section surface={surface}>
      <Container size="lg">
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />
        {variant === "grid" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((v) => (
              <VideoCard key={v.youtubeId} v={v} className="" />
            ))}
          </div>
        ) : (
          <Carousel ariaLabel={title} autoScroll>
            {list.map((v) => (
              <VideoCard
                key={v.youtubeId}
                v={v}
                className="shrink-0 basis-[78%] sm:basis-[55%] lg:basis-[36%]"
              />
            ))}
          </Carousel>
        )}
      </Container>
    </Section>
  );
}

function VideoCard({ v, className }: { v: VideoEntry; className: string }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden rounded-2xl bg-section-warm ring-1 ring-section-alt transition hover:ring-brand-blue ${className}`}
    >
      <div className="relative aspect-video w-full">
        <Image
          src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
          alt={v.title}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        {v.portrait ? (
          <div
            className="pointer-events-none absolute bottom-3 left-3 z-[1] h-14 w-14 overflow-hidden rounded-full border-2 border-white/90 shadow-md ring-2 ring-brand-gold/40"
            aria-hidden
          >
            <Image src={v.portrait} alt="" fill sizes="56px" className="object-cover" />
          </div>
        ) : null}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg ring-2 ring-white/40">
            <PlayIcon />
          </span>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="font-heading text-base font-semibold text-brand-ink">{v.title}</p>
        <p className="mt-1 text-xs text-brand-ink-soft/70">Watch on YouTube →</p>
      </div>
    </a>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
