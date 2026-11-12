import { getFaculty } from "@/lib/firebase/firestore";
import Image from "next/image";
import { GraduationCap, AtSign, Link2, PlayCircle } from "lucide-react";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import type { Faculty } from "@/lib/types";

export const metadata = {
  title: "Meet Our Director and Faculty",
  description:
    "Meet Mr. Manjur Pathan and the Mathematics educators at Pathan Tutorials, Hinganghat.",
  alternates: { canonical: "/faculty" },
};

function DirectorProfile({ director }: { director: Faculty }) {
  const embedUrl = getYouTubeEmbedUrl(director.videoUrl);
  const facts = [
    { label: "Qualification", value: director.qualification },
    { label: "Experience", value: director.experience },
    { label: "Specialisation", value: director.specialisation },
    { label: "Classes Taught", value: director.classesTaught },
  ].filter((f) => f.value);

  return (
    <section className="section-padding bg-[var(--bg-card)] border-b border-[var(--border)]">
      <div className="container-custom max-w-5xl">
        <div className="grid md:grid-cols-[18rem_1fr] gap-8 lg:gap-12 items-start">
          <div className="relative aspect-[4/5] w-full max-w-xs mx-auto md:max-w-none rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)]">
            {director.profileImage ? (
              <Image src={director.profileImage} alt={director.name} fill priority sizes="(max-width:768px) 80vw, 288px" className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><GraduationCap size={56} className="text-primary/40" /></div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">{director.name}</h2>
              {director.designation && <p className="text-primary font-semibold mt-1">{director.designation}</p>}
            </div>

            {facts.length > 0 && (
              <dl className="grid sm:grid-cols-2 gap-3">
                {facts.map((f) => (
                  <div key={f.label} className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)]">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{f.label}</dt>
                    <dd className="text-sm font-semibold text-white mt-0.5">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {director.bio && <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{director.bio}</p>}

            {director.philosophy && (
              <div>
                <h3 className="font-display font-bold text-white mb-1">Teaching Philosophy</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{director.philosophy}</p>
              </div>
            )}

            {director.message && (
              <blockquote className="border-l-2 border-primary pl-4">
                <h3 className="font-display font-bold text-white mb-1">A Message for Students and Parents</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{director.message}</p>
              </blockquote>
            )}
          </div>
        </div>

        {embedUrl && (
          <div className="mt-10 rounded-2xl overflow-hidden border border-[var(--border)] aspect-video">
            <iframe
              title={`Introduction video by ${director.name}`}
              src={embedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allow="accelerometer; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default async function FacultyPage() {
  const allFaculty = await getFaculty().catch(() => []);
  const director = allFaculty.find((f) => f.isDirector) ?? null;
  const faculty = allFaculty.filter((f) => !f.isDirector);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-[var(--bg-dark)] border-b border-[var(--border)]">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <span className="section-badge mb-4 inline-flex">
            <GraduationCap size={14} /> Our Faculty
          </span>
          <h1 className="section-title">
            Meet Our <span className="gradient-text">Educators</span>
          </h1>
          <p className="section-subtitle mt-4">
            Experienced and passionate mathematics educators committed to your academic success.
          </p>
          <div className="gold-divider mx-auto mt-6" />
        </div>
      </section>

      {director && <DirectorProfile director={director} />}

      {/* Faculty Grid */}
      {(faculty.length > 0 || !director) && (
      <section className="section-padding bg-[var(--bg-card)]">
        <div className="container-custom">
          {faculty.length === 0 ? (
            <div className="text-center py-24">
              <GraduationCap size={48} className="mx-auto mb-4 text-[var(--text-muted)] opacity-30" />
              <h3 className="font-display font-bold text-white text-xl mb-2">Faculty Details Coming Soon</h3>
              <p className="text-[var(--text-secondary)] text-sm">Faculty profiles will be published shortly.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {faculty.map((f) => (
                <div key={f.id} className="card-glass p-6 flex flex-col items-center text-center gap-4 group">
                  {/* Photo */}
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-primary/30 ring-4 ring-primary/10 flex-shrink-0">
                    {f.profileImage ? (
                      <Image
                        src={f.profileImage}
                        alt={f.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap size={36} className="text-primary/50" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">{f.name}</h2>
                    <p className="text-sm text-primary font-semibold mt-0.5">{f.subject}</p>
                    {f.qualification && (
                      <p className="text-xs text-[var(--text-muted)] mt-1">{f.qualification}</p>
                    )}
                  </div>

                  {/* Experience */}
                  {f.experience && (
                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <span className="text-xs font-semibold text-primary">{f.experience} Experience</span>
                    </div>
                  )}

                  {/* Bio */}
                  {f.bio && (
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed text-center">{f.bio}</p>
                  )}

                  {/* Social Links */}
                  {(f.instagramUrl || f.linkedinUrl || f.youtubeUrl) && (
                    <div className="flex gap-2 mt-auto pt-3 border-t border-[var(--border)] w-full justify-center">
                      {f.instagramUrl && (
                        <a href={f.instagramUrl} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-primary hover:border-primary/30 transition-colors"
                          title="Instagram">
                          <AtSign size={16} />
                        </a>
                      )}
                      {f.linkedinUrl && (
                        <a href={f.linkedinUrl} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-primary hover:border-primary/30 transition-colors"
                          title="LinkedIn">
                          <Link2 size={16} />
                        </a>
                      )}
                      {f.youtubeUrl && (
                        <a href={f.youtubeUrl} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-primary hover:border-primary/30 transition-colors"
                          title="YouTube">
                          <PlayCircle size={16} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      )}
    </div>
  );
}
