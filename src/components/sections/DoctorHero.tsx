import Image from "next/image";
import { DOCTOR } from "@/config/doctor";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function DoctorHero({
  credentials,
  portrait = "/images/doctor/img2.jpg",
}: {
  credentials: string[];
  portrait?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-ink text-white">
      {/* gold halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--grad-gold-hero)" }}
      />
      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
            {DOCTOR.philosophy}
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            {DOCTOR.name}
          </h1>
          <p className="mt-3 text-base text-white/70 md:text-lg">{DOCTOR.postNominals}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            {DOCTOR.tagline}. Over <span className="font-semibold text-brand-gold">1,000 patients</span> treated across <span className="font-semibold text-brand-gold">30+ countries</span>.
          </p>

          {credentials.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2 text-sm text-white/70">
              {credentials.slice(0, 6).map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/e-consult" variant="ink">
              Talk to Dr. Sethi
            </Button>
            <Button href="/case-studies" variant="ghost" className="!border-white/30 !text-white hover:!bg-white/10">
              See the work
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
            <Image
              src={portrait}
              alt={`${DOCTOR.name} — portrait`}
              fill
              sizes="(min-width: 768px) 480px, 80vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
