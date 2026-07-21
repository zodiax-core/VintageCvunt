import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Pencil, Save, X, FileText, Quote, Mail, Layout } from "lucide-react";

export const Route = createFileRoute("/content")({
  component: Content,
  head: () => ({
    meta: [{ title: "Content — VintageCvunt Admin" }],
  }),
});

interface ContentBlock {
  id: string;
  title: string;
  type: string;
  preview: string;
  content: string;
  icon: typeof FileText;
}

const initialBlocks: ContentBlock[] = [
  {
    id: "hero-banner",
    title: "Hero Section",
    type: "Hero Banner",
    preview: "Discover timeless elegance with our curated collection of vintage-inspired accessories and apparel.",
    content: "Discover timeless elegance with our curated collection of vintage-inspired accessories and apparel. Each piece tells a story of craftsmanship and style.",
    icon: Layout,
  },
  {
    id: "about-feature",
    title: "About Page Intro",
    type: "About Feature",
    preview: "VintageCvunt was born from a passion for resurrecting the elegance of bygone eras...",
    content: "VintageCvunt was born from a passion for resurrecting the elegance of bygone eras. We scour the globe for the finest materials and collaborate with master artisans who share our vision of timeless design. Every item in our collection is a testament to the art of slow, deliberate craftsmanship.",
    icon: FileText,
  },
  {
    id: "featured-quote",
    title: "Home Quote",
    type: "Featured Quote",
    preview: "\"Style is a way to say who you are without having to speak.\" — Rachel Zoe",
    content: "\"Style is a way to say who you are without having to speak.\" — Rachel Zoe",
    icon: Quote,
  },
  {
    id: "newsletter-cta",
    title: "Newsletter",
    type: "Newsletter CTA",
    preview: "Subscribe to receive exclusive offers, early access to new collections, and style inspiration.",
    content: "Subscribe to receive exclusive offers, early access to new collections, and style inspiration delivered to your inbox every week.",
    icon: Mail,
  },
];

function Content() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  function startEdit(block: ContentBlock) {
    setEditingId(block.id);
    setEditValue(block.content);
  }

  function saveEdit(id: string) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, content: editValue, preview: editValue.length > 80 ? editValue.slice(0, 80) + "..." : editValue } : b)));
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
          {blocks.map((block) => {
            const Icon = block.icon;
            const isEditing = editingId === block.id;

            return (
              <div key={block.id} className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4">
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
                      <button onClick={() => saveEdit(block.id)} className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2">
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
                    <p className="font-mono text-[12px] text-foreground/70 leading-relaxed">{block.preview}</p>
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
