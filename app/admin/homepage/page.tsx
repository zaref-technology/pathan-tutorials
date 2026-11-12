"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import AdminShell from "@/components/admin/AdminShell";
import ImageUpload from "@/components/admin/ImageUpload";
import { getHeroSettings, saveHeroSettings } from "@/lib/firebase/firestore";
import { HeroSettings } from "@/lib/types";
import { Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

const EMPTY: HeroSettings = {
  heading: "", subheading: "", description: "", ctaText: "", ctaLink: "",
  secondCtaText: "", secondCtaLink: "", heroImage: "", backgroundImage: "",
  badgeText: "", isActive: true,
};

export default function HomepageAdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<HeroSettings>(EMPTY);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (!loading && !user) router.push("/admin"); }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    getHeroSettings()
      .then((hero) => { if (!cancelled && hero) setForm({ ...EMPTY, ...hero }); })
      .catch(() => { if (!cancelled) toast.error("Failed to load homepage content"); })
      .finally(() => { if (!cancelled) setFetching(false); });
    return () => { cancelled = true; };
  }, [user]);

  const set = (field: keyof HeroSettings, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const handleSave = async () => {
    setSaving(true);
    try { await saveHeroSettings(form); toast.success("Homepage updated!"); }
    catch { toast.error("Save failed"); } finally { setSaving(false); }
  };

  if (loading || !user) return <div className="min-h-screen bg-dark flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>;

  return (
    <AdminShell title="Homepage">
      <p className="text-sm text-[var(--text-secondary)] mb-5">
        Edit the top section of the home page. Leave a field empty to use the default text. Other home page sections are edited under their own menu items.
      </p>

      {fetching ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
      ) : (
        <div className="admin-card space-y-4 max-w-3xl">
          <div><label className="form-label" htmlFor="hp-badge">Badge text</label><input id="hp-badge" className="form-input" value={form.badgeText} onChange={(e) => set("badgeText", e.target.value)} placeholder="Maths Made Easy" /></div>
          <div>
            <label className="form-label" htmlFor="hp-heading">Heading</label>
            <input id="hp-heading" className="form-input" value={form.heading} onChange={(e) => set("heading", e.target.value)} placeholder="Building Strong Concepts.|Developing Confident Learners." />
            <p className="text-xs text-[var(--text-muted)] mt-1">Use the | character to start the highlighted second line.</p>
          </div>
          <div><label className="form-label" htmlFor="hp-sub">Sub-heading</label><input id="hp-sub" className="form-input" value={form.subheading} onChange={(e) => set("subheading", e.target.value)} placeholder="Mathematics Classes for 8th–12th & MH-CET" /></div>
          <div><label className="form-label" htmlFor="hp-desc">Description</label><textarea id="hp-desc" className="form-textarea" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="form-label" htmlFor="hp-cta">Main button text</label><input id="hp-cta" className="form-input" value={form.ctaText} onChange={(e) => set("ctaText", e.target.value)} placeholder="Enroll Now" /></div>
            <div><label className="form-label" htmlFor="hp-ctal">Main button link</label><input id="hp-ctal" className="form-input" value={form.ctaLink} onChange={(e) => set("ctaLink", e.target.value)} placeholder="/contact" /></div>
            <div><label className="form-label" htmlFor="hp-cta2">Second button text</label><input id="hp-cta2" className="form-input" value={form.secondCtaText} onChange={(e) => set("secondCtaText", e.target.value)} placeholder="View Results" /></div>
            <div><label className="form-label" htmlFor="hp-ctal2">Second button link</label><input id="hp-ctal2" className="form-input" value={form.secondCtaLink} onChange={(e) => set("secondCtaLink", e.target.value)} placeholder="/results" /></div>
          </div>
          <ImageUpload
            label="Hero image (1:1). Leave empty to show the logo."
            folder="hero"
            value={form.heroImage}
            onChange={(url) => set("heroImage", url)}
            aspectRatio="square"
            crop
            cropAspect={1}
          />
          <div className="flex justify-end">
            <button onClick={handleSave} disabled={saving} className="btn-primary">
              {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> Save Changes</>}
            </button>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
