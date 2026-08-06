import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, AlertTriangle, HandCoins } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getSessionToken } from "@/lib/admin";
import { formatPrice } from "@/lib/currency";
import {
  INVESTMENT_MODELS,
  RELATIONSHIPS,
  REPAYMENT_FREQUENCIES,
  PAYOUT_FREQUENCIES,
  loanModel,
  pureEquityModel,
  hybridModel,
  validateCnic,
  maskCnic,
  CNIC_REGEX,
} from "../../convex/models";
import type { LoanResult, EquityResult } from "../../convex/models";

export const Route = createFileRoute("/investor/new")({
  component: AddInvestor,
  head: () => ({
    meta: [{ title: "Add Investor — VintageCvunt Admin" }],
  }),
});

const STEPS = [
  "Personal Info",
  "Select Model",
  "Investment Terms",
  "Live Preview",
  "Confirm & Save",
];

const MODEL_DESCRIPTIONS: Record<string, string> = {
  Loan: "Fixed return on principal with interest, repaid on a schedule.",
  "Pure Equity": "Ownership % based on post-money valuation. Payout on distribution or exit.",
  "Profit Share": "No equity — investor receives a % of net profit per cycle.",
  "Batch Revenue Share": "Tied to a specific product batch; closes when batch sells out.",
  Hybrid: "Principal recovered first from profits, then ongoing profit split. Recommended default.",
};

const MODEL_ICONS: Record<string, string> = {
  Loan: "%",
  "Pure Equity": "◈",
  "Profit Share": "₹",
  "Batch Revenue Share": "▣",
  Hybrid: "◉",
};

const EASE = [0.16, 1, 0.3, 1] as const;

const inputCls =
  "w-full rounded-xl border border-chrome/20 bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-chrome/50 transition-colors";

function formatCnic(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 13);
  if (d.length <= 5) return d;
  if (d.length <= 12) return d.slice(0, 5) + "-" + d.slice(5);
  return d.slice(0, 5) + "-" + d.slice(5, 12) + "-" + d.slice(12);
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function AddInvestor() {
  const navigate = useNavigate();
  const sessionToken = getSessionToken() ?? "";
  const createInvestor = useAction(api.investors.create);
  const checkCnic = useAction(api.investors.checkCnicDuplicate);

  const [step, setStep] = useState(0);
  const [confirmAgreed, setConfirmAgreed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dupStatus, setDupStatus] = useState<null | {
    exists: boolean;
    masked: string;
    name?: string;
    status?: string;
  }>(null);
  const dupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    cnic: "",
    phoneNumber: "",
    email: "",
    relationshipToOwner: "Family" as string,
    investmentAmount: "",
    investmentDate: new Date().toISOString().split("T")[0],
    investmentModel: "Hybrid" as string,
    notes: "",
    interestRate: "",
    repaymentPeriodMonths: "",
    repaymentFrequency: "Monthly" as string,
    preMoneyValuation: "",
    profitSharePercentage: "",
    payoutFrequency: "Monthly" as string,
    profitDefinitionNotes: "",
    batchNameOrId: "",
    batchProfitSharePercentage: "",
    expectedBatchDuration: "",
    profitSharePercentageAfterPrincipal: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleCnicChange = (raw: string) => {
    const formatted = formatCnic(raw);
    set("cnic", formatted);
    setDupStatus(null);
    if (dupTimer.current) clearTimeout(dupTimer.current);
    if (CNIC_REGEX.test(formatted)) {
      dupTimer.current = setTimeout(async () => {
        try {
          const res = await checkCnic({ sessionToken, cnic: formatted });
          setDupStatus(res);
        } catch {
          setDupStatus(null);
        }
      }, 400);
    }
  };

  const amount = useMemo(() => parseFloat(form.investmentAmount) || 0, [form.investmentAmount]);
  const rate = useMemo(() => parseFloat(form.interestRate) || 0, [form.interestRate]);
  const months = useMemo(
    () => parseFloat(form.repaymentPeriodMonths) || 0,
    [form.repaymentPeriodMonths],
  );
  const preMoney = useMemo(() => parseFloat(form.preMoneyValuation) || 0, [form.preMoneyValuation]);
  const sharePct = useMemo(
    () =>
      parseFloat(
        form.profitSharePercentage ||
          form.batchProfitSharePercentage ||
          form.profitSharePercentageAfterPrincipal,
      ) || 0,
    [
      form.profitSharePercentage,
      form.batchProfitSharePercentage,
      form.profitSharePercentageAfterPrincipal,
    ],
  );
  const investmentTimestamp = useMemo(() => {
    const d = new Date(form.investmentDate);
    return isNaN(d.getTime()) ? Date.now() : d.getTime();
  }, [form.investmentDate]);

  const preview = useMemo(() => {
    if (form.investmentModel === "Loan") {
      if (!amount || !months) return null;
      return loanModel(
        amount,
        rate,
        months,
        form.repaymentFrequency as "Monthly" | "Quarterly" | "One-time at end",
        investmentTimestamp,
      );
    }
    if (form.investmentModel === "Pure Equity") {
      if (!amount || !preMoney) return null;
      return pureEquityModel(amount, preMoney);
    }
    return null;
  }, [
    form.investmentModel,
    amount,
    rate,
    months,
    preMoney,
    form.repaymentFrequency,
    investmentTimestamp,
  ]);

  const step1Valid =
    form.fullName.trim().length >= 2 &&
    validateCnic(form.cnic) &&
    !dupStatus?.exists &&
    form.phoneNumber.trim().length >= 7;
  const step3Valid =
    form.investmentAmount.trim() && parseFloat(form.investmentAmount) > 0
      ? form.investmentModel === "Loan"
        ? parseFloat(form.interestRate || "0") >= 0 &&
          parseFloat(form.interestRate || "0") <= 100 &&
          parseFloat(form.repaymentPeriodMonths || "0") > 0
        : form.investmentModel === "Pure Equity"
          ? parseFloat(form.preMoneyValuation || "0") > 0
          : form.investmentModel === "Profit Share"
            ? parseFloat(form.profitSharePercentage || "0") >= 0 &&
              parseFloat(form.profitSharePercentage || "0") <= 100
            : form.investmentModel === "Batch Revenue Share"
              ? !!form.batchNameOrId.trim() &&
                parseFloat(form.batchProfitSharePercentage || "0") >= 0 &&
                parseFloat(form.batchProfitSharePercentage || "0") <= 100
              : parseFloat(form.profitSharePercentageAfterPrincipal || "0") >= 0 &&
                parseFloat(form.profitSharePercentageAfterPrincipal || "0") <= 100
      : false;

  const canNext =
    step === 0 ? step1Valid : step === 1 ? !!form.investmentModel : step === 2 ? step3Valid : true;

  async function handleSave() {
    if (!confirmAgreed) return;
    setSaving(true);
    setError("");
    try {
      const res = await createInvestor({
        sessionToken,
        fullName: form.fullName,
        cnic: form.cnic,
        phoneNumber: form.phoneNumber,
        email: form.email.trim() || undefined,
        relationshipToOwner: form.relationshipToOwner,
        investmentAmount: amount,
        investmentDate: investmentTimestamp,
        investmentModel: form.investmentModel,
        notes: form.notes.trim() || undefined,
        interestRate: form.investmentModel === "Loan" ? rate : undefined,
        repaymentPeriodMonths: form.investmentModel === "Loan" ? months : undefined,
        repaymentFrequency: form.investmentModel === "Loan" ? form.repaymentFrequency : undefined,
        preMoneyValuation: form.investmentModel === "Pure Equity" ? preMoney : undefined,
        profitSharePercentage:
          form.investmentModel === "Profit Share"
            ? parseFloat(form.profitSharePercentage) || undefined
            : undefined,
        payoutFrequency: form.investmentModel === "Profit Share" ? form.payoutFrequency : undefined,
        profitDefinitionNotes:
          form.investmentModel === "Profit Share"
            ? form.profitDefinitionNotes.trim() || undefined
            : undefined,
        batchNameOrId:
          form.investmentModel === "Batch Revenue Share"
            ? form.batchNameOrId.trim() || undefined
            : undefined,
        batchProfitSharePercentage:
          form.investmentModel === "Batch Revenue Share"
            ? parseFloat(form.batchProfitSharePercentage) || undefined
            : undefined,
        expectedBatchDuration:
          form.investmentModel === "Batch Revenue Share"
            ? form.expectedBatchDuration.trim() || undefined
            : undefined,
        profitSharePercentageAfterPrincipal:
          form.investmentModel === "Hybrid"
            ? parseFloat(form.profitSharePercentageAfterPrincipal) || undefined
            : undefined,
      });
      navigate({ to: "/investor/$id", params: { id: res.investorId } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save investor. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            to="/investor"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Investors
          </Link>
          <span className="rounded-full bg-graphite border border-chrome/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Step {step + 1} / {STEPS.length}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                  i === step
                    ? "bg-foreground text-background border-foreground"
                    : i < step
                      ? "bg-green-500/15 text-green-400 border-green-500/30"
                      : "bg-graphite text-chrome-dim border-chrome/20"
                }`}
              >
                {i < step ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
                {label}
              </button>
              {i < STEPS.length - 1 && <div className="h-px w-4 bg-chrome/20" />}
            </div>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {step === 0 && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                  <p className="text-sm text-muted-foreground">
                    CNIC is encrypted at rest and never shown in full.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Full Name *">
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                      placeholder="e.g. Ahmed Raza"
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label="CNIC * (XXXXX-XXXXXXX-X)"
                    hint="Stored encrypted. Only the last 4 digits are ever displayed."
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.cnic}
                      onChange={(e) => handleCnicChange(e.target.value)}
                      placeholder="42101-1234567-1"
                      className={inputCls}
                    />
                    {dupStatus?.exists && (
                      <p className="text-xs text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="h-3 w-3" />
                        CNIC already exists for {dupStatus.name} ({dupStatus.masked},{" "}
                        {dupStatus.status}). Duplicates are not allowed.
                      </p>
                    )}
                    {form.cnic && !validateCnic(form.cnic) && (
                      <p className="text-xs text-yellow-400">Format should be 12345-1234567-1</p>
                    )}
                  </Field>
                  <Field label="Phone Number *">
                    <input
                      type="tel"
                      value={form.phoneNumber}
                      onChange={(e) => set("phoneNumber", e.target.value)}
                      placeholder="+92 300 1234567"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email (optional)">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="investor@email.com"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Relationship To Owner">
                    <select
                      value={form.relationshipToOwner}
                      onChange={(e) => set("relationshipToOwner", e.target.value)}
                      className={inputCls}
                    >
                      {RELATIONSHIPS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Select Investment Model</h2>
                  <p className="text-sm text-muted-foreground">
                    This determines how the investor's share and returns are calculated.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INVESTMENT_MODELS.map((m) => (
                    <button
                      key={m}
                      onClick={() => set("investmentModel", m)}
                      className={`text-left rounded-2xl border p-5 transition-all duration-200 ${
                        form.investmentModel === m
                          ? "border-chrome bg-foreground/10"
                          : "border-chrome/20 bg-graphite hover:border-chrome/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-chrome/10 text-lg">
                          {MODEL_ICONS[m]}
                        </span>
                        {form.investmentModel === m && <Check className="h-4 w-4 text-green-400" />}
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">{m}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{MODEL_DESCRIPTIONS[m]}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {form.investmentModel} — Terms
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {MODEL_DESCRIPTIONS[form.investmentModel]}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Investment Amount * (PKR)">
                    <input
                      type="number"
                      min="0"
                      value={form.investmentAmount}
                      onChange={(e) => set("investmentAmount", e.target.value)}
                      placeholder="100000"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Investment Date *">
                    <input
                      type="date"
                      value={form.investmentDate}
                      onChange={(e) => set("investmentDate", e.target.value)}
                      className={inputCls}
                    />
                  </Field>

                  {form.investmentModel === "Loan" && (
                    <>
                      <Field label="Interest Rate * (%)">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={form.interestRate}
                          onChange={(e) => set("interestRate", e.target.value)}
                          placeholder="e.g. 20"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Repayment Period * (months)">
                        <input
                          type="number"
                          min="1"
                          value={form.repaymentPeriodMonths}
                          onChange={(e) => set("repaymentPeriodMonths", e.target.value)}
                          placeholder="e.g. 12"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Repayment Frequency">
                        <select
                          value={form.repaymentFrequency}
                          onChange={(e) => set("repaymentFrequency", e.target.value)}
                          className={inputCls}
                        >
                          {REPAYMENT_FREQUENCIES.map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </>
                  )}

                  {form.investmentModel === "Pure Equity" && (
                    <Field label="Pre-Money Valuation * (PKR)">
                      <input
                        type="number"
                        min="0"
                        value={form.preMoneyValuation}
                        onChange={(e) => set("preMoneyValuation", e.target.value)}
                        placeholder="e.g. 2000000"
                        className={inputCls}
                      />
                    </Field>
                  )}

                  {form.investmentModel === "Profit Share" && (
                    <>
                      <Field label="Profit Share * (%)">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={form.profitSharePercentage}
                          onChange={(e) => set("profitSharePercentage", e.target.value)}
                          placeholder="e.g. 25"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Payout Frequency">
                        <select
                          value={form.payoutFrequency}
                          onChange={(e) => set("payoutFrequency", e.target.value)}
                          className={inputCls}
                        >
                          {PAYOUT_FREQUENCIES.map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <div className="md:col-span-2">
                        <Field label="Profit Definition (what counts as cost before profit)">
                          <textarea
                            rows={3}
                            value={form.profitDefinitionNotes}
                            onChange={(e) => set("profitDefinitionNotes", e.target.value)}
                            placeholder="e.g. Net profit = revenue − product cost, ad spend, delivery and packaging."
                            className={inputCls + " resize-none"}
                          />
                        </Field>
                      </div>
                    </>
                  )}

                  {form.investmentModel === "Batch Revenue Share" && (
                    <>
                      <Field label="Linked Batch Name / ID *">
                        <input
                          type="text"
                          value={form.batchNameOrId}
                          onChange={(e) => set("batchNameOrId", e.target.value)}
                          placeholder="e.g. Winter '26 — Chrome Leather"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Batch Profit Share * (%)">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={form.batchProfitSharePercentage}
                          onChange={(e) => set("batchProfitSharePercentage", e.target.value)}
                          placeholder="e.g. 30"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Expected Batch Duration (optional)">
                        <input
                          type="text"
                          value={form.expectedBatchDuration}
                          onChange={(e) => set("expectedBatchDuration", e.target.value)}
                          placeholder="e.g. 4 months, or Dec 2026 – Mar 2027"
                          className={inputCls}
                        />
                      </Field>
                    </>
                  )}

                  {form.investmentModel === "Hybrid" && (
                    <Field
                      label="Profit Share After Principal Recovered * (%)"
                      hint="100% of each cycle's profit goes to the investor until their principal is recovered. After that, the split below applies."
                    >
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={form.profitSharePercentageAfterPrincipal}
                        onChange={(e) => set("profitSharePercentageAfterPrincipal", e.target.value)}
                        placeholder="e.g. 30"
                        className={inputCls}
                      />
                    </Field>
                  )}

                  <div className="md:col-span-2">
                    <Field label="Notes (special terms, optional)">
                      <textarea
                        rows={2}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="Any special terms agreed with the investor..."
                        className={inputCls + " resize-none"}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
                  <p className="text-sm text-muted-foreground">
                    Recalculated in real time from the terms entered.
                  </p>
                </div>

                {form.investmentModel === "Loan" && preview ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        label: "Total Amount Owed",
                        value: formatPrice((preview as LoanResult).totalRepayment, "PKR"),
                      },
                      {
                        label: "Per Installment",
                        value: formatPrice((preview as LoanResult).perInstallment, "PKR"),
                      },
                      { label: "Final Payoff Date", value: (preview as LoanResult).payoffDate },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="bg-background border border-chrome/20 rounded-2xl p-4 space-y-2"
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                          {s.label}
                        </p>
                        <p className="text-lg font-semibold text-foreground">{s.value}</p>
                      </div>
                    ))}
                  </div>
                ) : form.investmentModel === "Pure Equity" && preview ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        label: "Ownership %",
                        value: (preview as EquityResult).ownershipPercentage.toFixed(2) + "%",
                      },
                      {
                        label: "Post-Money Valuation",
                        value: formatPrice((preview as EquityResult).postMoneyValuation, "PKR"),
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="bg-background border border-chrome/20 rounded-2xl p-4 space-y-2"
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                          {s.label}
                        </p>
                        <p className="text-lg font-semibold text-foreground">{s.value}</p>
                      </div>
                    ))}
                    <p className="sm:col-span-2 text-sm text-muted-foreground border border-chrome/20 rounded-xl bg-background p-4">
                      Payout only occurs on a distribution or exit/sale event — there is no
                      guaranteed payout schedule for equity.
                    </p>
                  </div>
                ) : null}

                {form.investmentModel === "Profit Share" && (
                  <div className="bg-background border border-chrome/20 rounded-2xl p-4 space-y-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                      Investor Share
                    </p>
                    <p className="text-xl font-semibold text-foreground">
                      {sharePct || 0}% of each cycle's net profit
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Payout frequency: {form.payoutFrequency}. Each cycle you log actual gross
                      revenue and costs — the payout is auto-calculated.
                    </p>
                  </div>
                )}

                {form.investmentModel === "Batch Revenue Share" && (
                  <div className="bg-background border border-chrome/20 rounded-2xl p-4 space-y-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                      Linked Batch
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {form.batchNameOrId || "—"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sharePct || 0}% of that batch's net profit. The deal auto-closes when the
                      batch inventory is fully sold (admin marks it sold out).
                    </p>
                  </div>
                )}

                {form.investmentModel === "Hybrid" && (
                  <div className="bg-background border border-chrome/20 rounded-2xl p-4 space-y-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                      Principal Recovery Status
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-xl font-semibold text-foreground">
                        0 / {formatPrice(amount || 0, "PKR")}
                      </p>
                      <p className="text-sm text-muted-foreground">recovered</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-chrome/10 overflow-hidden">
                      <div className="h-full w-0 bg-green-500 transition-all duration-300" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      100% of each cycle's profit goes to the investor until{" "}
                      {formatPrice(amount || 0, "PKR")} is recovered, then {sharePct || 0}% of each
                      cycle's profit thereafter.
                    </p>
                  </div>
                )}

                <div className="border-t border-chrome/20 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Investor", value: form.fullName || "—" },
                    { label: "Investment", value: formatPrice(amount, "PKR") },
                    { label: "Model", value: form.investmentModel },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                        {s.label}
                      </p>
                      <p className="text-sm text-foreground truncate">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bg-graphite border border-chrome/20 rounded-2xl p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Confirm & Save</h2>
                  <p className="text-sm text-muted-foreground">
                    Review the summary below before saving.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  {[
                    ["Name", form.fullName],
                    ["CNIC (masked)", maskCnic(form.cnic)],
                    ["Phone", form.phoneNumber],
                    ["Email", form.email || "—"],
                    ["Relationship", form.relationshipToOwner],
                    ["Model", form.investmentModel],
                    ["Investment", formatPrice(amount, "PKR")],
                    ["Date", form.investmentDate],
                    ["Status", "Active"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between gap-4 border-b border-chrome/10 pb-2"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome-dim">
                        {k}
                      </span>
                      <span className="text-foreground truncate">{v}</span>
                    </div>
                  ))}
                </div>
                {form.notes && (
                  <p className="text-sm text-muted-foreground border border-chrome/20 rounded-xl bg-background p-3">
                    Notes: {form.notes}
                  </p>
                )}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={confirmAgreed}
                    onChange={(e) => setConfirmAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-chrome"
                  />
                  <span className="text-sm text-foreground">
                    I confirm these terms have been agreed with the investor.
                  </span>
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-chrome/20 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={!confirmAgreed || saving}
              className="btn-chrome btn-chrome-inner inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? (
                "Saving..."
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" /> Save Investor
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddInvestor;
