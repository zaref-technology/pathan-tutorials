import { getIcon } from "@/lib/icons";
import type { Statistic } from "@/lib/types";

// Only statistics the admin has entered are shown. Values render exactly as typed,
// so nothing can appear as zero and nothing is invented in code.
// A slim strip keeps the section balanced whether there is one statistic or several.
export default function Stats({ stats }: { stats: Statistic[] }) {
  if (stats.length === 0) return null;

  return (
    <section id="stats" className="py-6 sm:py-8 bg-[var(--bg-card)] border-y border-[var(--border)]">
      <div className="container-custom">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
          {stats.map((stat) => {
            const Icon = getIcon(stat.icon);
            return (
              <li key={stat.id} className="flex items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-900 gradient-text leading-none">{stat.number}</p>
                  <p className="text-xs sm:text-sm font-600 text-[var(--text-secondary)] mt-1">{stat.title}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
