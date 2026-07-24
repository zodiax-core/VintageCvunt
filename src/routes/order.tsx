import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Eye, ChevronLeft, ChevronRight, Search, FileText, SlidersHorizontal, X } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { generateOrdersPDF } from "@/lib/pdf-utils";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export const Route = createFileRoute("/order")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
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



const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const PAGE_SIZE = 5;

function Orders() {
  const orders = useQuery(api.orders.list) ?? [];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRangeKey>("all");
  const [page, setPage] = useState(0);
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
    return new Date(Math.max(...orders.map((o) => new Date(o.createdAt).getTime())));
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
      const dateStr = new Date(o.createdAt).toISOString().split("T")[0];
      const matchSearch =
        o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || o.status === statusFilter;
      const matchDate = matchesDateRange(dateStr, dateRangeFilter);
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
              onClick={() => generateOrdersPDF(filtered.map(o => ({
                id: o._id,
                orderNumber: o.orderNumber,
                customer: o.customerName || "Customer",
                email: o.customerEmail,
                date: new Date(o.createdAt).toLocaleDateString(),
                items: o.items.reduce((acc: any, i: any) => acc + i.quantity, 0),
                total: o.total,
                status: o.status
              })))}
              className="btn-chrome btn-chrome-inner btn-chrome-sm"
            >
              <FileText size={12} />
              <span className="btn-label">Download PDF</span>
            </button>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden btn-chrome btn-chrome-inner btn-chrome-sm"
            >
              <SlidersHorizontal size={12} />
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
                  <TableRow key={o._id} className="border-chrome/10 hover:bg-chrome/5">
                    <TableCell className="font-medium text-foreground">{o.orderNumber}</TableCell>
                    <TableCell className="text-chrome-dim">{o.customerName}</TableCell>
                    <TableCell className="text-chrome-dim">{new Date(o.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-chrome-dim">{o.items.length}</TableCell>
                    <TableCell className="text-foreground">PKR {o.total.toFixed(2)}</TableCell>
                    <TableCell><StatusBadge status={o.status} /></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to="/order/$id"
                          params={{ id: o._id }}
                          className="btn-chrome btn-chrome-inner p-2 rounded-lg"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

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
            <div key={o._id} className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{o.orderNumber}</span>
                <StatusBadge status={o.status} />
              </div>
              <div className="text-sm text-chrome-dim">{o.customerName}</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-chrome-dim">{new Date(o.createdAt).toLocaleDateString()} &middot; {o.items.length} items</span>
                <span className="text-foreground font-semibold">PKR {o.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Link
                  to="/order/$id"
                  params={{ id: o._id }}
                  className="btn-chrome btn-chrome-inner btn-chrome-sm"
                >
                  <Eye className="h-3 w-3" /> View
                </Link>

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


    </AdminLayout>
  );
}
