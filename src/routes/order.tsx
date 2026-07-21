import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Eye, Trash2, ChevronLeft, ChevronRight, Search, FileText, SlidersHorizontal, X } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { generateOrdersPDF } from "@/lib/pdf-utils";

export const Route = createFileRoute("/order")({
  component: Orders,
  head: () => ({
    meta: [{ title: "Orders — VintageCvunt Admin" }],
  }),
});

const statusList = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const dateRanges = [
  { key: "all", label: "All Time" },
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
] as const;

type DateRangeKey = (typeof dateRanges)[number]["key"];

const dateRangeLabel: Record<DateRangeKey, string> = {
  all: "All Time",
  today: "Today",
  week: "This Week",
  month: "This Month",
};

const mockOrders = [
  { id: "ORD-1001", customer: "Elena Voss", email: "elena@example.com", date: "2026-03-15", items: 3, total: 245.0, status: "Delivered" },
  { id: "ORD-1002", customer: "Marcus Webb", email: "marcus@example.com", date: "2026-03-14", items: 1, total: 89.5, status: "Shipped" },
  { id: "ORD-1003", customer: "Clara Hemlock", email: "clara@example.com", date: "2026-03-14", items: 5, total: 620.0, status: "Processing" },
  { id: "ORD-1004", customer: "Julian Frost", email: "julian@example.com", date: "2026-03-13", items: 2, total: 175.0, status: "Pending" },
  { id: "ORD-1005", customer: "Sylvia Kaine", email: "sylvia@example.com", date: "2026-03-12", items: 4, total: 412.0, status: "Delivered" },
  { id: "ORD-1006", customer: "Dorian Ashford", email: "dorian@example.com", date: "2026-03-11", items: 7, total: 890.0, status: "Cancelled" },
  { id: "ORD-1007", customer: "Priya Nair", email: "priya@example.com", date: "2026-03-10", items: 2, total: 134.0, status: "Shipped" },
  { id: "ORD-1008", customer: "Leo Ventura", email: "leo@example.com", date: "2026-03-09", items: 1, total: 45.0, status: "Delivered" },
  { id: "ORD-1009", customer: "Wren Calloway", email: "wren@example.com", date: "2026-03-08", items: 3, total: 298.0, status: "Processing" },
  { id: "ORD-1010", customer: "Morgan Thorne", email: "morgan@example.com", date: "2026-03-07", items: 6, total: 567.0, status: "Pending" },
  { id: "ORD-1011", customer: "Ivy Castell", email: "ivy@example.com", date: "2026-03-06", items: 2, total: 189.0, status: "Delivered" },
  { id: "ORD-1012", customer: "Ronan Voss", email: "ronan@example.com", date: "2026-03-05", items: 4, total: 376.0, status: "Shipped" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const PAGE_SIZE = 5;

function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRangeKey>("all");
  const [page, setPage] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const o of orders) {
      counts[o.status] = (counts[o.status] || 0) + 1;
    }
    return counts;
  }, [orders]);

  const latestDate = useMemo(() => {
    if (orders.length === 0) return new Date();
    return new Date(Math.max(...orders.map((o) => new Date(o.date).getTime())));
  }, [orders]);

  function matchesDateRange(dateStr: string, range: DateRangeKey): boolean {
    if (range === "all") return true;
    const d = new Date(dateStr);
    const ref = new Date(latestDate);
    if (range === "today") {
      const refStr = ref.toISOString().split("T")[0];
      return dateStr === refStr;
    }
    if (range === "week") {
      const day = ref.getDay();
      const diffToMonday = (day + 6) % 7;
      const monday = new Date(ref);
      monday.setDate(ref.getDate() - diffToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      return d >= new Date(monday.setHours(0, 0, 0, 0)) && d <= new Date(sunday.setHours(23, 59, 59, 999));
    }
    if (range === "month") {
      return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
    }
    return true;
  }

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || o.status === statusFilter;
      const matchDate = matchesDateRange(o.date, dateRangeFilter);
      return matchSearch && matchStatus && matchDate;
    });
  }, [orders, search, statusFilter, dateRangeFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function StatusBadge({ status }: { status: string }) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${statusColors[status] || ""}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {status}
      </span>
    );
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setOrders(orders.filter((o) => o.id !== deleteTarget));
    setDeleteTarget(null);
    setPage(0);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 no-print">
          <h1 className="text-xl md:text-2xl font-display">Orders</h1>
          <span className="rounded-full bg-graphite border border-chrome/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
            {orders.length}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between no-print">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-chrome-dim" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full rounded-xl bg-graphite border border-chrome/20 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-chrome-dim focus:outline-none focus:border-chrome/40"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => generateOrdersPDF(filtered)}
              className="btn-chrome btn-chrome-inner"
            >
              <FileText size={14} />
              <span className="btn-label">Download PDF</span>
            </button>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden btn-chrome btn-chrome-inner"
            >
              <SlidersHorizontal size={14} />
              <span className="btn-label">{showMobileFilters ? "Hide Filters" : "Show Filters"}</span>
            </button>
          </div>
        </div>

        <div className={`${showMobileFilters ? "flex" : "hidden"} md:flex flex-col gap-3 no-print`}>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => { setStatusFilter("All"); setPage(0); }}
              className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                statusFilter === "All"
                  ? "bg-chrome/20 text-foreground border-chrome/40"
                  : "text-chrome-dim border-transparent hover:border-chrome/20"
              }`}
            >
              All ({orders.length})
            </button>
            {statusList.map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(0); }}
                className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  statusFilter === s
                    ? "bg-chrome/20 text-foreground border-chrome/40"
                    : "text-chrome-dim border-transparent hover:border-chrome/20"
                }`}
              >
                {s} ({statusCounts[s] || 0})
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {dateRanges.map((dr) => (
              <button
                key={dr.key}
                onClick={() => { setDateRangeFilter(dr.key); setPage(0); }}
                className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  dateRangeFilter === dr.key
                    ? "bg-chrome/20 text-foreground border-chrome/40"
                    : "text-chrome-dim border-transparent hover:border-chrome/20"
                }`}
              >
                {dr.label}
              </button>
            ))}
          </div>
        </div>

        {(statusFilter !== "All" || dateRangeFilter !== "all") && (
          <div className="flex flex-wrap items-center gap-2 no-print">
            {statusFilter !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-chrome/5 px-3 py-1 font-mono text-[10px] text-foreground">
                {statusFilter}
                <button onClick={() => { setStatusFilter("All"); setPage(0); }}>
                  <X size={12} />
                </button>
              </span>
            )}
            {dateRangeFilter !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-chrome/20 bg-chrome/5 px-3 py-1 font-mono text-[10px] text-foreground">
                {dateRangeLabel[dateRangeFilter]}
                <button onClick={() => { setDateRangeFilter("all"); setPage(0); }}>
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={() => { setStatusFilter("All"); setDateRangeFilter("all"); setPage(0); }}
              className="font-mono text-[10px] text-chrome-dim hover:text-foreground transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="hidden md:block">
          <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-chrome/10">
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Order ID</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Customer</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Date</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Items</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Total</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Status</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((o) => (
                  <TableRow key={o.id} className="border-chrome/10 hover:bg-chrome/5">
                    <TableCell className="font-medium text-foreground">{o.id}</TableCell>
                    <TableCell className="text-chrome-dim">{o.customer}</TableCell>
                    <TableCell className="text-chrome-dim">{o.date}</TableCell>
                    <TableCell className="text-chrome-dim">{o.items}</TableCell>
                    <TableCell className="text-foreground">${o.total.toFixed(2)}</TableCell>
                    <TableCell><StatusBadge status={o.status} /></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to="/order/$id"
                          params={{ id: o.id }}
                          className="btn-chrome btn-chrome-inner p-2 rounded-lg"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(o.id)}
                          className="btn-chrome btn-chrome-inner p-2 rounded-lg text-red-400"
                        >
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

        <div className="md:hidden space-y-3 no-print">
          {paged.map((o) => (
            <div key={o.id} className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{o.id}</span>
                <StatusBadge status={o.status} />
              </div>
              <div className="text-sm text-chrome-dim">{o.customer}</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-chrome-dim">{o.date} &middot; {o.items} items</span>
                <span className="text-foreground font-semibold">${o.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Link
                  to="/order/$id"
                  params={{ id: o.id }}
                  className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs"
                >
                  <Eye className="h-3.5 w-3.5 mr-1 inline" /> View
                </Link>
                <button
                  onClick={() => setDeleteTarget(o.id)}
                  className="btn-chrome btn-chrome-inner p-2 rounded-lg text-xs text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1 inline" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between no-print">
            <span className="text-sm text-chrome-dim">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                className="btn-chrome btn-chrome-inner p-2 rounded-lg disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage(page + 1)}
                className="btn-chrome btn-chrome-inner p-2 rounded-lg disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Order"
        message={`Are you sure you want to delete order ${deleteTarget}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />
    </AdminLayout>
  );
}
