import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import ContentCards from "@/components/public/ContentCards";
import { getContentPageOrDefault } from "@/lib/content";
import { DOC_IDS } from "@/lib/types";

export const metadata = {
  title: "Our Teaching Methodology",
  description:
    "How Pathan Tutorials teaches Mathematics in Hinganghat: concept clarity, step-by-step learning, regular practice, weekly tests, doubt solving and personal attention.",
  alternates: { canonical: "/methodology" },
};

export default async function MethodologyPage() {
  const page = await getContentPageOrDefault(DOC_IDS.METHODOLOGY);

  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-12 sm:py-16 bg-[var(--bg-dark)] border-b border-[var(--border)]">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <span className="section-badge mb-4 inline-flex"><Lightbulb size={14} /> How We Teach</span>
          <h1 className="section-title">{page.heading}</h1>
          {page.subheading && <p className="section-subtitle mt-4">{page.subheading}</p>}
          <div className="gold-divider mx-auto mt-6" />
        </div>
      </section>

      {page.tagline && (
        <section className="py-8 bg-primary/5 border-b border-[var(--border)]">
          <p className="container-custom text-center font-display font-extrabold text-lg sm:text-2xl text-primary tracking-wide">
            {page.tagline}
          </p>
        </section>
      )}

      <section className="section-padding bg-[var(--bg-card)]">
        <div className="container-custom">
          <ContentCards items={page.items} numbered />
        </div>
      </section>

      <section className="py-14 bg-[var(--bg-dark)] border-t border-[var(--border)]">
        <div className="container-custom text-center max-w-xl mx-auto flex flex-col items-center gap-4">
          <h2 className="font-display font-extrabold text-2xl text-white">See the system in action</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/learning-system" className="btn-outline">Student Learning System</Link>
            <Link href="/contact" className="btn-primary">Admission Enquiry <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
