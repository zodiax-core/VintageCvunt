import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
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
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
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

const chartLabels: Record<Range, string> = {
  today: "Revenue (Today — Hourly)",
  week: "Revenue (This Week — Daily)",
  month: "Revenue (This Month — Weekly)",
  quarter: "Revenue (This Quarter — Monthly)",
};

const formatDate = (ts: number) => new Date(ts).toLocaleDateString("en-PK", { year: "numeric", month: "2-digit", day: "2-digit" });

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

function getPeriods(range: Range) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  switch (range) {
    case "today": {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return { current: { start: today, end: now }, previous: { start: yesterday, end: today } };
    }
    case "week": {
      const dow = today.getDay();
      const monOff = dow === 0 ? -6 : 1 - dow;
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() + monOff);
      const prevWeekStart = new Date(weekStart);
      prevWeekStart.setDate(prevWeekStart.getDate() - 7);
      return { current: { start: weekStart, end: now }, previous: { start: prevWeekStart, end: weekStart } };
    }
    case "month": {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return { current: { start: monthStart, end: now }, previous: { start: prevMonthStart, end: monthStart } };
    }
    case "quarter": {
      const q = Math.floor(now.getMonth() / 3);
      const qStart = new Date(now.getFullYear(), q * 3, 1);
      const prevQStart = new Date(now.getFullYear(), (q - 1) * 3, 1);
      return { current: { start: qStart, end: now }, previous: { start: prevQStart, end: qStart } };
    }
  }
}

function calcTrend(current: number, previous: number): { pct: string; up: boolean } {
  if (previous === 0) {
    if (current === 0) return { pct: "0%", up: true };
    return { pct: "+100%", up: true };
  }
  const change = ((current - previous) / previous) * 100;
  return { pct: `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`, up: change >= 0 };
}

function AdminDashboard() {
  const [range, setRange] = useState<Range>("week");
  const allOrders = useQuery(api.orders.list) ?? [];
  const allProducts = useQuery(api.products.list) ?? [];

  const periods = getPeriods(range);

  const stats = useMemo(() => {
    function compute(orders: typeof allOrders) {
      const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
      const totalOrders = orders.length;
      const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
      const completedOrders = orders.filter((o) => o.status === "delivered" || o.status === "shipped").length;
      const avgValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const convRate = allOrders.length > 0 ? (completedOrders / allOrders.length) * 100 : 0;
      return { totalRevenue, totalOrders, pendingOrders, avgValue, convRate, completedOrders };
    }

    const cur = allOrders.filter((o) => {
      const t = o.createdAt;
      return t >= periods.current.start.getTime() && t <= periods.current.end.getTime();
    });
    const prev = allOrders.filter((o) => {
      const t = o.createdAt;
      return t >= periods.previous.start.getTime() && t <= periods.previous.end.getTime();
    });

    const c = compute(cur);
    const p = compute(prev);
    const all = compute(allOrders);

    return {
      current: c,
      previous: p,
      all,
      revenueTrend: calcTrend(c.totalRevenue, p.totalRevenue),
      ordersTrend: calcTrend(c.totalOrders, p.totalOrders),
      pendingTrend: calcTrend(c.pendingOrders, p.pendingOrders),
      avgTrend: calcTrend(c.avgValue, p.avgValue),
      convTrend: calcTrend(c.convRate, p.convRate),
    };
  }, [allOrders, periods]);

  const monthlyRevenue = useMemo(() => {
    const byMonth: Record<string, number> = {};
    for (const order of allOrders) {
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      byMonth[key] = (byMonth[key] || 0) + order.total;
    }
    return Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, revenue]) => ({ month, revenue }));
  }, [allOrders]);

  const recentOrders = allOrders.slice(0, 5).map((o) => ({
    id: o.orderNumber,
    customer: o.customerName,
    date: formatDate(o.createdAt),
    status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
    total: "PKR " + o.total.toLocaleString("en-PK"),
  }));

  const productSales: Record<string, number> = {};
  for (const o of allOrders) {
    for (const item of o.items) {
      productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
    }
  }
  const topProducts = Object.entries(productSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, sales], i) => ({ rank: i + 1, name, sales }));

  const chartData = monthlyRevenue.map((m) => ({ label: m.month, revenue: m.revenue }));
  const chartLabel = chartLabels[range];

  const statCards = [
    { label: "Total Revenue", value: stats ? `PKR ${stats.all.totalRevenue.toLocaleString("en-PK")}` : "PKR 0", trend: stats?.revenueTrend.pct ?? "0%", up: stats?.revenueTrend.up ?? true, icon: DollarSign },
    { label: "Orders", value: stats ? stats.all.totalOrders.toLocaleString() : "0", trend: stats?.ordersTrend.pct ?? "0%", up: stats?.ordersTrend.up ?? true, icon: ShoppingBag },
    { label: "Pending Orders", value: stats ? stats.all.pendingOrders.toLocaleString() : "0", trend: stats?.pendingTrend.pct ?? "0%", up: stats?.pendingTrend.up ?? true, icon: Package },
    { label: "Avg Order Value", value: stats ? `PKR ${Math.round(stats.all.avgValue).toLocaleString("en-PK")}` : "PKR 0", trend: stats?.avgTrend.pct ?? "0%", up: stats?.avgTrend.up ?? false, icon: TrendingUp },
    { label: "Products", value: allProducts.length.toLocaleString(), trend: "+0%", up: true, icon: Users },
    { label: "Conversion Rate", value: stats ? `${stats.all.convRate.toFixed(2)}%` : "0%", trend: stats?.convTrend.pct ?? "0%", up: stats?.convTrend.up ?? true, icon: Percent },
  ];

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
