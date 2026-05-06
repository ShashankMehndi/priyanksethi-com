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
    <section
      className="relative overflow-hidden text-brand-ink"
      style={{
        background: "linear-gradient(180deg, #FFFBEB 0%, #FBF6EA 45%, #F3E8D6 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "var(--grad-gold-luxury)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[24rem] w-[24rem] rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--grad-brand-blue)" }}
      />

      <Container className="relative z-10 grid grid-cols-1 items-start gap-8 py-12 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-12 md:py-20">
        <div className="order-2 md:order-1">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-gold-deep/30 bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-gold-deep backdrop-blur-sm md:mb-4 md:px-3 md:py-1 md:text-xs">
            <span className="h-1 w-1 rounded-full bg-brand-gold-deep md:h-1.5 md:w-1.5" />
            {DOCTOR.philosophy}
          </p>
          <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-brand-ink md:text-5xl">
            {DOCTOR.name}
          </h1>
          <p className="mt-2 text-sm text-brand-ink-soft md:mt-3 md:text-base">{DOCTOR.postNominals}</p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-brand-ink-soft md:mt-5 md:text-base">
            {DOCTOR.tagline}. Over <span className="font-semibold text-brand-blue">1,000 patients</span> treated across{" "}
            <span className="font-semibold text-brand-blue">30+ countries</span>.
          </p>

          {credentials.length > 0 && (
            <div className="mt-6 -mx-5 overflow-hidden md:mx-0" aria-label="Credentials">
              <ul
                className="animate-marquee-scroll flex w-max items-center gap-2 px-5 text-xs text-brand-ink-soft md:text-sm"
                style={{ ["--dur" as string]: "40s" }}
              >
                {[...credentials, ...credentials].map((c, i) => (
                  <li
                    key={`${c}-${i}`}
                    className="whitespace-nowrap rounded-full border border-brand-ink/10 bg-white/80 px-2.5 py-1 shadow-sm backdrop-blur-sm md:px-3 md:py-1.5"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2.5 text-brand-ink md:mt-9 md:gap-3">
            <Button href="/e-consult" variant="gold" className="px-5 py-2.5 text-xs md:px-6 md:py-3 md:text-sm">
              Talk to Dr. Sethi
            </Button>
            <Button href="/case-studies" variant="ghost" className="px-5 py-2.5 text-xs md:px-6 md:py-3 md:text-sm">
              See the work
            </Button>
          </div>
        </div>

        {/* Column width = frame width (no extra full-bleed gutter on mobile) */}
        <div className="order-1 -mt-1 mx-auto w-full max-w-[300px] sm:max-w-xs md:order-2 md:mx-0 md:mt-0 md:max-w-md">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-brand-gold-deep/20 shadow-[0_20px_50px_rgba(141,110,27,0.18)] md:shadow-[0_28px_70px_rgba(141,110,27,0.18)]">
            <Image
              src={portrait}
              alt={`${DOCTOR.name} - portrait`}
              fill
              sizes="(min-width: 768px) 420px, 72vw"
              priority
              className="object-cover object-[center_45%] md:object-[center_35%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
