import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="That page doesn't exist."
        lede="The link may be old, or the page has moved. Try one of these instead."
      />
      <section className="py-12 md:py-20">
        <Container size="md">
          <div className="flex flex-wrap gap-3">
            <Button href="/">Home</Button>
            <Button href="/about" variant="ghost">About Dr. Sethi</Button>
            <Button href="/case-studies" variant="ghost">Case studies</Button>
            <Button href="/e-consult" variant="ink">Talk to him</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
