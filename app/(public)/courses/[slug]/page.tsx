import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ClipboardList, Clock, Layers, Lightbulb } from "lucide-react";
import { getCourseBySlug } from "@/lib/firebase/firestore";
import CoursePrice from "@/components/public/CoursePrice";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug).catch(() => null);
  if (!course) return { title: "Course not found", robots: { index: false } };

  return {
    title: `${course.name}${course.board ? ` (${course.board})` : ""} in Hinganghat`,
    description:
      course.description?.slice(0, 160) ||
      `${course.name} classes at Pathan Tutorials, Hinganghat.`,
    alternates: { canonical: `/courses/${course.slug ?? course.id}` },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-2">
      {items.map((item, i) => (
        <li key={`${i}-${item}`} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
          <CheckCircle2 size={15} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <section className="card-glass p-5 sm:p-6">
      <h2 className="flex items-center gap-2 font-display font-bold text-lg text-white mb-3">
        <Icon size={18} className="text-primary" aria-hidden="true" /> {title}
      </h2>
      {children}
    </section>
  );
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug).catch(() => null);
  if (!course) notFound();

  const enquiryHref = `/contact?course=${encodeURIComponent(course.name)}`;
  const hasPrice = Boolean(course.fees || course.offerPrice);

  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-10 sm:py-14 bg-[var(--bg-dark)] border-b border-[var(--border)]">
        <div className="container-custom max-w-5xl">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-primary transition-colors mb-5">
            <ArrowLeft size={14} /> All Courses
          </Link>
          <div className="grid md:grid-cols-[1fr_20rem] gap-8 items-center">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {course.class && <span className="badge badge-yellow">Class {course.class}</span>}
                {course.board && <span className="badge badge-gray">{course.board}</span>}
                {course.subject && <span className="badge badge-gray">{course.subject}</span>}
              </div>
              <h1 className="section-title !text-left">{course.name}</h1>
              {course.description && <p className="text-[var(--text-secondary)] leading-relaxed">{course.description}</p>}
              {course.duration && (
                <p className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]"><Clock size={14} /> {course.duration}</p>
              )}
            </div>
            {course.image && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)]">
                <Image src={course.image} alt={course.name} fill priority sizes="(max-width:768px) 100vw, 320px" className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[var(--bg-card)]">
        <div className="container-custom max-w-5xl grid lg:grid-cols-[1fr_18rem] gap-6 items-start">
          <div className="flex flex-col gap-5">
            {course.syllabus && course.syllabus.length > 0 && (
              <Section icon={BookOpen} title="Syllabus Overview"><BulletList items={course.syllabus} /></Section>
            )}
            {course.teachingApproach && (
              <Section icon={Lightbulb} title="Teaching Approach">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{course.teachingApproach}</p>
              </Section>
            )}
            {course.practiceFacilities && course.practiceFacilities.length > 0 && (
              <Section icon={ClipboardList} title="Practice and Test Facilities"><BulletList items={course.practiceFacilities} /></Section>
            )}
            {course.features && course.features.length > 0 && (
              <Section icon={Layers} title="What You Get"><BulletList items={course.features} /></Section>
            )}
          </div>

          <aside className="card-glass p-5 flex flex-col gap-4 lg:sticky lg:top-28">
            {hasPrice && (
              <div className="rounded-xl bg-primary/10 border border-primary/30 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1">Fees</p>
                <CoursePrice
                  fees={course.fees}
                  offerPrice={course.offerPrice}
                  className="text-2xl font-extrabold text-primary flex items-baseline gap-2 flex-wrap [&_del]:text-sm [&_del]:text-[var(--text-muted)] [&_del]:opacity-100 [&_del]:ml-0"
                />
              </div>
            )}
            <Link href={enquiryHref} className="btn-primary justify-center">
              Admission Enquiry <ArrowRight size={16} />
            </Link>
            <p className="text-xs text-[var(--text-muted)] text-center">Your course is preselected on the enquiry form.</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
