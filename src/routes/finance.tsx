import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  PiggyBank,
  TrendingUp,
  TrendingDown,
  Wallet,
  Landmark,
  Receipt,
  Boxes,
  Trash2,
  Plus,
  Pencil,
  Check,
  X,
  IndianRupee,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
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
import { useQuery, useMutation } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { getSessionToken } from "@/lib/admin";
import { formatPrice } from "@/lib/currency";
import { EXPENSE_CATEGORIES, ASSET_CATEGORIES, CAPITAL_METHODS } from "../../convex/models";

export const Route = createFileRoute("/finance")({
  beforeLoad: () => import("@/lib/auth-guard").then((m) => m.requireAdmin()),
  component: Finance,
  head: () => ({
    meta: [{ title: "Finance — VintageCvunt Admin" }],
  }),
});

type Tab = "summary" | "expenses" | "assets" | "capital";

const TABS: { id: Tab; label: string; icon: typeof Wallet }[] = [
  { id: "summary", label: "Summary", icon: Landmark },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "assets", label: "Assets", icon: Boxes },
  { id: "capital", label: "Capital In", icon: IndianRupee },
];

const inputCls =
  "w-full rounded-xl border border-chrome/20 bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors";

const CATEGORY_COLORS: Record<string, string> = {
  COGS: "bg-cyan-500/20 text-cyan-400",
  Fabric: "bg-indigo-500/20 text-indigo-400",
  Production: "bg-violet-500/20 text-violet-400",
  Marketing: "bg-pink-500/20 text-pink-400",
  Operations: "bg-amber-500/20 text-amber-400",
  Shipping: "bg-blue-500/20 text-blue-400",
  Packaging: "bg-teal-500/20 text-teal-400",
  Other: "bg-gray-500/20 text-gray-400",
};

function Finance() {
  const sessionToken = getSessionToken() ?? "";
  const [tab, setTab] = useState<Tab>("summary");

  const summary = useQuery(api.finance.summary, { sessionToken });
  const expenses = useQuery(api.expenses.list, { sessionToken }) ?? [];
  const assets = useQuery(api.assets.list, { sessionToken }) ?? [];
  const capital = useQuery(api.capital.list, { sessionToken }) ?? [];
  const investors = useQuery(api.investors.list, { sessionToken }) ?? [];

  const createExpense = useMutation(api.expenses.create);
  const removeExpense = useMutation(api.expenses.remove);
  const createAsset = useMutation(api.assets.create);
  const updateAsset = useMutation(api.assets.update);
  const removeAsset = useMutation(api.assets.remove);
  const createCapital = useMutation(api.capital.create);
  const removeCapital = useMutation(api.capital.remove);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [expForm, setExpForm] = useState({
    title: "",
    category: "COGS",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });
  const [assetForm, setAssetForm] = useState({
    name: "",
    category: "Equipment",
    purchaseDate: new Date().toISOString().split("T")[0],
    purchaseValue: "",
    currentValue: "",
    note: "",
  });
  const [capForm, setCapForm] = useState({
    investorId: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    method: "Bank Transfer",
    note: "",
  });
  const [editingAssetId, setEditingAssetId] = useState<Id<"assets"> | null>(null);
  const [editValue, setEditValue] = useState("");

  const monthlyExpenseTotal = useMemo(() => {
    const now = new Date();
    const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    return expenses
      .filter((e) => {
        const d = new Date(e.expenseDate);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` === key;
      })
      .reduce((s, e) => s + e.amount, 0);
  }, [expenses]);

  const totalPaidCapital = useMemo(
    () => capital.reduce((s, c) => s + c.amountReceived, 0),
    [capital],
  );

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await fn();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handleAddExpense() {
    await run(async () => {
      await createExpense({
        sessionToken,
        title: expForm.title,
        category: expForm.category,
        amount: parseFloat(expForm.amount) || 0,
        expenseDate: new Date(expForm.date).getTime(),
        note: expForm.note.trim() || undefined,
      });
      setExpForm({ ...expForm, title: "", amount: "", note: "" });
    });
  }

  async function handleAddAsset() {
    await run(async () => {
      const value = parseFloat(assetForm.currentValue) || 0;
      await createAsset({
        sessionToken,
        name: assetForm.name,
        category: assetForm.category,
        purchaseDate: new Date(assetForm.purchaseDate).getTime(),
        purchaseValue: parseFloat(assetForm.purchaseValue) || 0,
        currentValue: value,
        note: assetForm.note.trim() || undefined,
      });
      setAssetForm({ ...assetForm, name: "", purchaseValue: "", currentValue: "", note: "" });
    });
  }

  async function handleAddCapital() {
    await run(async () => {
      if (!capForm.investorId) throw new Error("Select an investor.");
      await createCapital({
        sessionToken,
        investorId: capForm.investorId as Id<"investors">,
        amountReceived: parseFloat(capForm.amount) || 0,
        receivedDate: new Date(capForm.date).getTime(),
        method: capForm.method,
        note: capForm.note.trim() || undefined,
      });
      setCapForm({ ...capForm, investorId: "", amount: "", note: "" });
    });
  }

  const statCards = summary
    ? [
        {
          label: "Total Revenue",
          value: formatPrice(summary.totalRevenue, "PKR"),
          icon: TrendingUp,
          tone: "text-green-400",
        },
        {
          label: "Total Expenses",
          value: formatPrice(summary.totalExpenses, "PKR"),
          icon: TrendingDown,
          tone: "text-red-400",
        },
        {
          label: "Net Profit",
          value: formatPrice(summary.totalNetProfit, "PKR"),
          icon: Wallet,
          tone: summary.totalNetProfit >= 0 ? "text-green-400" : "text-red-400",
        },
        {
          label: "This Month Expenses",
          value: formatPrice(monthlyExpenseTotal, "PKR"),
          icon: Receipt,
          tone: "text-amber-400",
        },
        {
          label: "Capital Received",
          value: formatPrice(summary.totalCapitalReceived, "PKR"),
          icon: IndianRupee,
          tone: "text-blue-400",
        },
        {
          label: "Paid To Investors",
          value: formatPrice(summary.totalPaidToInvestors, "PKR"),
          icon: PiggyBank,
          tone: "text-purple-400",
        },
        {
          label: "Assets Value",
          value: formatPrice(summary.totalAssets, "PKR"),
          icon: Boxes,
          tone: "text-cyan-400",
        },
        {
          label: "Investor Liability",
          value: formatPrice(summary.totalOutstanding, "PKR"),
          icon: Wallet,
          tone: "text-yellow-400",
        },
      ]
    : [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-foreground">Finance</h1>
          {summary && (
            <span className="rounded-full bg-graphite border border-chrome/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Net Worth {formatPrice(summary.netWorth, "PKR")}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-graphite border border-chrome/20 p-1 w-fit overflow-x-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${
                  tab === t.id
                    ? "bg-foreground text-background"
                    : "text-chrome-dim hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" /> {t.label}
              </button>
            );
          })}
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <X className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {tab === "summary" && summary && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((s) => (
                <div
                  key={s.label}
                  className="bg-graphite border border-chrome/20 rounded-2xl p-4 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                  <p className={`text-lg font-semibold truncate ${s.tone}`}>{s.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Revenue vs Expenses (by month)
                </p>
                {summary.timeline.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-12 text-center">
                    No data yet — log expenses or wait for orders.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={summary.timeline} barGap={2}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "#8a8a8a", fontSize: 10 }}
                        tickLine={false}
                        axisLine={{ stroke: "#ffffff20" }}
                      />
                      <YAxis
                        tick={{ fill: "#8a8a8a", fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        width={55}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#151515",
                          border: "1px solid #333",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                        formatter={(v) => formatPrice(Number(v) || 0, "PKR")}
                      />
                      <Bar dataKey="revenue" name="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      <Bar
                        dataKey="expenses"
                        name="Expenses"
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Expenses By Category
                </p>
                {Object.entries(summary.expenseByCategory).length === 0 ? (
                  <p className="text-sm text-muted-foreground py-12 text-center">
                    No expenses logged.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {Object.entries(summary.expenseByCategory)
                      .sort(([, a], [, b]) => b - a)
                      .map(([cat, amt]) => (
                        <div key={cat} className="flex items-center justify-between gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${CATEGORY_COLORS[cat] || "bg-gray-500/20 text-gray-400"}`}
                          >
                            {cat}
                          </span>
                          <span className="text-sm text-foreground font-medium">
                            {formatPrice(amt, "PKR")}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "expenses" && (
          <div className="space-y-6">
            <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                Add Expense
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <input
                  type="text"
                  placeholder="Title *"
                  value={expForm.title}
                  onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                  className={inputCls}
                />
                <select
                  value={expForm.category}
                  onChange={(e) => setExpForm({ ...expForm, category: e.target.value })}
                  className={inputCls}
                >
                  {EXPENSE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="0"
                  placeholder="Amount (PKR)"
                  value={expForm.amount}
                  onChange={(e) => setExpForm({ ...expForm, amount: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="date"
                  value={expForm.date}
                  onChange={(e) => setExpForm({ ...expForm, date: e.target.value })}
                  className={inputCls}
                />
                <button
                  onClick={handleAddExpense}
                  disabled={busy || !expForm.title.trim() || !parseFloat(expForm.amount)}
                  className="btn-chrome btn-chrome-inner inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
              <input
                type="text"
                placeholder="Note (optional)"
                value={expForm.note}
                onChange={(e) => setExpForm({ ...expForm, note: e.target.value })}
                className={inputCls}
              />
            </div>

            <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-chrome/20 hover:bg-transparent">
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Title
                      </TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Category
                      </TableHead>
                      <TableHead className="hidden md:table-cell font-mono text-[10px] uppercase tracking-[0.2em]">
                        Date
                      </TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Amount
                      </TableHead>
                      <TableHead className="text-right font-mono text-[10px] uppercase tracking-[0.2em]">
                        Delete
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.length === 0 ? (
                      <TableRow className="border-chrome/20">
                        <TableCell
                          colSpan={5}
                          className="text-center text-muted-foreground text-sm py-10"
                        >
                          No expenses yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      expenses.map((e) => (
                        <TableRow key={e._id} className="border-chrome/20">
                          <TableCell className="text-sm text-foreground">
                            {e.title}
                            {e.note && (
                              <span className="block text-xs text-muted-foreground">{e.note}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${CATEGORY_COLORS[e.category] || ""}`}
                            >
                              {e.category}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground whitespace-nowrap">
                            {new Date(e.expenseDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-sm text-red-400 font-medium whitespace-nowrap">
                            {formatPrice(e.amount, "PKR")}
                          </TableCell>
                          <TableCell className="text-right">
                            <button
                              onClick={() =>
                                run(() =>
                                  removeExpense({ sessionToken, id: e._id as Id<"expenses"> }),
                                )
                              }
                              className="inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors"
                              aria-label="Delete expense"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {tab === "assets" && (
          <div className="space-y-6">
            <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                Add Asset
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Asset name *"
                  value={assetForm.name}
                  onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })}
                  className={inputCls}
                />
                <select
                  value={assetForm.category}
                  onChange={(e) => setAssetForm({ ...assetForm, category: e.target.value })}
                  className={inputCls}
                >
                  {ASSET_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={assetForm.purchaseDate}
                  onChange={(e) => setAssetForm({ ...assetForm, purchaseDate: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Purchase value (PKR)"
                  value={assetForm.purchaseValue}
                  onChange={(e) => setAssetForm({ ...assetForm, purchaseValue: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Current value (PKR)"
                  value={assetForm.currentValue}
                  onChange={(e) => setAssetForm({ ...assetForm, currentValue: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Note (optional)"
                  value={assetForm.note}
                  onChange={(e) => setAssetForm({ ...assetForm, note: e.target.value })}
                  className={inputCls}
                />
                <button
                  onClick={handleAddAsset}
                  disabled={busy || !assetForm.name.trim() || !parseFloat(assetForm.currentValue)}
                  className="btn-chrome btn-chrome-inner inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
            </div>

            <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-chrome/20 hover:bg-transparent">
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Name
                      </TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Category
                      </TableHead>
                      <TableHead className="hidden md:table-cell font-mono text-[10px] uppercase tracking-[0.2em]">
                        Purchased
                      </TableHead>
                      <TableHead className="hidden lg:table-cell font-mono text-[10px] uppercase tracking-[0.2em]">
                        Purchase Value
                      </TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Current Value
                      </TableHead>
                      <TableHead className="text-right font-mono text-[10px] uppercase tracking-[0.2em]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.length === 0 ? (
                      <TableRow className="border-chrome/20">
                        <TableCell
                          colSpan={6}
                          className="text-center text-muted-foreground text-sm py-10"
                        >
                          No assets yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      assets.map((a) => (
                        <TableRow key={a._id} className="border-chrome/20">
                          <TableCell className="text-sm text-foreground">
                            {a.name}
                            {a.note && (
                              <span className="block text-xs text-muted-foreground">{a.note}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="rounded-full bg-chrome/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim">
                              {a.category}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground whitespace-nowrap">
                            {new Date(a.purchaseDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm text-muted-foreground whitespace-nowrap">
                            {formatPrice(a.purchaseValue, "PKR")}
                          </TableCell>
                          <TableCell className="text-sm text-cyan-400 font-medium whitespace-nowrap">
                            {editingAssetId === a._id ? (
                              <span className="inline-flex items-center gap-1.5">
                                <input
                                  type="number"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-28 rounded-lg border border-chrome/30 bg-background px-2 py-1 font-mono text-xs"
                                  autoFocus
                                />
                                <button
                                  onClick={() =>
                                    run(async () => {
                                      await updateAsset({
                                        sessionToken,
                                        id: a._id as Id<"assets">,
                                        currentValue: parseFloat(editValue) || 0,
                                      });
                                      setEditingAssetId(null);
                                    })
                                  }
                                  className="text-green-400 hover:text-green-300"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setEditingAssetId(null)}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </span>
                            ) : (
                              formatPrice(a.currentValue, "PKR")
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <button
                              onClick={() => {
                                setEditingAssetId(a._id as Id<"assets">);
                                setEditValue(String(a.currentValue));
                              }}
                              className="inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/10 transition-colors"
                              aria-label="Edit value"
                            >
                              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                            <button
                              onClick={() =>
                                run(() => removeAsset({ sessionToken, id: a._id as Id<"assets"> }))
                              }
                              className="inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors"
                              aria-label="Delete asset"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {tab === "capital" && (
          <div className="space-y-6">
            <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                Log Capital Received From Investor
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <select
                  value={capForm.investorId}
                  onChange={(e) => setCapForm({ ...capForm, investorId: e.target.value })}
                  className={inputCls + " md:col-span-2"}
                >
                  <option value="">Select investor *</option>
                  {investors.map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.fullName} — {i.cnicMasked}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="0"
                  placeholder="Amount (PKR) *"
                  value={capForm.amount}
                  onChange={(e) => setCapForm({ ...capForm, amount: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="date"
                  value={capForm.date}
                  onChange={(e) => setCapForm({ ...capForm, date: e.target.value })}
                  className={inputCls}
                />
                <select
                  value={capForm.method}
                  onChange={(e) => setCapForm({ ...capForm, method: e.target.value })}
                  className={inputCls}
                >
                  {CAPITAL_METHODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Note (optional)"
                  value={capForm.note}
                  onChange={(e) => setCapForm({ ...capForm, note: e.target.value })}
                  className={inputCls + " md:col-span-4"}
                />
                <button
                  onClick={handleAddCapital}
                  disabled={busy || !capForm.investorId || !parseFloat(capForm.amount)}
                  className="btn-chrome btn-chrome-inner inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" /> Log Capital
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Total received:{" "}
                <span className="text-foreground font-medium">
                  {formatPrice(totalPaidCapital, "PKR")}
                </span>{" "}
                — this tracks the money actually received into the business, separate from each
                investor's agreed commitment.
              </p>
            </div>

            <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-chrome/20 hover:bg-transparent">
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Investor
                      </TableHead>
                      <TableHead className="hidden md:table-cell font-mono text-[10px] uppercase tracking-[0.2em]">
                        Date
                      </TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Method
                      </TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Amount
                      </TableHead>
                      <TableHead className="text-right font-mono text-[10px] uppercase tracking-[0.2em]">
                        Delete
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {capital.length === 0 ? (
                      <TableRow className="border-chrome/20">
                        <TableCell
                          colSpan={5}
                          className="text-center text-muted-foreground text-sm py-10"
                        >
                          No capital received logged yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      capital.map((c) => (
                        <TableRow key={c._id} className="border-chrome/20">
                          <TableCell className="text-sm text-foreground">
                            {c.investorName}
                            {c.note && (
                              <span className="block text-xs text-muted-foreground">{c.note}</span>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground whitespace-nowrap">
                            {new Date(c.receivedDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {c.method}
                          </TableCell>
                          <TableCell className="text-sm text-blue-400 font-medium whitespace-nowrap">
                            {formatPrice(c.amountReceived, "PKR")}
                          </TableCell>
                          <TableCell className="text-right">
                            <button
                              onClick={() =>
                                run(() =>
                                  removeCapital({
                                    sessionToken,
                                    id: c._id as Id<"capitalContributions">,
                                  }),
                                )
                              }
                              className="inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-red-500/10 transition-colors"
                              aria-label="Delete capital entry"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Finance;
