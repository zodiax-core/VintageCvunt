import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import {
  Mail, MailOpen, Reply, Trash2, ChevronLeft,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export const Route = createFileRoute("/message")({
  component: Messages,
  head: () => ({
    meta: [{ title: "Messages — VintageCvunt Admin" }],
  }),
});

type Filter = "All" | "Unread" | "Read" | "Replied";
const filters: Filter[] = ["All", "Unread", "Read", "Replied"];

const mockMessages = [
  { id: 1, name: "Elena Voss", email: "elena@example.com", subject: "Order #ORD-1001 sizing question", date: "2026-07-20", body: "Hi, I recently ordered the Obsidian Tailcoat in size M but I'm concerned it might be too tight in the shoulders. Can you advise on the measurements? I usually wear a 40R in suit jackets. Thank you!", status: "Unread" as const },
  { id: 2, name: "Marcus Webb", email: "marcus@example.com", subject: "Return request for Noir Leather Boots", date: "2026-07-20", body: "I received my Noir Leather Boots today but they are too small. I ordered size 10 but they fit like a 9.5. I'd like to initiate a return and exchange for size 11 if possible. Please let me know the process.", status: "Unread" as const },
  { id: 3, name: "Clara Hemlock", email: "clara@example.com", subject: "Discount code not working", date: "2026-07-19", body: "I tried applying code WELCOME20 at checkout but it says the code has expired. I thought it was valid until end of July? Can you please look into this or issue a new code? Thanks!", status: "Read" as const },
  { id: 4, name: "Julian Frost", email: "julian@example.com", subject: "Custom embroidered cufflinks inquiry", date: "2026-07-19", body: "I'm interested in commissioning a pair of custom embroidered cufflinks with my family crest. Do you offer custom design services? If so, what is the turnaround time and pricing? I've attached a reference image.", status: "Replied" as const },
  { id: 5, name: "Sylvia Kaine", email: "sylvia@example.com", subject: "International shipping to Australia", date: "2026-07-18", body: "Do you ship to Australia? I'd like to place a fairly large order (approx 6 items) but want to confirm shipping costs and estimated delivery times before I commit. Thank you!", status: "Unread" as const },
  { id: 6, name: "Dorian Ashford", email: "dorian@example.com", subject: "Missing item from order", date: "2026-07-18", body: "My order #ORD-1006 arrived today but one item is missing. I ordered the Chrome Signet Ring and Silver Mesh Veil but only the ring was in the package. Please help.", status: "Unread" as const },
  { id: 7, name: "Priya Nair", email: "priya@example.com", subject: "Wedding party bulk discount", date: "2026-07-17", body: "I'm organizing a wedding and we need 8 tailcoats and matching accessories. Do you offer bulk or wedding party discounts? The wedding is in October so we have some time.", status: "Read" as const },
  { id: 8, name: "Leo Ventura", email: "leo@example.com", subject: "Material composition question", date: "2026-07-16", body: "Could you tell me the exact material composition of the Argentine Cuff? The listing says 'premium metal alloy' but I'd like specifics — is it nickel-free? I have sensitive skin.", status: "Replied" as const },
  { id: 9, name: "Wren Calloway", email: "wren@example.com", subject: "Gift wrapping options", date: "2026-07-15", body: "Do you offer gift wrapping services? I want to send a pair of cufflinks as a birthday gift and would love to have it nicely wrapped with a personalized note.", status: "Read" as const },
  { id: 10, name: "Morgan Thorne", email: "morgan@example.com", subject: "Exchange size for tailcoat", date: "2026-07-14", body: "I bought the Obsidian Tailcoat in size L but it's slightly too big. Can I exchange it for size M? It's unworn with tags still attached. Please advise on the exchange process.", status: "Unread" as const },
];

const statusStyles: Record<string, string> = {
  Unread: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Read: "bg-green-500/20 text-green-400 border-green-500/30",
  Replied: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

function Messages() {
  const [filter, setFilter] = useState<Filter>("All");
  const [messages, setMessages] = useState(mockMessages);
  const [selected, setSelected] = useState<typeof mockMessages[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const unreadCount = messages.filter((m) => m.status === "Unread").length;
  const filtered = filter === "All" ? messages : messages.filter((m) => m.status === filter);

  function handleDelete(id: number) {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    setDeleteTarget(null);
  }

  function handleMarkRead(id: number) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "Read" as const } : m)));
  }

  function handleReply() {
    if (!replyText.trim() || !selected) return;
    setMessages((prev) => prev.map((m) => (m.id === selected.id ? { ...m, status: "Replied" as const } : m)));
    setSelected((prev) => prev ? { ...prev, status: "Replied" as const } : null);
    setReplyText("");
  }

  function StatusBadge({ status }: { status: string }) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusStyles[status] || ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {status}
      </span>
    );
  }

  if (selected) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <button onClick={() => { setSelected(null); setReplyText(""); }} className="btn-chrome btn-chrome-inner rounded-lg px-3 py-2 inline-flex items-center gap-2">
            <ChevronLeft size={14} />
            <span className="btn-label">Back</span>
          </button>
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-display mb-1">{selected.subject}</h2>
                <p className="font-mono text-[11px] text-chrome-dim">
                  From: {selected.name} &lt;{selected.email}&gt;
                </p>
                <p className="font-mono text-[10px] text-chrome-dim">{selected.date}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>
            <div className="border-t border-chrome/20 pt-4">
              <p className="font-mono text-[12px] leading-relaxed text-foreground/80">{selected.body}</p>
            </div>
            <div className="border-t border-chrome/20 pt-4 space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                rows={4}
                className="w-full rounded-xl border border-chrome/20 bg-graphite px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 resize-none"
              />
              <div className="flex items-center gap-2">
                <button onClick={handleReply} disabled={!replyText.trim()} className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2 disabled:opacity-30">
                  <Reply size={14} />
                  <span className="btn-label">Send Reply</span>
                </button>
                <button onClick={() => setDeleteTarget(selected.id)} className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2 text-red-400">
                  <Trash2 size={14} />
                  <span className="btn-label">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <ConfirmDialog
          open={deleteTarget !== null}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => deleteTarget !== null && handleDelete(deleteTarget)}
          title="Delete Message"
          message="Are you sure you want to delete this message?"
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-foreground">Messages</h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]">
              {unreadCount} unread
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-graphite border border-chrome/20 p-1 w-fit">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                filter === f ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"
              }`}
            >
              {f} {f === "All" ? `(${messages.length})` : ""}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-chrome/10">
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Status</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Name</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Subject</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Date</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((msg) => (
                  <TableRow
                    key={msg.id}
                    className="border-chrome/10 hover:bg-chrome/5 cursor-pointer"
                    onClick={() => { setSelected(msg); handleMarkRead(msg.id); }}
                  >
                    <TableCell><StatusBadge status={msg.status} /></TableCell>
                    <TableCell className="font-medium text-foreground">{msg.name}</TableCell>
                    <TableCell className="text-muted-foreground">{msg.email}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">{msg.subject}</TableCell>
                    <TableCell className="text-muted-foreground">{msg.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => { setSelected(msg); handleMarkRead(msg.id); }} className="btn-chrome btn-chrome-inner p-2 rounded-lg">
                          <MailOpen className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(msg.id)} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="md:hidden space-y-3">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3 cursor-pointer"
              onClick={() => { setSelected(msg); handleMarkRead(msg.id); }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground text-sm">{msg.name}</span>
                <StatusBadge status={msg.status} />
              </div>
              <p className="text-sm text-muted-foreground truncate">{msg.subject}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{msg.email}</span>
                <span>{msg.date}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button onClick={(e) => { e.stopPropagation(); setSelected(msg); handleMarkRead(msg.id); }} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs">
                  <MailOpen className="h-3.5 w-3.5 mr-1 inline" /> Read
                </button>
                <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(msg.id); }} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400">
                  <Trash2 className="h-3.5 w-3.5 mr-1 inline" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget !== null && handleDelete(deleteTarget)}
        title="Delete Message"
        message="Are you sure you want to delete this message?"
      />
    </AdminLayout>
  );
}
