"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import AdminShell from "@/components/admin/AdminShell";
import { getAllStatistics, addStatistic, updateStatistic, deleteStatistic } from "@/lib/firebase/firestore";
import { ICON_KEYS } from "@/lib/icons";
import { Statistic } from "@/lib/types";
import { Plus, Pencil, Trash2, X, Save, Loader2, BarChart3, ToggleLeft, ToggleRight } from "lucide-react";
import toast from "react-hot-toast";

const EMPTY: Omit<Statistic, "id"> = { number: "", title: "", icon: "trophy", order: 0, isActive: true };

type ModalState = { mode: "add" | "edit"; data: Statistic | Omit<Statistic, "id"> } | null;

export default function StatisticsAdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Statistic[]>([]);
  const [fetching, setFetching] = useState(true);
  const [modal, setModal] = useState<ModalState>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (!loading && !user) router.push("/admin"); }, [user, loading, router]);

  const [reloadKey, setReloadKey] = useState(0);
  const load = () => setReloadKey((k) => k + 1);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    getAllStatistics()
      .then((data) => { if (!cancelled) setItems(data); })
      .catch(() => { if (!cancelled) toast.error("Failed to load statistics"); })
      .finally(() => { if (!cancelled) setFetching(false); });
    return () => { cancelled = true; };
  }, [user, reloadKey]);

  const set = (field: keyof Statistic, val: unknown) =>
    setModal((m) => (m ? { ...m, data: { ...m.data, [field]: val } } : null));

  const handleSave = async () => {
    if (!modal) return;
    const data = modal.data;
    if (!data.number.trim() || !data.title.trim()) { toast.error("Number and title are required"); return; }
    setSaving(true);
    try {
      if (modal.mode === "add") { await addStatistic(data as Omit<Statistic, "id">); toast.success("Added!"); }
      else { const { id, ...rest } = data as Statistic; await updateStatistic(id, rest); toast.success("Updated!"); }
      setModal(null); load();
    } catch { toast.error("Save failed"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this statistic?")) return;
    try { await deleteStatistic(id); toast.success("Deleted"); load(); } catch { toast.error("Delete failed"); }
  };

  const handleToggle = async (item: Statistic) => {
    try { await updateStatistic(item.id, { isActive: !item.isActive }); load(); } catch { toast.error("Update failed"); }
  };

  if (loading || !user) return <div className="min-h-screen bg-dark flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>;

  const d = modal?.data;

  return (
    <AdminShell title="Statistics">
      <p className="text-sm text-[var(--text-secondary)] mb-5">
        These counters appear on the home page. Only publish numbers you have verified. The section is hidden when there are no active statistics.
      </p>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-[var(--text-secondary)]">{items.length} statistic(s)</p>
        <button onClick={() => setModal({ mode: "add", data: { ...EMPTY, order: items.length + 1 } })} className="btn-primary btn-sm">
          <Plus size={16} /> Add Statistic
        </button>
      </div>

      <div className="admin-card">
        {fetching ? (
          <div className="space-y-3 p-2">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-14 rounded-xl" />)}</div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-[var(--text-muted)]">
            <BarChart3 size={36} className="opacity-30" />
            <p className="text-sm">No statistics yet. The home page counters stay hidden until you add some.</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-[var(--border)]">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 py-3 px-1">
                <div className="min-w-0">
                  <p className="font-display font-bold text-primary text-lg leading-tight">{item.number}</p>
                  <p className="text-sm text-[var(--text-secondary)] truncate">{item.title}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => handleToggle(item)} aria-label={item.isActive ? "Hide" : "Show"} className="cursor-pointer">
                    {item.isActive ? <ToggleRight size={22} className="text-green-500" /> : <ToggleLeft size={22} className="text-[var(--text-muted)]" />}
                  </button>
                  <button onClick={() => setModal({ mode: "edit", data: { ...item } })} aria-label="Edit" className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(item.id)} aria-label="Delete" className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && d && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[92dvh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <h3 className="font-700 text-white text-base">{modal.mode === "add" ? "Add Statistic" : "Edit Statistic"}</h3>
              <button onClick={() => setModal(null)} aria-label="Close" className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-white cursor-pointer"><X size={18} /></button>
            </div>
            <div className="overflow-y-auto p-5 space-y-4">
              <div><label className="form-label" htmlFor="st-number">Number</label><input id="st-number" className="form-input" value={d.number} onChange={(e) => set("number", e.target.value)} placeholder="Exactly as it should appear" /></div>
              <div><label className="form-label" htmlFor="st-title">Title</label><input id="st-title" className="form-input" value={d.title} onChange={(e) => set("title", e.target.value)} placeholder="Students Taught" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label" htmlFor="st-icon">Icon</label>
                  <select id="st-icon" className="form-select" value={d.icon} onChange={(e) => set("icon", e.target.value)}>
                    {ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div><label className="form-label" htmlFor="st-order">Display Order</label><input id="st-order" className="form-input" type="number" value={d.order} onChange={(e) => set("order", parseInt(e.target.value) || 0)} /></div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer w-fit">
                <input type="checkbox" checked={d.isActive} onChange={(e) => set("isActive", e.target.checked)} className="w-4 h-4 accent-primary" />
                <span className="text-sm text-[var(--text-secondary)]">Active (show on website)</span>
              </label>
            </div>
            <div className="border-t border-[var(--border)] px-5 py-4 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="btn-outline btn-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary btn-sm">
                {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> Save</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
