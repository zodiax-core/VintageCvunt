import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import {
  DollarSign, ShoppingBag, Users, Package, TrendingUp, Percent,
  Plus, BarChart3, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip as RechartsTooltip,
} from "recharts";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
  head: () => ({
    meta: [{ title: "Dashboard — VintageCvunt Admin" }],
  }),
});

type Range = "today" | "week" | "month" | "quarter";

const ranges: { key: Range; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "quarter", label: "This Quarter" },
];

const todayData = [
  { label: "9AM", revenue: 3200 }, { label: "10AM", revenue: 4800 },
  { label: "11AM", revenue: 6100 }, { label: "12PM", revenue: 7400 },
  { label: "1PM", revenue: 8200 }, { label: "2PM", revenue: 10300 },
  { label: "3PM", revenue: 12100 }, { label: "4PM", revenue: 11400 },
  { label: "5PM", revenue: 13800 }, { label: "6PM", revenue: 9600 },
  { label: "7PM", revenue: 7800 }, { label: "8PM", revenue: 5200 },
];

const weekData = [
  { label: "Mon", revenue: 12400 },
  { label: "Tue", revenue: 18900 },
  { label: "Wed", revenue: 15200 },
  { label: "Thu", revenue: 22100 },
  { label: "Fri", revenue: 18300 },
  { label: "Sat", revenue: 25900 },
  { label: "Sun", revenue: 11760 },
];

const monthData = [
  { label: "Week 1", revenue: 84500 },
  { label: "Week 2", revenue: 92300 },
  { label: "Week 3", revenue: 101200 },
  { label: "Week 4", revenue: 88700 },
];

const quarterData = [
  { label: "Jan", revenue: 245000 },
  { label: "Feb", revenue: 278000 },
  { label: "Mar", revenue: 312000 },
];

const chartDataMap: Record<Range, { label: string; revenue: number }[]> = {
  today: todayData,
  week: weekData,
  month: monthData,
  quarter: quarterData,
};

const chartLabels: Record<Range, string> = {
  today: "Revenue (Today — Hourly)",
  week: "Revenue (This Week — Daily)",
  month: "Revenue (This Month — Weekly)",
  quarter: "Revenue (This Quarter — Monthly)",
};

const statCards = [
  { label: "Total Revenue", value: "$124,560", trend: "+12.3%", up: true, icon: DollarSign },
  { label: "Orders", value: "1,284", trend: "+8.1%", up: true, icon: ShoppingBag },
  { label: "Customers", value: "892", trend: "+5.7%", up: true, icon: Users },
  { label: "Products", value: "156", trend: "+3.2%", up: true, icon: Package },
  { label: "Avg Order Value", value: "$97.20", trend: "-2.1%", up: false, icon: TrendingUp },
  { label: "Conversion Rate", value: "3.24%", trend: "+0.8%", up: true, icon: Percent },
];

const recentOrders = [
  { id: "#ORD-1001", customer: "Isabella Thorn", date: "2026-07-20", status: "Delivered", total: "$324.00" },
  { id: "#ORD-1002", customer: "Marcus Blackwood", date: "2026-07-20", status: "Processing", total: "$567.50" },
  { id: "#ORD-1003", customer: "Veronica Ashford", date: "2026-07-19", status: "Shipped", total: "$189.00" },
  { id: "#ORD-1004", customer: "Sebastian Crowe", date: "2026-07-19", status: "Pending", total: "$432.80" },
  { id: "#ORD-1005", customer: "Lilith Graves", date: "2026-07-18", status: "Cancelled", total: "$78.00" },
];

const topProducts = [
  { rank: 1, name: "Obsidian Tailcoat", sales: 342 },
  { rank: 2, name: "Argentine Cuff", sales: 289 },
  { rank: 3, name: "Noir Leather Boots", sales: 256 },
  { rank: 4, name: "Silver Mesh Veil", sales: 198 },
  { rank: 5, name: "Chrome Signet Ring", sales: 174 },
];

function statusBadge(status: string) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] border";
  const styles: Record<string, string> = {
    Delivered: "bg-green-500/10 text-green-400 border-green-500/20",
    Shipped: "bg-green-500/10 text-green-400 border-green-500/20",
    Processing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return <span className={`${base} ${styles[status] || styles.Pending}`}>{status}</span>;
}

function AdminDashboard() {
  const [range, setRange] = useState<Range>("week");

  const chartData = chartDataMap[range];
  const chartLabel = chartLabels[range];

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-display">Dashboard</h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Welcome back, Admin</p>
      </div>

      <div className="flex flex-wrap items-center gap-1 mb-6 p-1 bg-graphite border border-chrome/20 rounded-2xl w-fit">
        {ranges.map((r) => (
          <button
            key={r.key}
            onClick={() => setRange(r.key)}
            className={`px-4 py-2 rounded-xl font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              range === r.key
                ? "bg-chrome/20 text-foreground"
                : "text-chrome-dim hover:text-foreground"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-graphite border border-chrome/20 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon size={18} className="text-chrome-dim" />
                <div className="flex flex-col items-end">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] ${
                      card.up
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {card.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {card.trend}
                  </span>
                  <span className="font-mono text-[8px] text-chrome-dim/60 mt-0.5">vs previous period</span>
                </div>
              </div>
              <p className="font-display text-2xl mb-1">{card.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4">{chartLabel}</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 240 / 0.5)" />
                <XAxis dataKey="label" stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                <YAxis stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                <RechartsTooltip
                  contentStyle={{
                    background: "oklch(0.1 0.005 240)",
                    border: "1px solid oklch(0.72 0.008 240 / 0.35)",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontFamily: "JetBrains Mono",
                  }}
                  labelStyle={{ color: "oklch(0.86 0.008 240)" }}
                />
                <Line type="monotone" dataKey="revenue" stroke="oklch(0.86 0.008 240)" strokeWidth={2} dot={{ fill: "oklch(0.86 0.008 240)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4">Top Products</h2>
          <div className="space-y-3">
            {topProducts.map((product) => (
              <div key={product.rank} className="flex items-center gap-3">
                <span className="font-mono text-[9px] text-chrome-dim w-4">{product.rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[11px] truncate">{product.name}</p>
                </div>
                <span className="font-mono text-[10px] text-chrome-dim">{product.sales}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6 mb-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4">Recent Orders</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Order ID</span></TableHead>
              <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Customer</span></TableHead>
              <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Date</span></TableHead>
              <TableHead><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Status</span></TableHead>
              <TableHead className="text-right"><span className="font-mono text-[10px] uppercase tracking-[0.2em]">Total</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell><span className="font-mono text-[11px]">{order.id}</span></TableCell>
                <TableCell><span className="font-mono text-[11px]">{order.customer}</span></TableCell>
                <TableCell><span className="font-mono text-[11px] text-chrome-dim">{order.date}</span></TableCell>
                <TableCell>{statusBadge(order.status)}</TableCell>
                <TableCell className="text-right"><span className="font-mono text-[11px]">{order.total}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/product/new" className="btn-chrome btn-chrome-inner">
          <Plus size={14} />
          <span className="btn-label">Add Product</span>
        </Link>
        <Link to="/order" className="btn-chrome btn-chrome-inner">
          <ShoppingBag size={14} />
          <span className="btn-label">View Orders</span>
        </Link>
        <Link to="/analytics" className="btn-chrome btn-chrome-inner">
          <BarChart3 size={14} />
          <span className="btn-label">View Analytics</span>
        </Link>
      </div>
    </AdminLayout>
  );
}
