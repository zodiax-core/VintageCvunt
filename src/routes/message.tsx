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
import { useQuery, useMutation } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { getSessionToken } from "@/lib/admin";

export const Route = createFileRoute("/message")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: Messages,
  head: () => ({
    meta: [{ title: "Messages — VintageCvunt Admin" }],
  }),
});

type Filter = "All" | "Unread" | "Read" | "Replied";
const filters: Filter[] = ["All", "Unread", "Read", "Replied"];



const statusStyles: Record<string, string> = {
  Unread: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Read: "bg-green-500/20 text-green-400 border-green-500/30",
  Replied: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

function Messages() {
  const messages = useQuery(api.messages.list, { sessionToken: getSessionToken() ?? "" }) ?? [];
  const markRead = useMutation(api.messages.markRead);
  const markReplied = useMutation(api.messages.markReplied);
  const removeMessage = useMutation(api.messages.remove);
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<(typeof messages)[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Id<"messages"> | null>(null);

  function displayStatus(m: (typeof messages)[0]): Filter {
    if (m.replied) return "Replied";
    if (m.status === "read") return "Read";
    return "Unread";
  }

  const unreadCount = messages.filter((m) => displayStatus(m) === "Unread").length;
  const filtered = filter === "All" ? messages : messages.filter((m) => displayStatus(m) === filter);

  function handleDelete(id: Id<"messages">) {
    removeMessage({ sessionToken: getSessionToken() ?? "", id });
    if (selected?._id === id) setSelected(null);
    setDeleteTarget(null);
  }

  function handleMarkRead(id: Id<"messages">) {
    markRead({ sessionToken: getSessionToken() ?? "", id });
  }

  function handleReply() {
    if (!replyText.trim() || !selected) return;
    markReplied({ sessionToken: getSessionToken() ?? "", id: selected._id });
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
                <p className="font-mono text-[10px] text-chrome-dim">{new Date(selected.createdAt).toLocaleDateString()}</p>
              </div>
              <StatusBadge status={displayStatus(selected)} />
            </div>
            <div className="border-t border-chrome/20 pt-4">
              <p className="font-mono text-[12px] leading-relaxed text-foreground/80">{selected.message}</p>
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
                <button onClick={() => setDeleteTarget(selected._id)} className="btn-chrome btn-chrome-inner rounded-lg px-4 py-2 inline-flex items-center gap-2 text-red-400">
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
                    key={msg._id}
                    className="border-chrome/10 hover:bg-chrome/5 cursor-pointer"
                    onClick={() => { setSelected(msg); handleMarkRead(msg._id); }}
                  >
                    <TableCell><StatusBadge status={displayStatus(msg)} /></TableCell>
                    <TableCell className="font-medium text-foreground">{msg.name}</TableCell>
                    <TableCell className="text-muted-foreground">{msg.email}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">{msg.subject}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => { setSelected(msg); handleMarkRead(msg._id); }} className="btn-chrome btn-chrome-inner p-2 rounded-lg">
                          <MailOpen className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(msg._id)} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400">
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
              key={msg._id}
              className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3 cursor-pointer"
              onClick={() => { setSelected(msg); handleMarkRead(msg._id); }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground text-sm">{msg.name}</span>
                <StatusBadge status={displayStatus(msg)} />
              </div>
              <p className="text-sm text-muted-foreground truncate">{msg.subject}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{msg.email}</span>
                <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button onClick={(e) => { e.stopPropagation(); setSelected(msg); handleMarkRead(msg._id); }} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs">
                  <MailOpen className="h-3.5 w-3.5 mr-1 inline" /> Read
                </button>
                <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(msg._id); }} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400">
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
