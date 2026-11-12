import Image from "next/image";
import { ArrowRight, TrendingUp, User } from "lucide-react";
import { StudentResult } from "@/lib/types";

// Students who improved, not only toppers. Hidden until at least one story is published.
export default function ImprovementStories({ stories }: { stories: StudentResult[] }) {
  if (stories.length === 0) return null;

  return (
    <section className="section-padding bg-[var(--bg-card)] border-t border-[var(--border)]">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="section-badge mb-3 inline-flex"><TrendingUp size={13} /> Student Improvement Stories</span>
          <h2 className="section-title">Progress That <span className="gradient-text">Matters</span></h2>
          <p className="section-subtitle mt-3">Real students who improved their Mathematics with steady practice and guidance.</p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.map((story) => (
            <li key={story.id} className="card-glass p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-primary/30 bg-[var(--bg-surface)] flex-shrink-0">
                  {story.studentPhoto ? (
                    <Image src={story.studentPhoto} alt={story.studentName} fill sizes="56px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><User size={22} className="text-primary/40" /></div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-white text-sm truncate">{story.studentName}</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {[story.class && `Class ${story.class}`, story.school, story.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>

              {story.previousPercentage && story.percentage && (
                <div className="flex items-center justify-center gap-3 rounded-xl bg-primary/10 border border-primary/20 py-3">
                  <span className="text-lg font-bold text-[var(--text-muted)]">{story.previousPercentage}</span>
                  <ArrowRight size={16} className="text-primary" aria-label="improved to" />
                  <span className="text-2xl font-extrabold font-display text-primary">{story.percentage}</span>
                </div>
              )}

              {story.achievementDescription && (
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{story.achievementDescription}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
