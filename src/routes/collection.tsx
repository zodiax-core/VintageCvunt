import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import { Plus, Search, Edit3, Trash2, Upload, Save, AlertCircle } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery, useMutation } from "convex/react";
import { toWebP } from "@/lib/image-utils";
import { api } from "../../convex/_generated/api";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";

export const Route = createFileRoute("/collection")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: Collections,
  head: () => ({
    meta: [{ title: "Collections — VintageCvunt Admin" }],
  }),
});

function CollImage({ url, size = "h-10 w-10" }: { url?: string; size?: string }) {
  if (!url) return <div className={`${size} rounded-lg bg-chrome/10 flex items-center justify-center font-mono text-xs text-chrome-dim`}>—</div>;
  return <img src={url} alt="" className={`${size} rounded-lg object-cover border border-chrome/20`} />;
}

function Collections() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const allCollections = useQuery(api.collections.list) ?? [];
  const createCollection = useMutation(api.collections.create);
  const updateCollection = useMutation(api.collections.update);
  const removeCollection = useMutation(api.collections.remove);
  const generateUploadUrl = useMutation(api.collections.generateUploadUrl);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [saveError, setSaveError] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setEditingId(null); setName(""); setSlug(""); setDescription("");
    setIsActive(true); setImageFile(null); setImagePreviewUrl(""); setExistingImageUrl("");
    setSaveError("");
  };

  const handleFileChange = (file: File | null) => {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageFile(file);
    setImagePreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  useEffect(() => {
    return () => { if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl); };
  }, [imagePreviewUrl]);

  const startEdit = (c: typeof allCollections[number]) => {
    setEditingId(c._id); setName(c.name); setSlug(c.slug);
    setDescription(c.description ?? ""); setIsActive(c.isActive); setImageFile(null); setImagePreviewUrl("");
    setExistingImageUrl((c as any).imageUrl || "");
    setSaveError("");
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      let image: string | undefined;
      if (imageFile) {
        const webpFile = await toWebP(imageFile);
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, { method: "POST", body: webpFile });
        if (!result.ok) throw new Error("Upload failed");
        const { storageId } = await result.json();
        if (storageId) image = storageId;
      }
      if (editingId) {
        await updateCollection({
          id: editingId as any,
          name: name.trim(),
          slug: slug || name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
          description: description.trim(),
          isActive,
          ...(image ? { image } : {}),
        });
      } else {
        await createCollection({
          name: name.trim(),
          slug: slug || name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
          description: description.trim(),
          productIds: [],
          isActive,
          ...(image ? { image } : {}),
        });
      }
      resetForm();
      setSaveError("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save collection";
      setSaveError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, n: string) => {
    if (!window.confirm(`Delete "${n}"?`)) return;
    try { await removeCollection({ id: id as any }); } catch (err) { console.error(err); }
  };

  if (pathname !== "/collection") {
    return <AdminLayout><Outlet /></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-display">Collections</h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Manage categories</p>
      </div>

      <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6 mb-6 space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
          {editingId ? "Edit Collection" : "New Collection"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={name} onChange={(e) => { setName(e.target.value); setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }} placeholder="Name" className="rounded-xl border border-chrome/20 bg-graphite-2 px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full" />
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug (auto)" className="rounded-xl border border-chrome/20 bg-graphite-2 px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full" />
        </div>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="rounded-xl border border-chrome/20 bg-graphite-2 px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full min-h-[80px] resize-none" />
        <div className="flex flex-wrap items-center gap-4">
          <div onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 rounded-xl border border-dashed border-chrome/20 px-4 py-2.5 cursor-pointer hover:border-chrome/50 transition-colors">
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="" className="h-8 w-8 rounded object-cover" />
            ) : existingImageUrl ? (
              <img src={existingImageUrl} alt="" className="h-8 w-8 rounded object-cover" />
            ) : (
              <Upload size={14} className="text-chrome-dim" />
            )}
            <span className="font-mono text-[10px] text-chrome-dim">{imageFile ? imageFile.name : existingImageUrl ? "Change image" : "Upload image"}</span>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} />
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded" />
            <span className="font-mono text-[10px] text-chrome-dim">Active</span>
          </label>
          <div className="flex items-center gap-2 ml-auto">
            {editingId && <button onClick={resetForm} className="rounded-xl border border-chrome/20 px-4 py-2 font-mono text-[10px] text-chrome-dim hover:text-foreground transition-colors">Cancel</button>}
            <button onClick={handleSave} disabled={saving || !name.trim()} className="btn-chrome btn-chrome-inner !py-2">
              <Save size={14} />
              <span className="btn-label">{saving ? "Saving..." : editingId ? "Update" : "Create"}</span>
            </button>
          </div>
          {saveError && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 w-full">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <span className="font-mono text-[10px] text-red-400">{saveError}</span>
            </div>
          )}
        </div>
      </div>

      {allCollections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="font-display text-3xl text-chrome-dim italic">No collections yet</p>
        </div>
      ) : isMobile ? (
        <div className="space-y-3">
          {allCollections.map((c) => (
            <div key={c._id} className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-3">
                <CollImage url={(c as any).imageUrl} size="h-12 w-12" />
                <div className="flex-1 min-w-0">
                  <span className="font-display text-lg block truncate">{c.name}</span>
                  <span className={`h-2 w-2 rounded-full inline-block ${c.isActive ? "bg-green-400" : "bg-gray-500"}`} />
                </div>
              </div>
              <p className="font-mono text-[10px] text-chrome-dim">{c.slug} · {c.productIds.length} products</p>
              <div className="flex items-center gap-2 pt-2 border-t border-chrome/10">
                <button onClick={() => startEdit(c)} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim hover:text-foreground transition-colors">
                  <Edit3 size={12} /> Edit
                </button>
                <button onClick={() => handleDelete(c._id, c.name)} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Image</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Name</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Slug</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Products</span></TableHead>
                <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Active</span></TableHead>
                <TableHead className="text-right"><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCollections.map((c) => (
                <TableRow key={c._id}>
                  <TableCell>
                    <CollImage url={(c as any).imageUrl} size="h-10 w-10" />
                  </TableCell>
                  <TableCell><span className="font-mono text-[11px]">{c.name}</span></TableCell>
                  <TableCell><span className="font-mono text-[11px] text-chrome-dim">{c.slug}</span></TableCell>
                  <TableCell><span className="font-mono text-[11px]">{c.productIds.length}</span></TableCell>
                  <TableCell><span className={`font-mono text-[11px] ${c.isActive ? "text-green-400" : "text-gray-500"}`}>{c.isActive ? "Yes" : "No"}</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => startEdit(c)} className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/5 transition-colors text-chrome-dim hover:text-foreground">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDelete(c._id, c.name)} className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors text-chrome-dim hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
}
