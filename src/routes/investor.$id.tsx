import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  ArrowLeft,
  HandCoins,
  DollarSign,
  Wallet,
  Percent,
  Receipt,
  PackageCheck,
  ShieldAlert,
  History,
  Banknote,
} from "lucide-react";
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
import { profitShareModel, hybridModel, loanModel, PAYOUT_KINDS } from "../../convex/models";
import type { RepaymentFrequency } from "../../convex/models";

export const Route = createFileRoute("/investor/$id")({
  component: InvestorDetail,
  head: () => ({
    meta: [{ title: "Investor Detail — VintageCvunt Admin" }],
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

const KIND_LABELS: Record<string, string> = {
  "profit-cycle": "Profit Cycle",
  "loan-repayment": "Loan Repayment",
  distribution: "Distribution",
  "withdrawal-payout": "Withdrawal Settlement",
  "manual-adjustment": "Manual Adjustment",
};

const inputCls =
  "w-full rounded-xl border border-chrome/20 bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors";

function InvestorDetail() {
  const { id } = Route.useParams();
  const sessionToken = getSessionToken() ?? "";
  const data = useQuery(api.investors.getById, { sessionToken, id: id as Id<"investors"> });
  const logPayout = useMutation(api.investors.logPayout);
  const withdraw = useMutation(api.investors.withdraw);
  const markSoldOut = useMutation(api.investors.markBatchSoldOut);
  const forceClose = useMutation(api.investors.forceClose);

  const [cycleDate, setCycleDate] = useState(new Date().toISOString().split("T")[0]);
  const [grossRevenue, setGrossRevenue] = useState("");
  const [costs, setCosts] = useState("");
  const [override, setOverride] = useState("");
  const [note, setNote] = useState("");
  const [kind, setKind] = useState<string>("profit-cycle");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [settlement, setSettlement] = useState("");
  const [closeOpen, setCloseOpen] = useState(false);
  const [closeReason, setCloseReason] = useState("");
  const [closeStatus, setCloseStatus] = useState("Defaulted");

  const gross = parseFloat(grossRevenue) || 0;
  const cost = parseFloat(costs) || 0;
  const netProfit = gross - cost;
  const overrideAmt = parseFloat(override) || 0;

  const computedPayout = useMemo(() => {
    if (!data) return 0;
    const inv = data.investor;
    if (kind === "loan-repayment" || kind === "distribution" || kind === "manual-adjustment")
      return overrideAmt;
    if (inv.investmentModel === "Profit Share")
      return profitShareModel(netProfit, inv.profitSharePercentage ?? 0).payout;
    if (inv.investmentModel === "Batch Revenue Share")
      return profitShareModel(netProfit, inv.batchProfitSharePercentage ?? 0).payout;
    if (inv.investmentModel === "Hybrid") {
      const remaining = Math.max(0, inv.investmentAmount - (inv.principalRecovered || 0));
      return hybridModel(netProfit, remaining, inv.profitSharePercentageAfterPrincipal ?? 0).payout;
    }
    if (inv.investmentModel === "Loan") {
      const loan = loanModel(
        inv.investmentAmount,
        inv.interestRate ?? 0,
        inv.repaymentPeriodMonths ?? 0,
        (inv.repaymentFrequency as RepaymentFrequency) ?? "Monthly",
        inv.investmentDate,
      );
      return overrideAmt || loan.perInstallment;
    }
    return overrideAmt;
  }, [data, kind, netProfit, overrideAmt]);

  if (data === undefined) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <HandCoins className="h-12 w-12 text-muted-foreground mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading investor...</h2>
          <p className="text-muted-foreground text-sm">Fetching details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (data === null) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <HandCoins className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Investor not found</h2>
          <p className="text-muted-foreground text-sm mb-6">No investor matches the ID "{id}".</p>
          <Link to="/investor" className="btn-chrome btn-chrome-inner px-4 py-2 rounded-xl text-sm">
            Back to Investors
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const inv = data.investor;
  const summary = inv.summary as {
    remainingBalance?: number;
    remainingPrincipal?: number;
  };
  const balance = summary?.remainingBalance ?? summary?.remainingPrincipal ?? 0;
  const isProfitModel =
    inv.investmentModel === "Profit Share" ||
    inv.investmentModel === "Batch Revenue Share" ||
    inv.investmentModel === "Hybrid";

  async function handleLogPayout() {
    setBusy(true);
    setError("");
    try {
      await logPayout({
        sessionToken,
        investorId: inv._id as Id<"investors">,
        cycleDate: new Date(cycleDate).getTime(),
        grossRevenue: gross,
        costs: cost,
        kind,
        payoutAmountOverride: ["loan-repayment", "distribution", "manual-adjustment"].includes(kind)
          ? overrideAmt
          : undefined,
        note: note.trim() || undefined,
      });
      setGrossRevenue("");
      setCosts("");
      setOverride("");
      setNote("");
    } catch (err) {
      setError(err?.message || "Failed to log payout.");
    } finally {
      setBusy(false);
    }
  }

  async function handleWithdraw() {
    setBusy(true);
    setError("");
    try {
      await withdraw({
        sessionToken,
        investorId: inv._id as Id<"investors">,
        settlementAmount: parseFloat(settlement) || 0,
        note: note.trim() || undefined,
      });
      setWithdrawOpen(false);
      setSettlement("");
      setNote("");
    } catch (err) {
      setError(err?.message || "Failed to withdraw investor.");
    } finally {
      setBusy(false);
    }
  }

  async function handleForceClose() {
    setBusy(true);
    setError("");
    try {
      await forceClose({
        sessionToken,
        investorId: inv._id as Id<"investors">,
        reason: closeReason,
        status: closeStatus,
      });
      setCloseOpen(false);
      setCloseReason("");
    } catch (err) {
      setError(err?.message || "Failed to close deal.");
    } finally {
      setBusy(false);
    }
  }

  async function handleMarkSoldOut() {
    setBusy(true);
    setError("");
    try {
      await markSoldOut({ sessionToken, investorId: inv._id as Id<"investors"> });
    } catch (err) {
      setError(err?.message || "Failed to mark batch sold out.");
    } finally {
      setBusy(false);
    }
  }

  const statCards = [
    { label: "Invested", value: formatPrice(inv.investmentAmount, "PKR"), icon: DollarSign },
    { label: "Paid To Date", value: formatPrice(inv.totalPaidToDate, "PKR"), icon: Banknote },
    {
      label:
        inv.investmentModel === "Loan"
          ? "Balance Owed"
          : inv.investmentModel === "Hybrid"
            ? "Principal Remaining"
            : "Balance",
      value: formatPrice(balance, "PKR"),
      icon: Wallet,
    },
    ...(summary?.equity
      ? [
          {
            label: "Ownership",
            value: summary.equity.ownershipPercentage.toFixed(2) + "%",
            icon: Percent,
          },
        ]
      : []),
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/investor"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Investors
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {inv.investmentModel === "Batch Revenue Share" &&
              !inv.batchSoldOutAt &&
              inv.status === "Active" && (
                <button
                  onClick={handleMarkSoldOut}
                  disabled={busy}
                  className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                >
                  <PackageCheck className="h-4 w-4" /> Mark Batch Sold Out
                </button>
              )}
            {inv.status === "Active" && !withdrawOpen && (
              <button
                onClick={() => setWithdrawOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-yellow-500/40 px-4 py-2 text-sm text-yellow-400 hover:bg-yellow-500/10 transition-colors"
              >
                Withdraw
              </button>
            )}
            {inv.status === "Active" && !closeOpen && (
              <button
                onClick={() => setCloseOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <ShieldAlert className="h-4 w-4" /> Force Close / Write-off
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <ShieldAlert className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-chrome/10 flex items-center justify-center">
                <span className="text-xl font-semibold text-foreground">
                  {inv.fullName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">{inv.fullName}</h2>
                <p className="text-sm text-muted-foreground font-mono">{inv.cnicMasked}</p>
                <p className="text-sm text-muted-foreground">{inv.phoneNumber}</p>
                {inv.email && (
                  <p className="text-sm text-muted-foreground break-all">{inv.email}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Added {new Date(inv.dateAdded).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${MODEL_COLORS[inv.investmentModel] || ""}`}
                >
                  {inv.investmentModel}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${STATUS_COLORS[inv.status] || ""}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {inv.status}
                </span>
              </div>
              <div className="text-left space-y-1.5 text-sm border-t border-chrome/20 pt-4">
                <p className="flex justify-between">
                  <span className="text-chrome-dim">Relationship</span>
                  <span className="text-foreground">{inv.relationshipToOwner}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-chrome-dim">Investment Date</span>
                  <span className="text-foreground">
                    {new Date(inv.investmentDate).toLocaleDateString()}
                  </span>
                </p>
                {inv.notes && (
                  <p className="text-muted-foreground text-xs border border-chrome/20 rounded-xl bg-background p-2 mt-2">
                    {inv.notes}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
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
                  <p className="text-lg font-semibold text-foreground truncate">{s.value}</p>
                </div>
              ))}
            </div>

            {inv.investmentModel === "Loan" && summary?.loan && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Loan Schedule
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    ["Interest Rate", (inv.interestRate ?? 0) + "%"],
                    ["Total Repayment", formatPrice(summary.loan.totalRepayment, "PKR")],
                    ["Per Installment", formatPrice(summary.loan.perInstallment, "PKR")],
                    ["Payoff Date", summary.loan.payoffDate],
                  ].map(([k, v]) => (
                    <div
                      key={k as string}
                      className="bg-background border border-chrome/20 rounded-xl p-3"
                    >
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                        {k}
                      </p>
                      <p className="text-sm font-semibold text-foreground mt-1">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {inv.investmentModel === "Pure Equity" && summary?.equity && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Equity Position
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-background border border-chrome/20 rounded-xl p-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                      Ownership %
                    </p>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {summary.equity.ownershipPercentage.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-background border border-chrome/20 rounded-xl p-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                      Post-Money Valuation
                    </p>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {formatPrice(summary.equity.postMoneyValuation, "PKR")}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Payout only occurs on a distribution or exit/sale event — no guaranteed schedule.
                </p>
              </div>
            )}

            {inv.investmentModel === "Hybrid" && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Principal Recovery
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-semibold text-foreground">
                    {formatPrice(summary.recoveredAmount ?? 0, "PKR")}{" "}
                    <span className="text-sm text-muted-foreground">
                      / {formatPrice(inv.investmentAmount, "PKR")} recovered
                    </span>
                  </p>
                  {summary.principalRecoveredFlag && (
                    <span className="rounded-full border border-green-500/40 bg-green-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-green-400">
                      Principal Recovered
                    </span>
                  )}
                </div>
                <div className="h-2.5 w-full rounded-full bg-chrome/10 overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, summary.recoveryPct ?? 0)}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {(summary.recoveryPct ?? 0).toFixed(1)}% recovered · After recovery, investor
                  receives {inv.profitSharePercentageAfterPrincipal ?? 0}% of each cycle's profit.
                </p>
              </div>
            )}

            {inv.investmentModel === "Batch Revenue Share" && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Linked Batch
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-lg font-semibold text-foreground">
                    {inv.batchNameOrId || "—"}
                  </p>
                  <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-orange-400">
                    {inv.batchProfitSharePercentage ?? 0}% of batch profit
                  </span>
                  {inv.batchSoldOutAt && (
                    <span className="rounded-full border border-green-500/40 bg-green-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-green-400">
                      Batch Sold Out {new Date(inv.batchSoldOutAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {inv.expectedBatchDuration && (
                  <p className="text-sm text-muted-foreground">
                    Expected duration: {inv.expectedBatchDuration}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Deal auto-closes when the batch inventory is fully sold.
                </p>
              </div>
            )}

            {inv.investmentModel === "Profit Share" && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Profit Share Terms
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-teal-400">
                    {inv.profitSharePercentage ?? 0}% of net profit
                  </span>
                  <span className="rounded-full border border-chrome/20 bg-background px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim">
                    {inv.payoutFrequency ?? "Monthly"}
                  </span>
                </div>
                {inv.profitDefinitionNotes && (
                  <p className="text-sm text-muted-foreground border border-chrome/20 rounded-xl bg-background p-3">
                    {inv.profitDefinitionNotes}
                  </p>
                )}
              </div>
            )}

            {(isProfitModel ||
              inv.investmentModel === "Loan" ||
              inv.investmentModel === "Pure Equity") &&
              inv.status !== "Withdrawn" &&
              inv.status !== "Defaulted" && (
                <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                    Log Payout
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="space-y-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                        Kind
                      </span>
                      <select
                        value={kind}
                        onChange={(e) => setKind(e.target.value)}
                        className={inputCls}
                      >
                        {(isProfitModel ? ["profit-cycle"] : []).map((k) => (
                          <option key={k} value={k}>
                            {KIND_LABELS[k]}
                          </option>
                        ))}
                        {inv.investmentModel === "Loan" && (
                          <option value="loan-repayment">Loan Repayment</option>
                        )}
                        {inv.investmentModel === "Pure Equity" && (
                          <option value="distribution">Distribution (Exit Event)</option>
                        )}
                        <option value="manual-adjustment">Manual Adjustment</option>
                      </select>
                    </label>
                    <label className="space-y-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                        Date
                      </span>
                      <input
                        type="date"
                        value={cycleDate}
                        onChange={(e) => setCycleDate(e.target.value)}
                        className={inputCls}
                      />
                    </label>
                    {isProfitModel && kind === "profit-cycle" && (
                      <>
                        <label className="space-y-1.5">
                          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                            Gross Revenue (PKR)
                          </span>
                          <input
                            type="number"
                            min="0"
                            value={grossRevenue}
                            onChange={(e) => setGrossRevenue(e.target.value)}
                            placeholder="0"
                            className={inputCls}
                          />
                        </label>
                        <label className="space-y-1.5">
                          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                            Costs (PKR)
                          </span>
                          <input
                            type="number"
                            min="0"
                            value={costs}
                            onChange={(e) => setCosts(e.target.value)}
                            placeholder="0"
                            className={inputCls}
                          />
                        </label>
                      </>
                    )}
                    {!isProfitModel && (
                      <label className="space-y-1.5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                          Amount (PKR)
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={override}
                          onChange={(e) => setOverride(e.target.value)}
                          placeholder="0"
                          className={inputCls}
                        />
                      </label>
                    )}
                    {isProfitModel && kind === "profit-cycle" && (
                      <div className="col-span-2 md:col-span-4 bg-background border border-chrome/20 rounded-xl p-3 flex items-center justify-between">
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                            Auto-Calculated Payout
                          </p>
                          <p className="text-xl font-semibold text-foreground">
                            {formatPrice(computedPayout, "PKR")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Net profit this cycle: {formatPrice(netProfit, "PKR")}
                          </p>
                        </div>
                        <button
                          onClick={handleLogPayout}
                          disabled={busy || netProfit < 0}
                          className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-40"
                        >
                          <Receipt className="h-4 w-4" /> {busy ? "Saving..." : "Log Payout"}
                        </button>
                      </div>
                    )}
                  </div>
                  {(!isProfitModel || kind !== "profit-cycle") && (
                    <div className="flex flex-wrap items-end gap-3">
                      <label className="flex-1 min-w-[200px] space-y-1.5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                          Note (optional)
                        </span>
                        <input
                          type="text"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="e.g. Installment 1 of 12"
                          className={inputCls}
                        />
                      </label>
                      <button
                        onClick={handleLogPayout}
                        disabled={busy || (isProfitModel ? false : overrideAmt <= 0)}
                        className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm disabled:opacity-40"
                      >
                        <Receipt className="h-4 w-4" /> {busy ? "Saving..." : "Log Payout"}
                      </button>
                    </div>
                  )}
                </div>
              )}

            <div className="bg-graphite border border-chrome/20 rounded-2xl overflow-hidden">
              <div className="p-5 pb-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Payout History
                </p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-chrome/20 hover:bg-transparent">
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Date
                      </TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Kind
                      </TableHead>
                      <TableHead className="hidden md:table-cell font-mono text-[10px] uppercase tracking-[0.2em]">
                        Net Profit
                      </TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Paid
                      </TableHead>
                      <TableHead className="hidden lg:table-cell font-mono text-[10px] uppercase tracking-[0.2em]">
                        Running Total
                      </TableHead>
                      <TableHead className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Balance
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.payouts.length === 0 ? (
                      <TableRow className="border-chrome/20">
                        <TableCell
                          colSpan={6}
                          className="text-center text-muted-foreground text-sm py-10"
                        >
                          No payouts logged yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      data.payouts.map((p) => (
                        <TableRow key={p._id} className="border-chrome/20">
                          <TableCell className="text-sm text-foreground whitespace-nowrap">
                            {new Date(p.cycleDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim">
                              {KIND_LABELS[p.kind] || p.kind}
                            </span>
                            {p.note && (
                              <span className="block text-xs text-muted-foreground">{p.note}</span>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground whitespace-nowrap">
                            {formatPrice(p.netProfit, "PKR")}
                          </TableCell>
                          <TableCell className="text-sm text-green-400 font-medium whitespace-nowrap">
                            {formatPrice(p.payoutAmount, "PKR")}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm text-foreground whitespace-nowrap">
                            {formatPrice(p.runningTotalPaid, "PKR")}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                            {formatPrice(p.remainingBalanceAfter, "PKR")}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {data.capital.length > 0 && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Capital Received Into Business
                </p>
                <div className="flex flex-wrap gap-3">
                  {data.capital.map((c) => (
                    <div
                      key={c._id}
                      className="bg-background border border-chrome/20 rounded-xl px-4 py-2.5"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {formatPrice(c.amountReceived, "PKR")}
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-chrome-dim">
                        {new Date(c.receivedDate).toLocaleDateString()} · {c.method}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.audit.length > 0 && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-5 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim flex items-center gap-2">
                  <History className="h-3.5 w-3.5" /> Audit Trail
                </p>
                <div className="space-y-2 max-h-56 overflow-y-auto scrollbar-thin">
                  {data.audit.map((a) => (
                    <div
                      key={a._id}
                      className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs border-b border-chrome/10 pb-2"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-chrome-dim">
                        {a.action}
                      </span>
                      <span className="text-muted-foreground">{a.actorEmail}</span>
                      <span className="text-chrome-dim">
                        {new Date(a.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {withdrawOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setWithdrawOpen(false)}
          >
            <div
              className="w-full max-w-md bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-foreground">Withdraw Investor</h3>
              <p className="text-sm text-muted-foreground">
                The investor is withdrawing before principal is fully recovered. Log any partial
                payout paid at the time of withdrawal.
              </p>
              <label className="block space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Final Settlement Paid (PKR)
                </span>
                <input
                  type="number"
                  min="0"
                  value={settlement}
                  onChange={(e) => setSettlement(e.target.value)}
                  placeholder="0"
                  className={inputCls}
                />
              </label>
              <label className="block space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Note
                </span>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Reason for withdrawal"
                  className={inputCls}
                />
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setWithdrawOpen(false)}
                  className="rounded-xl border border-chrome/20 px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  disabled={busy}
                  className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-400 disabled:opacity-40"
                >
                  {busy ? "Processing..." : "Confirm Withdrawal"}
                </button>
              </div>
            </div>
          </div>
        )}

        {closeOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setCloseOpen(false)}
          >
            <div
              className="w-full max-w-md bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-foreground">Force Close / Write-off</h3>
              <p className="text-sm text-muted-foreground">
                Admin override for deals that will never complete (e.g. a batch that never sells
                out). This is recorded in the audit trail.
              </p>
              <label className="block space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Status
                </span>
                <select
                  value={closeStatus}
                  onChange={(e) => setCloseStatus(e.target.value)}
                  className={inputCls}
                >
                  <option value="Defaulted">Defaulted (write-off)</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                  Reason *
                </span>
                <textarea
                  rows={3}
                  value={closeReason}
                  onChange={(e) => setCloseReason(e.target.value)}
                  placeholder="e.g. Batch did not sell; writing off remaining balance."
                  className={inputCls + " resize-none"}
                />
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setCloseOpen(false)}
                  className="rounded-xl border border-chrome/20 px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={handleForceClose}
                  disabled={busy || closeReason.trim().length < 5}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 disabled:opacity-40"
                >
                  {busy ? "Processing..." : "Confirm Close"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default InvestorDetail;
