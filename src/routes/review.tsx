import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Check, X, Trash2, Star, Search, XCircle } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export const Route = createFileRoute("/review")({
  component: Reviews,
  head: () => ({
    meta: [{ title: "Reviews — VintageCvunt Admin" }],
  }),
});

type ReviewStatus = "Approved" | "Pending" | "Rejected";

const mockReviews = [
  { id: 1, product: "Obsidian Tailcoat", customer: "Elena Voss", rating: 5, content: "Absolutely stunning piece. The tailoring is impeccable and the fabric feels luxurious. Worth every penny.", date: "2026-07-18", status: "Approved" as ReviewStatus },
  { id: 2, product: "Argentine Cuff", customer: "Marcus Webb", rating: 4, content: "Beautiful craftsmanship. The silver detailing is exquisite. Slightly heavy on the wrist but overall a great accessory.", date: "2026-07-17", status: "Approved" as ReviewStatus },
  { id: 3, product: "Noir Leather Boots", customer: "Clara Hemlock", rating: 5, content: "Most comfortable boots I've ever owned. Broke in after just a few wears. The leather is top quality.", date: "2026-07-16", status: "Pending" as ReviewStatus },
  { id: 4, product: "Silver Mesh Veil", customer: "Julian Frost", rating: 3, content: "Looks great but the mesh is a bit delicate. Afraid it might tear with regular use. Good for special occasions.", date: "2026-07-15", status: "Approved" as ReviewStatus },
  { id: 5, product: "Chrome Signet Ring", customer: "Sylvia Kaine", rating: 5, content: "Perfect fit and the engraving is razor sharp. My husband loved it. Will order more as gifts.", date: "2026-07-14", status: "Approved" as ReviewStatus },
  { id: 6, product: "Obsidian Tailcoat", customer: "Dorian Ashford", rating: 4, content: "Great quality overall. The lining is beautiful. Only complaint is the sleeves were slightly long.", date: "2026-07-13", status: "Rejected" as ReviewStatus },
  { id: 7, product: "Argentine Cuff", customer: "Priya Nair", rating: 5, content: "Exquisite design. Got so many compliments at the gala. The clasp mechanism is smooth and secure.", date: "2026-07-12", status: "Pending" as ReviewStatus },
  { id: 8, product: "Noir Leather Boots", customer: "Leo Ventura", rating: 4, content: "Solid boots with great grip. Took a while to break in but now they fit like a glove. Would recommend.", date: "2026-07-11", status: "Approved" as ReviewStatus },
  { id: 9, product: "Silver Mesh Veil", customer: "Wren Calloway", rating: 3, content: "Pretty but overpriced for what it is. The silver finish is starting to wear off after only a few uses.", date: "2026-07-10", status: "Pending" as ReviewStatus },
  { id: 10, product: "Chrome Signet Ring", customer: "Morgan Thorne", rating: 5, content: "Perfect craftsmanship. The weight feels substantial and the chrome finish is flawless. My new favorite accessory.", date: "2026-07-09", status: "Approved" as ReviewStatus },
];

const statusStyles: Record<string, string> = {
  Approved: "bg-green-500/20 text-green-400 border-green-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

const ratingOptions = [5, 4, 3, 2, 1];
const statusOptions: ReviewStatus[] = ["Approved", "Pending", "Rejected"];

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 font-mono text-sm">
      {Array.from({ length: 5 }, (_, i) => (i < rating ? "★" : "☆")).join("")}
    </span>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  function updateStatus(id: number, status: ReviewStatus) {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  function handleDelete(id: number) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeleteTarget(null);
  }

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.product.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase());
    const matchesRating = ratingFilter === null || r.rating === ratingFilter;
    const matchesStatus = statusFilter === null || r.status === statusFilter;
    return matchesSearch && matchesRating && matchesStatus;
  });

  function StatusBadge({ status }: { status: string }) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusStyles[status] || ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {status}
      </span>
    );
  }

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const pendingCount = reviews.filter((r) => r.status === "Pending").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-2xl font-display">Reviews</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Manage customer feedback</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-5">
            <p className="font-display text-2xl mb-1">
              {avgRating}
              <span className="text-amber-400 ml-2">★</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Avg Rating</p>
          </div>
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-5">
            <p className="font-display text-2xl mb-1">{reviews.length}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Total Reviews</p>
          </div>
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-5">
            <p className="font-display text-2xl mb-1 text-yellow-400">{pendingCount}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Pending</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-chrome/20 bg-graphite px-3 py-2">
            <Search size={14} className="text-chrome-dim shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product or customer..."
              className="flex-1 bg-transparent font-mono text-[12px] outline-none placeholder:text-chrome-dim/50 text-foreground"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-chrome-dim hover:text-foreground">
                <XCircle size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setRatingFilter(null)}
              className={`rounded-lg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors border border-chrome/20 ${
                ratingFilter === null ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"
              }`}
            >
              All
            </button>
            {ratingOptions.map((r) => (
              <button
                key={r}
                onClick={() => setRatingFilter(ratingFilter === r ? null : r)}
                className={`rounded-lg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors border border-chrome/20 ${
                  ratingFilter === r ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"
                }`}
              >
                {r}★
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setStatusFilter(null)}
              className={`rounded-lg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors border border-chrome/20 ${
                statusFilter === null ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"
              }`}
            >
              All
            </button>
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(statusFilter === s ? null : s)}
                className={`rounded-lg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors border border-chrome/20 ${
                  statusFilter === s ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {(ratingFilter !== null || statusFilter !== null) && (
            <div className="flex items-center gap-2 flex-wrap">
              {ratingFilter !== null && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-chrome/10 border border-chrome/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                  Rating: {ratingFilter}★
                  <button onClick={() => setRatingFilter(null)} className="hover:text-foreground/70">
                    ×
                  </button>
                </span>
              )}
              {statusFilter !== null && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-chrome/10 border border-chrome/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                  Status: {statusFilter}
                  <button onClick={() => setStatusFilter(null)} className="hover:text-foreground/70">
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => { setRatingFilter(null); setStatusFilter(null); }}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim hover:text-foreground underline underline-offset-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        <div className="hidden md:block">
          <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-chrome/10">
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Product</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Customer</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Rating</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Content</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Date</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Status</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((review) => (
                  <TableRow key={review.id} className="border-chrome/10 hover:bg-chrome/5">
                    <TableCell className="font-medium text-foreground">{review.product}</TableCell>
                    <TableCell className="text-muted-foreground">{review.customer}</TableCell>
                    <TableCell><StarDisplay rating={review.rating} /></TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">{review.content}</TableCell>
                    <TableCell className="text-muted-foreground">{review.date}</TableCell>
                    <TableCell><StatusBadge status={review.status} /></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {review.status !== "Approved" && (
                          <button onClick={() => updateStatus(review.id, "Approved")} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-green-400">
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        {review.status !== "Rejected" && (
                          <button onClick={() => updateStatus(review.id, "Rejected")} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400">
                            <X className="h-4 w-4" />
                          </button>
                        )}
                        <button onClick={() => setDeleteTarget(review.id)} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400">
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
          {filtered.map((review) => (
            <div key={review.id} className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground text-sm">{review.product}</span>
                <StatusBadge status={review.status} />
              </div>
              <div className="text-sm text-muted-foreground">{review.customer}</div>
              <StarDisplay rating={review.rating} />
              <p className="text-sm text-muted-foreground line-clamp-2">{review.content}</p>
              <div className="text-xs text-muted-foreground">{review.date}</div>
              <div className="flex items-center gap-2 pt-1">
                {review.status !== "Approved" && (
                  <button onClick={() => updateStatus(review.id, "Approved")} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-green-400">
                    <Check className="h-3.5 w-3.5 mr-1 inline" /> Approve
                  </button>
                )}
                {review.status !== "Rejected" && (
                  <button onClick={() => updateStatus(review.id, "Rejected")} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400">
                    <X className="h-3.5 w-3.5 mr-1 inline" /> Reject
                  </button>
                )}
                <button onClick={() => setDeleteTarget(review.id)} className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400">
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
        title="Delete Review"
        message="Are you sure you want to delete this review?"
      />
    </AdminLayout>
  );
}
