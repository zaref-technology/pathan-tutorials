import { HelpCircle } from "lucide-react";
import JsonLd from "@/components/public/JsonLd";
import { ContentPage } from "@/lib/types";

// Admin-editable FAQ. Hidden until at least one question has an answer.
// The structured data only contains what is visible here.
export default function FaqSection({ content }: { content: ContentPage }) {
  const faqs = content.items.filter((i) => i.title.trim() && i.description.trim());
  if (faqs.length === 0) return null;

  return (
    <section className="section-padding bg-[var(--bg-dark)] border-t border-[var(--border)]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.title,
            acceptedAnswer: { "@type": "Answer", text: f.description },
          })),
        }}
      />
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-8">
          <span className="section-badge mb-3 inline-flex"><HelpCircle size={13} /> FAQ</span>
          <h2 className="section-title">{content.heading}</h2>
          {content.subheading && <p className="section-subtitle mt-3">{content.subheading}</p>}
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <details key={f.id} className="card-glass group p-4 sm:p-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-3 font-display font-bold text-white text-sm sm:text-base">
                {f.title}
                <span className="text-primary text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{f.description}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
