import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, AreaChart, Area,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
  head: () => ({
    meta: [{ title: "Analytics — VintageCvunt Admin" }],
  }),
});

type Range = "7D" | "30D" | "12M";
const ranges: Range[] = ["7D", "30D", "12M"];

const dailyRevenue = [
  { day: "Mon", revenue: 3200, orders: 24, customers: 18 },
  { day: "Tue", revenue: 2800, orders: 21, customers: 15 },
  { day: "Wed", revenue: 4100, orders: 31, customers: 23 },
  { day: "Thu", revenue: 3600, orders: 27, customers: 20 },
  { day: "Fri", revenue: 5200, orders: 39, customers: 29 },
  { day: "Sat", revenue: 4800, orders: 36, customers: 26 },
  { day: "Sun", revenue: 3900, orders: 29, customers: 22 },
];

const weeklyRevenue = [
  { week: "Week 1", revenue: 22300, orders: 172, customers: 124 },
  { week: "Week 2", revenue: 24800, orders: 191, customers: 138 },
  { week: "Week 3", revenue: 23500, orders: 180, customers: 131 },
  { week: "Week 4", revenue: 26700, orders: 205, customers: 147 },
];

const monthlyRevenue = [
  { month: "Aug", revenue: 18200, orders: 142, customers: 98 },
  { month: "Sep", revenue: 21400, orders: 168, customers: 115 },
  { month: "Oct", revenue: 19800, orders: 155, customers: 107 },
  { month: "Nov", revenue: 25600, orders: 201, customers: 142 },
  { month: "Dec", revenue: 31200, orders: 245, customers: 176 },
  { month: "Jan", revenue: 22800, orders: 178, customers: 124 },
  { month: "Feb", revenue: 19500, orders: 152, customers: 108 },
  { month: "Mar", revenue: 24100, orders: 189, customers: 133 },
  { month: "Apr", revenue: 26300, orders: 207, customers: 148 },
  { month: "May", revenue: 28900, orders: 228, customers: 162 },
  { month: "Jun", revenue: 27400, orders: 215, customers: 154 },
  { month: "Jul", revenue: 30100, orders: 238, customers: 170 },
];

const products7D = [
  { name: "Obsidian Tailcoat", sales: 48 },
  { name: "Argentine Cuff", sales: 41 },
  { name: "Noir Leather Boots", sales: 35 },
  { name: "Silver Mesh Veil", sales: 27 },
  { name: "Chrome Signet Ring", sales: 22 },
];

const products30D = [
  { name: "Obsidian Tailcoat", sales: 186 },
  { name: "Argentine Cuff", sales: 152 },
  { name: "Noir Leather Boots", sales: 138 },
  { name: "Silver Mesh Veil", sales: 104 },
  { name: "Chrome Signet Ring", sales: 91 },
];

const products12M = [
  { name: "Obsidian Tailcoat", sales: 2140 },
  { name: "Argentine Cuff", sales: 1820 },
  { name: "Noir Leather Boots", sales: 1650 },
  { name: "Silver Mesh Veil", sales: 1290 },
  { name: "Chrome Signet Ring", sales: 1140 },
];

const chartDataMap: Record<Range, { data: Record<string, unknown>[]; labelKey: string }> = {
  "7D": { data: dailyRevenue, labelKey: "day" },
  "30D": { data: weeklyRevenue, labelKey: "week" },
  "12M": { data: monthlyRevenue, labelKey: "month" },
};

const productsMap: Record<Range, { name: string; sales: number }[]> = {
  "7D": products7D,
  "30D": products30D,
  "12M": products12M,
};

function Analytics() {
  const [range, setRange] = useState<Range>("30D");

  const { data: chartData, labelKey } = chartDataMap[range];
  const products = productsMap[range];

  const kpis = [
    { label: "Revenue", value: "$124,560", icon: DollarSign },
    { label: "Orders", value: "1,284", icon: ShoppingBag },
    { label: "Customers", value: "892", icon: Users },
    { label: "Conversion", value: "3.24%", icon: TrendingUp },
  ];

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
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-graphite border border-chrome/20 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <Icon size={18} className="text-chrome-dim" />
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 text-green-400 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em]">
                    <ArrowUpRight size={10} /> +12.3%
                  </span>
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
                  <XAxis dataKey={labelKey} stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
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
                  <XAxis dataKey={labelKey} stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
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
                <BarChart data={products} layout="vertical">
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
                  <XAxis dataKey={labelKey} stroke="oklch(0.55 0.008 240)" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} />
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
