import Link from "next/link";
import { ArrowRight, Bell, Calendar } from "lucide-react";
import { Announcement } from "@/lib/types";

export default function AnnouncementsTeaser({ announcements }: { announcements: Announcement[] }) {
  if (announcements.length === 0) return null;

  return (
    <section className="section-padding bg-[var(--bg-card)] border-t border-[var(--border)]">
      <div className="container-custom max-w-4xl">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <span className="section-badge mb-3 inline-flex"><Bell size={13} /> Announcements</span>
            <h2 className="section-title">Latest <span className="gradient-text">Updates</span></h2>
          </div>
          <Link href="/announcements" className="text-primary font-semibold text-sm flex-shrink-0 hover:text-primary-light transition-colors">View All</Link>
        </div>
        <ul className="flex flex-col gap-3">
          {announcements.map((a) => (
            <li key={a.id} className="card-glass p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {a.category && <span className="badge badge-yellow">{a.category}</span>}
                {a.date && <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]"><Calendar size={11} />{a.date}</span>}
              </div>
              <h3 className="font-display font-bold text-white text-base">{a.title}</h3>
              {a.description && <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">{a.description}</p>}
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <Link href="/announcements" className="btn-outline">All Announcements <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
