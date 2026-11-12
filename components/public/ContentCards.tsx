import { getIcon } from "@/lib/icons";
import type { ContentItem } from "@/lib/types";

interface ContentCardsProps {
  items: ContentItem[];
  numbered?: boolean;
  columns?: "two" | "three";
}

// Grid of icon cards for admin-editable content lists.
export default function ContentCards({ items, numbered = false, columns = "three" }: ContentCardsProps) {
  const grid = columns === "two" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <ul className={`grid ${grid} gap-5`}>
      {items.map((item, i) => {
        const Icon = getIcon(item.icon);
        return (
          <li key={item.id} className="card-glass p-5 sm:p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-primary" aria-hidden="true" />
              </div>
              {numbered && <span className="text-xs font-bold text-primary tracking-widest">STEP {String(i + 1).padStart(2, "0")}</span>}
            </div>
            <h3 className="font-display font-bold text-white text-base">{item.title}</h3>
            {item.description && <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>}
          </li>
        );
      })}
    </ul>
  );
}
