import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import ContentCards from "@/components/public/ContentCards";
import { getContentPageOrDefault } from "@/lib/content";
import { DOC_IDS } from "@/lib/types";

export const metadata = {
  title: "Student Learning System",
  description:
    "Weekly tests, monthly performance reports, chapter-wise practice papers, doubt solving and revision tests at Pathan Tutorials, Hinganghat.",
  alternates: { canonical: "/learning-system" },
};

export default async function LearningSystemPage() {
  const page = await getContentPageOrDefault(DOC_IDS.LEARNING_SYSTEM);

  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-12 sm:py-16 bg-[var(--bg-dark)] border-b border-[var(--border)]">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <span className="section-badge mb-4 inline-flex"><Layers size={14} /> Our Academic System</span>
          <h1 className="section-title">{page.heading}</h1>
          {page.subheading && <p className="section-subtitle mt-4">{page.subheading}</p>}
          <div className="gold-divider mx-auto mt-6" />
        </div>
      </section>

      <section className="section-padding bg-[var(--bg-card)]">
        <div className="container-custom">
          <ContentCards items={page.items} />
        </div>
      </section>

      <section className="py-14 bg-[var(--bg-dark)] border-t border-[var(--border)]">
        <div className="container-custom text-center max-w-xl mx-auto flex flex-col items-center gap-4">
          <h2 className="font-display font-extrabold text-2xl text-white">Want to know more?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/methodology" className="btn-outline">Our Teaching Methodology</Link>
            <Link href="/contact" className="btn-primary">Admission Enquiry <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
