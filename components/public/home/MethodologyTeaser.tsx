import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import ContentCards from "@/components/public/ContentCards";
import { ContentPage } from "@/lib/types";

export default function MethodologyTeaser({ content }: { content: ContentPage }) {
  if (content.items.length === 0) return null;

  return (
    <section className="section-padding bg-[var(--bg-card)] border-t border-[var(--border)]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="section-badge mb-3 inline-flex"><Lightbulb size={13} /> Our Teaching Methodology</span>
          <h2 className="section-title">{content.heading}</h2>
          {content.tagline && (
            <p className="mt-4 font-display font-bold text-primary tracking-wide text-sm sm:text-base">{content.tagline}</p>
          )}
        </div>
        <ContentCards items={content.items} numbered />
        <div className="mt-8 text-center">
          <Link href="/methodology" className="btn-primary">Learn More <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
