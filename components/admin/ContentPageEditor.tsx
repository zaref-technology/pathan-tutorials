"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import AdminShell from "@/components/admin/AdminShell";
import { getContentPage, saveContentPage } from "@/lib/firebase/firestore";
import { CONTENT_PAGE_DEFAULTS } from "@/lib/content-defaults";
import { ICON_KEYS } from "@/lib/icons";
import { ContentItem, ContentPage, ContentPageId } from "@/lib/types";
import { ArrowDown, ArrowUp, Loader2, Plus, Save, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  docId: ContentPageId;
  title: string;
  helpText: string;
  showTagline?: boolean;
}

export default function ContentPageEditor({ docId, title, helpText, showTagline = false }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [page, setPage] = useState<ContentPage>(CONTENT_PAGE_DEFAULTS[docId]);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (!loading && !user) router.push("/admin"); }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    getContentPage(docId)
      .then((saved) => {
        if (cancelled) return;
        if (saved && Array.isArray(saved.items)) setPage({ ...CONTENT_PAGE_DEFAULTS[docId], ...saved });
      })
      .catch(() => { if (!cancelled) toast.error("Failed to load content"); })
      .finally(() => { if (!cancelled) setFetching(false); });
    return () => { cancelled = true; };
  }, [user, docId]);

  const setField = (field: "heading" | "subheading" | "tagline", value: string) =>
    setPage((p) => ({ ...p, [field]: value }));

  const updateItem = (id: string, patch: Partial<ContentItem>) =>
    setPage((p) => ({ ...p, items: p.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) }));

  const addItem = () =>
    setPage((p) => ({ ...p, items: [...p.items, { id: crypto.randomUUID(), icon: "check", title: "", description: "" }] }));

  const removeItem = (id: string) => {
    if (!confirm("Remove this item?")) return;
    setPage((p) => ({ ...p, items: p.items.filter((it) => it.id !== id) }));
  };

  const moveItem = (index: number, direction: -1 | 1) =>
    setPage((p) => {
      const target = index + direction;
      if (target < 0 || target >= p.items.length) return p;
      const items = [...p.items];
      [items[index], items[target]] = [items[target], items[index]];
      return { ...p, items };
    });

  const handleSave = async () => {
    const items = page.items.filter((it) => it.title.trim());
    setSaving(true);
    try {
      await saveContentPage(docId, { ...page, items });
      setPage((p) => ({ ...p, items }));
      toast.success("Saved!");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen bg-dark flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>;
  }

  return (
    <AdminShell title={title}>
      <p className="text-sm text-[var(--text-secondary)] mb-5">{helpText}</p>

      {fetching ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-20 rounded-xl" />)}</div>
      ) : (
        <div className="space-y-5">
          <div className="admin-card space-y-4">
            <div><label className="form-label" htmlFor="cp-heading">Heading</label><input id="cp-heading" className="form-input" value={page.heading} onChange={(e) => setField("heading", e.target.value)} /></div>
            <div><label className="form-label" htmlFor="cp-sub">Sub-heading</label><textarea id="cp-sub" className="form-textarea" rows={2} value={page.subheading} onChange={(e) => setField("subheading", e.target.value)} /></div>
            {showTagline && (
              <div><label className="form-label" htmlFor="cp-tag">Highlighted tagline</label><input id="cp-tag" className="form-input" value={page.tagline} onChange={(e) => setField("tagline", e.target.value)} /></div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--text-secondary)]">{page.items.length} item(s). Items with an empty title are not saved.</p>
            <button onClick={addItem} className="btn-primary btn-sm"><Plus size={16} /> Add Item</button>
          </div>

          {page.items.map((it, i) => (
            <div key={it.id} className="admin-card space-y-3">
              <div className="grid sm:grid-cols-[1fr_9rem] gap-3">
                <div><label className="form-label" htmlFor={`t-${it.id}`}>Title</label><input id={`t-${it.id}`} className="form-input" value={it.title} onChange={(e) => updateItem(it.id, { title: e.target.value })} /></div>
                <div>
                  <label className="form-label" htmlFor={`i-${it.id}`}>Icon</label>
                  <select id={`i-${it.id}`} className="form-select" value={it.icon} onChange={(e) => updateItem(it.id, { icon: e.target.value })}>
                    {ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="form-label" htmlFor={`d-${it.id}`}>Description</label><textarea id={`d-${it.id}`} className="form-textarea" rows={3} value={it.description} onChange={(e) => updateItem(it.id, { description: e.target.value })} /></div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => moveItem(i, -1)} disabled={i === 0} aria-label="Move up" className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-30 cursor-pointer"><ArrowUp size={14} /></button>
                <button onClick={() => moveItem(i, 1)} disabled={i === page.items.length - 1} aria-label="Move down" className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-30 cursor-pointer"><ArrowDown size={14} /></button>
                <button onClick={() => removeItem(it.id)} aria-label="Remove item" className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}

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
