import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, ChevronLeft, ChevronRight, Search, Users, Download, X } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export const Route = createFileRoute("/customer")({
  component: Customers,
  head: () => ({
    meta: [{ title: "Customers — VintageCvunt Admin" }],
  }),
});



const statusOptions = ["All", "Active", "Inactive"] as const;
const dateOptions = ["All Time", "Past Month", "Past 3 Months", "Past Year"] as const;

const PAGE_SIZE = 5;

function isWithinMonths(dateStr: string, months: number): boolean {
  const d = new Date(dateStr);
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  return d >= cutoff;
}

function Customers() {
  const customers = useQuery(api.customers.list) ?? [];
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("All Time");
  const [minSpend, setMinSpend] = useState("");
  const [maxSpend, setMaxSpend] = useState("");

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const q = search.toLowerCase();
      const joined = new Date(c.createdAt).toISOString().split("T")[0];
      if (q && !c.name.toLowerCase().includes(q) && !c.email.toLowerCase().includes(q)) return false;
      if (statusFilter !== "All" && c.status !== statusFilter) return false;
      if (dateFilter === "Past Month" && !isWithinMonths(joined, 1)) return false;
      if (dateFilter === "Past 3 Months" && !isWithinMonths(joined, 3)) return false;
      if (dateFilter === "Past Year" && !isWithinMonths(joined, 12)) return false;
      const min = minSpend ? parseFloat(minSpend) : 0;
      const max = maxSpend ? parseFloat(maxSpend) : Infinity;
      if (c.totalSpent < min || c.totalSpent > max) return false;
      return true;
    });
  }, [customers, search, statusFilter, dateFilter, minSpend, maxSpend]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const hasActiveFilters = statusFilter !== "All" || dateFilter !== "All Time" || minSpend || maxSpend;

  function clearFilters() {
    setStatusFilter("All");
    setDateFilter("All Time");
    setMinSpend("");
    setMaxSpend("");
    setPage(0);
  }

  function removeStatusFilter() { setStatusFilter("All"); setPage(0); }
  function removeDateFilter() { setDateFilter("All Time"); setPage(0); }
  function removeSpendFilter() { setMinSpend(""); setMaxSpend(""); setPage(0); }

  function exportCSV() {
    const headers = ["Name", "Email", "Orders", "Total Spent", "Joined", "Status"];
    const rows = filtered.map((c) => [
      c.name,
      c.email,
      c.totalOrders.toString(),
      c.totalSpent.toFixed(2),
      new Date(c.createdAt).toISOString().split("T")[0],
      c.status,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
          <span className="rounded-full bg-graphite border border-chrome/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {customers.length}
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full rounded-xl bg-graphite border border-chrome/20 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-chrome/40"
            />
          </div>
          <button
            onClick={exportCSV}
            className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(0); }}
              className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                statusFilter === s
                  ? "bg-chrome/20 text-foreground border-chrome/30"
                  : "bg-transparent text-muted-foreground border-chrome/20 hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
          <span className="w-px h-5 bg-chrome/20 mx-1" />
          {dateOptions.map((d) => (
            <button
              key={d}
              onClick={() => { setDateFilter(d); setPage(0); }}
              className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                dateFilter === d
                  ? "bg-chrome/20 text-foreground border-chrome/30"
                  : "bg-transparent text-muted-foreground border-chrome/20 hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
          <span className="w-px h-5 bg-chrome/20 mx-1" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Min $</span>
            <input
              type="number"
              min={0}
              value={minSpend}
              onChange={(e) => { setMinSpend(e.target.value); setPage(0); }}
              className="w-20 rounded-lg bg-graphite border border-chrome/20 px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-chrome/40"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Max $</span>
            <input
              type="number"
              min={0}
              value={maxSpend}
              onChange={(e) => { setMaxSpend(e.target.value); setPage(0); }}
              className="w-20 rounded-lg bg-graphite border border-chrome/20 px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-chrome/40"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {statusFilter !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-chrome/10 border border-chrome/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                Status: {statusFilter}
                <button onClick={removeStatusFilter} className="hover:text-red-400 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {(minSpend || maxSpend) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-chrome/10 border border-chrome/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                Spent: ${minSpend || "0"}-${maxSpend || "∞"}
                <button onClick={removeSpendFilter} className="hover:text-red-400 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {dateFilter !== "All Time" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-chrome/10 border border-chrome/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                Joined: {dateFilter}
                <button onClick={removeDateFilter} className="hover:text-red-400 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
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
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Name</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Orders</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Total Spent</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Joined</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Status</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((c) => (
                  <TableRow key={c._id} className="border-chrome/10 hover:bg-chrome/5">
                    <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.email}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{c.totalOrders}</TableCell>
                    <TableCell className="text-right text-foreground">PKR {c.totalSpent.toFixed(2)}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${
                          c.status === "Active"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {c.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        to="/customer/$id"
                        params={{ id: c._id }}
                        className="btn-chrome btn-chrome-inner p-2 rounded-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="md:hidden space-y-3">
          {paged.map((c) => (
            <div key={c._id} className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{c.name}</span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${
                    c.status === "Active"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  }`}
                >
                  <span className="h-1 w-1 rounded-full bg-current" />
                  {c.status}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">{c.email}</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{c.totalOrders} orders</span>
                <span className="text-foreground font-semibold">PKR {c.totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Joined {new Date(c.createdAt).toLocaleDateString()}</span>
                <Link
                  to="/customer/$id"
                  params={{ id: c._id }}
                  className="btn-chrome btn-chrome-inner p-2 rounded-lg"
                >
                  <Eye className="h-3.5 w-3.5 mr-1 inline" /> View
                </Link>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
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
