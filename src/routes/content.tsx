import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Pencil, Save, X, FileText, Quote, Mail, Layout, HelpCircle, Trash2, Plus } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export const Route = createFileRoute("/content")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
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

  // FAQ state
  const faqs = useQuery(api.faq.list) ?? [];
  const createFaq = useMutation(api.faq.create);
  const updateFaq = useMutation(api.faq.update);
  const removeFaq = useMutation(api.faq.remove);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", category: "General", order: 0 });
  const [editingFaqId, setEditingFaqId] = useState<Id<"faq"> | null>(null);

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

  function resetFaqForm() {
    setFaqForm({ question: "", answer: "", category: "General", order: faqs.length });
    setEditingFaqId(null);
  }

  function startEditFaq(faq: (typeof faqs)[number]) {
    setEditingFaqId(faq._id);
    setFaqForm({ question: faq.question, answer: faq.answer, category: faq.category, order: faq.order });
  }

  function handleSaveFaq() {
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;
    if (editingFaqId) {
      updateFaq({
        id: editingFaqId,
        question: faqForm.question.trim(),
        answer: faqForm.answer.trim(),
        category: faqForm.category,
        order: faqForm.order,
        isActive: true,
      });
    } else {
      createFaq({
        question: faqForm.question.trim(),
        answer: faqForm.answer.trim(),
        category: faqForm.category,
        order: faqForm.order,
        isActive: true,
      });
    }
    resetFaqForm();
  }

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Content Blocks Section */}
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

        {/* FAQ Management Section */}
        <div className="space-y-6 border-t border-chrome/20 pt-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg md:text-xl font-display">FAQ Management</h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Add, edit or remove frequently asked questions</p>
          </div>

          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
              {editingFaqId ? "Edit FAQ" : "Add FAQ"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={faqForm.question}
                onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                placeholder="Question"
                className="rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full"
              />
              <select
                value={faqForm.category}
                onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                className="rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full"
              >
                {["General", "Orders", "Shipping", "Returns", "Product", "Payment"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <textarea
              value={faqForm.answer}
              onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
              placeholder="Answer"
              rows={3}
              className="rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 w-full resize-none"
            />
            <div className="flex items-center gap-2">
              {editingFaqId && (
                <button onClick={resetFaqForm} className="rounded-xl border border-chrome/20 px-4 py-2 font-mono text-[10px] text-chrome-dim hover:text-foreground transition-colors">
                  Cancel
                </button>
              )}
              <button
                onClick={handleSaveFaq}
                disabled={!faqForm.question.trim() || !faqForm.answer.trim()}
                className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2"
              >
                <Plus size={14} />
                <span className="btn-label">{editingFaqId ? "Update" : "Add FAQ"}</span>
              </button>
            </div>
          </div>

          <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-chrome/10">
                    <th className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim text-left px-5 py-4">Question</th>
                    <th className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim text-left px-5 py-4">Category</th>
                    <th className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim text-right px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-5 py-10 text-center font-mono text-[11px] text-chrome-dim">No FAQs yet</td>
                    </tr>
                  ) : (
                    faqs.map((faq) => (
                      <tr key={faq._id} className="border-b border-chrome/10 hover:bg-chrome/5">
                        <td className="px-5 py-4">
                          <p className="font-mono text-[11px] text-foreground">{faq.question}</p>
                          <p className="font-mono text-[9px] text-chrome-dim mt-0.5 line-clamp-1">{faq.answer}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-chrome/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim">
                            {faq.category}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => startEditFaq(faq)} className="btn-chrome btn-chrome-inner p-2 rounded-lg">
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button onClick={() => removeFaq({ id: faq._id })} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="md:hidden divide-y divide-chrome/10">
              {faqs.length === 0 ? (
                <p className="px-5 py-10 text-center font-mono text-[11px] text-chrome-dim">No FAQs yet</p>
              ) : (
                faqs.map((faq) => (
                  <div key={faq._id} className="px-4 py-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-mono text-[11px] text-foreground flex-1">{faq.question}</p>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => startEditFaq(faq)} className="btn-chrome btn-chrome-inner p-1.5 rounded-lg">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => removeFaq({ id: faq._id })} className="btn-chrome btn-chrome-inner p-1.5 rounded-lg text-red-400">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="font-mono text-[9px] text-chrome-dim line-clamp-2">{faq.answer}</p>
                    <span className="inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-chrome/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-chrome-dim">
                      {faq.category}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
