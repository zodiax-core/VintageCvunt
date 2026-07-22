import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Pencil, Save, X, FileText, Quote, Mail, Layout } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/content")({
  component: Content,
  head: () => ({
    meta: [{ title: "Content — VintageCvunt Admin" }],
  }),
});

const iconMap: Record<string, typeof FileText> = {
  "hero-banner": Layout,
  "hero": Layout,
  "about-feature": FileText,
  "about": FileText,
  "featured-quote": Quote,
  "quote": Quote,
  "newsletter-cta": Mail,
  "newsletter": Mail,
};

function Content() {
  const contentBlocks = useQuery(api.content.list) ?? [];
  const upsertContent = useMutation(api.content.upsert);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  function startEdit(block: (typeof contentBlocks)[0]) {
    setEditingId(block._id);
    setEditValue(block.content);
  }

  function saveEdit(id: string) {
    const block = contentBlocks.find((b) => b._id === id);
    if (block) {
      upsertContent({ key: block.key, title: block.title, content: editValue, type: block.type });
    }
    setEditingId(null);
    setEditValue("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditValue("");
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-2xl font-display">Content Management</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Edit site content blocks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contentBlocks.map((block) => {
            const Icon = iconMap[block.key] || FileText;
            const isEditing = editingId === block._id;
            const preview = block.content.length > 80 ? block.content.slice(0, 80) + "..." : block.content;

            return (
              <div key={block._id} className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-chrome/10 flex items-center justify-center">
                      <Icon size={18} className="text-chrome-dim" />
                    </div>
                    <div>
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">{block.title}</h3>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim">{block.type}</p>
                    </div>
                  </div>
                  {!isEditing && (
                    <button onClick={() => startEdit(block)} className="btn-chrome btn-chrome-inner p-2 rounded-lg">
                      <Pencil size={14} />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 resize-none"
                    />
                    <div className="flex items-center gap-2">
                      <button onClick={() => saveEdit(block._id)} className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2">
                        <Save size={14} />
                        <span className="btn-label">Save</span>
                      </button>
                      <button onClick={cancelEdit} className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2">
                        <X size={14} />
                        <span className="btn-label">Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-background/50 rounded-xl px-4 py-3 border border-chrome/10">
                    <p className="font-mono text-[12px] text-foreground/70 leading-relaxed">{preview}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
