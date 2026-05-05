import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/content-loader";
import { MarkdownPage } from "@/components/layout/MarkdownPage";

const URL = "/privacy";

export function generateMetadata() {
  const p = getPage(URL);
  return buildMetadata({ title: p?.title, description: p?.description, path: URL });
}

export default function Page() {
  return <MarkdownPage url={URL} eyebrow="Legal" showCta={false} />;
}
