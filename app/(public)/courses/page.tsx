import { getCourses } from "@/lib/firebase/firestore";
import Link from "next/link";
import CoursePrice from "@/components/public/CoursePrice";
import Image from "next/image";
import { BookOpen, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Maths Courses for Class 8 to 12 and MH-CET",
  description:
    "Mathematics courses for Classes 8th to 12th (CBSE and Maharashtra State Board) and MH-CET in Hinganghat.",
  alternates: { canonical: "/courses" },
};

export default async function CoursesPage() {
  const courses = await getCourses().catch(() => []);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Page Header */}
      <section className="py-12 sm:py-16 bg-[var(--bg-dark)] border-b border-[var(--border)]">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <span className="section-badge mb-4 inline-flex">
            <BookOpen size={14} /> Courses We Offer
          </span>
          <h1 className="section-title">
            Expert <span className="gradient-text">Mathematics</span> Coaching
          </h1>
          <p className="section-subtitle mt-4">
            Comprehensive mathematics coaching for Classes 8–12 (CBSE & State Board) and MHT-CET preparation.
          </p>
          <div className="gold-divider mx-auto mt-6" />
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding bg-[var(--bg-card)]">
        <div className="container-custom">
          {courses.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen size={48} className="mx-auto mb-4 text-[var(--text-muted)] opacity-30" />
              <h3 className="font-display font-bold text-white text-xl mb-2">Courses Coming Soon</h3>
              <p className="text-[var(--text-secondary)] text-sm">Course details are being updated. Please contact us for information.</p>
              <Link href="/contact" className="btn-primary mt-6 inline-flex">Enquire Now</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="card-glass flex flex-col overflow-hidden group">
                  {/* Image */}
                  {course.image ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={course.image} alt={course.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="badge badge-yellow">{course.class}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-primary/5 border-b border-[var(--border)] flex items-center justify-center relative">
                      <BookOpen size={36} className="text-primary/30" />
                      <div className="absolute bottom-3 left-3">
                        <span className="badge badge-yellow">{course.class}</span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div>
                      <h2 className="font-display font-bold text-white text-lg">{course.name}</h2>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {course.board && <span className="badge badge-gray">{course.board}</span>}
                        {course.subject && <span className="badge badge-gray">{course.subject}</span>}
                      </div>
                    </div>

                    {course.description && (
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{course.description}</p>
                    )}

                    {/* Features */}
                    {course.features && course.features.length > 0 && (
                      <ul className="flex flex-col gap-1.5">
                        {course.features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Duration */}
                    {course.duration && (
                      <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border)] mt-auto">
                        <Clock size={12} /> {course.duration}
                      </div>
                    )}

                    {/* Price */}
                    {(course.fees || course.offerPrice) && (
                      <div className="flex items-center justify-between gap-2 rounded-xl bg-primary/10 border border-primary/30 px-4 py-3">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                          Fees
                        </span>
                        <CoursePrice
                          fees={course.fees}
                          offerPrice={course.offerPrice}
                          className="text-xl font-extrabold text-primary flex items-baseline gap-2 flex-wrap justify-end [&_del]:text-sm [&_del]:text-[var(--text-muted)] [&_del]:opacity-100 [&_del]:ml-0"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/courses/${course.slug ?? course.id}`}
                        className="btn-outline btn-sm justify-center"
                      >
                        View Details
                      </Link>
                      <Link
                        href={course.ctaLink || "/contact"}
                        className="btn-primary btn-sm justify-center"
                      >
                        {course.ctaText || "Enquire Now"} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[var(--bg-dark)] border-t border-[var(--border)]">
        <div className="container-custom text-center max-w-xl mx-auto flex flex-col items-center gap-4">
          <h2 className="font-display font-extrabold text-2xl text-white">Have Questions About Admission?</h2>
          <p className="text-[var(--text-secondary)]">We&apos;re happy to guide you. Reach out anytime.</p>
          <Link href="/contact" className="btn-primary">Contact Us <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
