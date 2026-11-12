import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Faculty } from "@/lib/types";

// Short director introduction for the home page. Hidden until a director profile exists.
export default function DirectorIntro({ director }: { director: Faculty | null }) {
  if (!director) return null;
  const blurb = director.message || director.bio;

  return (
    <section className="section-padding bg-[var(--bg-dark)] border-t border-[var(--border)]">
      <div className="container-custom">
        <div className="grid md:grid-cols-[18rem_1fr] gap-8 lg:gap-12 items-center max-w-4xl mx-auto">
          <div className="relative aspect-square w-full max-w-xs mx-auto md:max-w-none rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)]">
            {director.profileImage ? (
              <Image src={director.profileImage} alt={director.name} fill sizes="(max-width:768px) 80vw, 288px" className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><GraduationCap size={56} className="text-primary/40" /></div>
            )}
          </div>
          <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
            <span className="section-badge inline-flex"><GraduationCap size={13} /> Meet Our Director</span>
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">{director.name}</h2>
              {director.designation && <p className="text-primary font-semibold mt-1">{director.designation}</p>}
              {director.qualification && <p className="text-xs text-[var(--text-muted)] mt-1">{director.qualification}</p>}
            </div>
            {blurb && <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-6">{blurb}</p>}
            <Link href="/faculty" className="btn-outline">Read Full Profile <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
