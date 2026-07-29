import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, AreaChart, Area,
} from "recharts";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";

export const Route = createFileRoute("/analytics")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: Analytics,
  head: () => ({
    meta: [{ title: "Analytics — VintageCvunt Admin" }],
  }),
});

type Range = "7D" | "30D" | "12M";
const ranges: Range[] = ["7D", "30D", "12M"];

function computePeriodOrders(orders: Doc<"orders">[], range: Range) {
  const now = Date.now();
  const msMap: Record<Range, number> = {
    "7D": 7 * 86400000,
    "30D": 30 * 86400000,
    "12M": 365 * 86400000,
  };
  const cutoff = now - msMap[range];
  return orders.filter((o) => o.createdAt >= cutoff);
}

function Analytics() {
  const [range, setRange] = useState<Range>("30D");
  const allOrders = useQuery(api.orders.list) ?? [];

  const periodOrders = useMemo(() => computePeriodOrders(allOrders, range), [allOrders, range]);

  const kpis = useMemo(() => {
    const totalRevenue = periodOrders.reduce((s, o) => s + o.total, 0);
    const totalOrders = periodOrders.length;
    const customerEmails = new Set(periodOrders.map((o) => o.customerEmail));
    const totalCustomers = customerEmails.size;
    const completed = periodOrders.filter((o) => o.status === "delivered" || o.status === "shipped").length;
    const convRate = totalOrders > 0 ? (completed / totalOrders) * 100 : 0;
    return { totalRevenue, totalOrders, totalCustomers, convRate };
  }, [periodOrders]);

  const chartData = useMemo(() => {
    if (range === "12M") {
      const byMonth: Record<string, { revenue: number; orders: number; customers: Set<string> }> = {};
      for (const order of periodOrders) {
        const d = new Date(order.createdAt);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        if (!byMonth[key]) byMonth[key] = { revenue: 0, orders: 0, customers: new Set() };
        byMonth[key].revenue += order.total;
        byMonth[key].orders++;
        byMonth[key].customers.add(order.customerEmail);
      }
      return Object.entries(byMonth)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, d]) => ({ label: month, revenue: d.revenue, orders: d.orders, customers: d.customers.size }));
    }
    const byDay: Record<string, { revenue: number; orders: number; customers: Set<string> }> = {};
    for (const order of periodOrders) {
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (!byDay[key]) byDay[key] = { revenue: 0, orders: 0, customers: new Set() };
      byDay[key].revenue += order.total;
      byDay[key].orders++;
      byDay[key].customers.add(order.customerEmail);
    }
    return Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([label, d]) => ({ label, revenue: d.revenue, orders: d.orders, customers: d.customers.size }));
  }, [periodOrders, range]);

  const topProducts = useMemo(() => {
    const sales: Record<string, number> = {};
    for (const order of periodOrders) {
      for (const item of order.items) {
        sales[item.name] = (sales[item.name] || 0) + item.quantity;
      }
    }
    return Object.entries(sales)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, sales]) => ({ name, sales }));
  }, [periodOrders]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl md:text-2xl font-display">Analytics</h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">Performance overview</p>
          </div>
          <div className="flex items-center gap-1 rounded-xl bg-graphite border border-chrome/20 p-1">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  range === r ? "bg-chrome/20 text-foreground" : "text-chrome-dim hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Revenue", value: `PKR ${kpis.totalRevenue.toLocaleString("en-PK")}`, icon: DollarSign },
            { label: "Orders", value: kpis.totalOrders.toLocaleString(), icon: ShoppingBag },
            { label: "Customers", value: kpis.totalCustomers.toLocaleString(), icon: Users },
            { label: "Conversion", value: `${kpis.convRate.toFixed(2)}%`, icon: TrendingUp },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-graphite border border-chrome/20 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <Icon size={18} className="text-chrome-dim" />
                </div>
                <p className="font-display text-2xl mb-1">{kpi.value}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">{kpi.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4">Revenue</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 240 / 0.5)" />
                  <XAxis dataKey="label" stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <YAxis stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <Tooltip
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
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4">Orders</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 240 / 0.5)" />
                  <XAxis dataKey="label" stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <YAxis stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.1 0.005 240)",
                      border: "1px solid oklch(0.72 0.008 240 / 0.35)",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontFamily: "JetBrains Mono",
                    }}
                    labelStyle={{ color: "oklch(0.86 0.008 240)" }}
                  />
                  <Bar dataKey="orders" fill="oklch(0.7 0.008 240)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4">Top Products</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts.length > 0 ? topProducts : [{ name: "No data", sales: 0 }]} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 240 / 0.5)" horizontal={false} />
                  <XAxis type="number" stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <YAxis dataKey="name" type="category" stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} width={140} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.1 0.005 240)",
                      border: "1px solid oklch(0.72 0.008 240 / 0.35)",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontFamily: "JetBrains Mono",
                    }}
                  />
                  <Bar dataKey="sales" fill="oklch(0.8 0.008 240)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-graphite border border-chrome/20 rounded-2xl p-4 md:p-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim mb-4">Customer Growth</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 240 / 0.5)" />
                  <XAxis dataKey="label" stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <YAxis stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.1 0.005 240)",
                      border: "1px solid oklch(0.72 0.008 240 / 0.35)",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontFamily: "JetBrains Mono",
                    }}
                    labelStyle={{ color: "oklch(0.86 0.008 240)" }}
                  />
                  <defs>
                    <linearGradient id="customerGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.7 0.008 240)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.7 0.008 240)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="customers" stroke="oklch(0.7 0.008 240)" fill="url(#customerGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
