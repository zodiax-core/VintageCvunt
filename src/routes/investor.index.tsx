import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Eye, Search, Download, UserPlus, HandCoins } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { getSessionToken } from "@/lib/admin";
import { formatPrice } from "@/lib/currency";
import { INVESTMENT_MODELS, INVESTOR_STATUSES } from "../../convex/models";

export const Route = createFileRoute("/investor/")({
  component: Investors,
  head: () => ({
    meta: [{ title: "Investors — VintageCvunt Admin" }],
  }),
});

const MODEL_COLORS: Record<string, string> = {
  Loan: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Pure Equity": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Profit Share": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "Batch Revenue Share": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Hybrid: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-green-500/20 text-green-400 border-green-500/30",
  Completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  Defaulted: "bg-red-500/20 text-red-400 border-red-500/30",
  Withdrawn: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

function Investors() {
  const sessionToken = getSessionToken() ?? "";
  const investors = useQuery(api.investors.list, { sessionToken }) ?? [];
  const [search, setSearch] = useState("");
  const [modelFilter, setModelFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return investors.filter((i) => {
      if (
        q &&
        !i.fullName.toLowerCase().includes(q) &&
        !i.phoneNumber.includes(q) &&
        !i.cnicMasked.toLowerCase().includes(q)
      )
        return false;
      if (modelFilter !== "All" && i.investmentModel !== modelFilter) return false;
      if (statusFilter !== "All" && i.status !== statusFilter) return false;
      return true;
    });
  }, [investors, search, modelFilter, statusFilter]);

  function exportCSV() {
    const headers = [
      "Name",
      "CNIC (masked)",
      "Model",
      "Investment (PKR)",
      "Status",
      "Date Added",
      "Paid To Date",
      "Balance Owed",
    ];
    const rows = filtered.map((i) => [
      i.fullName,
      i.cnicMasked,
      i.investmentModel,
      i.investmentAmount.toFixed(2),
      i.status,
      new Date(i.dateAdded).toISOString().split("T")[0],
      i.totalPaidToDate.toFixed(2),
      (i.summary?.remainingBalance ?? i.summary?.remainingPrincipal ?? 0).toFixed(2),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "investors.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalInvested = investors.reduce((s, i) => s + i.investmentAmount, 0);
  const totalPaid = investors.reduce((s, i) => s + i.totalPaidToDate, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">Investors</h1>
            <span className="rounded-full bg-graphite border border-chrome/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {investors.length}
            </span>
          </div>
          <Link
            to="/investor/new"
            className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
          >
            <UserPlus className="h-4 w-4" /> Add Investor
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Invested", value: formatPrice(totalInvested, "PKR") },
            { label: "Paid To Date", value: formatPrice(totalPaid, "PKR") },
            {
              label: "Active Investors",
              value: investors.filter((i) => i.status === "Active").length.toString(),
            },
            { label: "Capital Still Owed", value: formatPrice(totalInvested - totalPaid, "PKR") },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-2"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
              <p className="text-lg font-semibold text-foreground truncate">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, phone, CNIC..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-graphite border border-chrome/20 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-chrome/40"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
              className="rounded-xl bg-graphite border border-chrome/20 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-chrome/40"
            >
              <option value="All">All Models</option>
              {INVESTMENT_MODELS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl bg-graphite border border-chrome/20 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-chrome/40"
            >
              <option value="All">All Statuses</option>
              {INVESTOR_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={exportCSV}
              className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <HandCoins className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No investors found</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Add your first investor to start tracking shares and returns.
            </p>
            <Link
              to="/investor/new"
              className="btn-chrome btn-chrome-inner px-4 py-2 rounded-xl text-sm"
            >
              Add Investor
            </Link>
          </div>
        ) : (
          <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-chrome/20 hover:bg-transparent">
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      Name
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      Model
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      Investment
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell font-mono text-[10px] uppercase tracking-[0.2em]">
                      Date Added
                    </TableHead>
                    <TableHead className="hidden lg:table-cell font-mono text-[10px] uppercase tracking-[0.2em]">
                      Paid To Date
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                      Balance
                    </TableHead>
                    <TableHead className="text-right font-mono text-[10px] uppercase tracking-[0.2em]">
                      View
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((i) => {
                    const balance =
                      i.summary?.remainingBalance ?? i.summary?.remainingPrincipal ?? 0;
                    return (
                      <TableRow key={i._id} className="border-chrome/20">
                        <TableCell className="font-medium text-foreground">
                          <div className="flex flex-col">
                            <span className="text-sm">{i.fullName}</span>
                            <span className="font-mono text-[10px] text-chrome-dim">
                              {i.cnicMasked}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${MODEL_COLORS[i.investmentModel] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}
                          >
                            {i.investmentModel}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-foreground whitespace-nowrap">
                          {formatPrice(i.investmentAmount, "PKR")}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${STATUS_COLORS[i.status] || ""}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {i.status}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground whitespace-nowrap">
                          {new Date(i.dateAdded).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-foreground whitespace-nowrap">
                          {formatPrice(i.totalPaidToDate, "PKR")}
                        </TableCell>
                        <TableCell
                          className={`text-sm whitespace-nowrap ${balance > 0 ? "text-yellow-400" : "text-muted-foreground"}`}
                        >
                          {formatPrice(balance, "PKR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            to="/investor/$id"
                            params={{ id: i._id }}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/10 transition-colors"
                            aria-label="View investor"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Investors;
