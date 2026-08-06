import { v } from "convex/values";
import { query, mutation, action, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import { requireAdmin } from "./admin";
import {
  INVESTMENT_MODELS,
  INVESTOR_STATUSES,
  REPAYMENT_FREQUENCIES,
  PAYOUT_FREQUENCIES,
  RELATIONSHIPS,
  PAYOUT_KINDS,
  maskCnic,
  validateCnic,
  validateInvestmentInput,
  loanModel,
  pureEquityModel,
  profitShareModel,
  batchModel,
  hybridModel,
  isPositiveNumber,
  isPercent,
} from "./models";

import type { LoanResult, EquityResult, RepaymentFrequency } from "./models";

const MODELS = new Set<string>(INVESTMENT_MODELS);
const STATUSES = new Set<string>(INVESTOR_STATUSES);
const RELS = new Set<string>(RELATIONSHIPS);
const KINDS = new Set<string>(PAYOUT_KINDS);

interface InvestorSummary {
  loan?: LoanResult;
  equity?: EquityResult;
  remainingBalance?: number;
  remainingPrincipal?: number;
  recoveredAmount?: number;
  recoveryPct?: number;
  principalRecoveredFlag?: boolean;
}

function enrichInvestor(investor: Doc<"investors">) {
  const summary: InvestorSummary = {};
  const m = investor.investmentModel;
  const remainingPrincipal = Math.max(
    0,
    investor.investmentAmount - (investor.principalRecovered || 0),
  );
  if (m === "Loan") {
    const loan = loanModel(
      investor.investmentAmount,
      investor.interestRate ?? 0,
      investor.repaymentPeriodMonths ?? 0,
      (investor.repaymentFrequency as RepaymentFrequency) ?? "Monthly",
      investor.investmentDate,
    );
    summary.loan = loan;
    summary.remainingBalance = Math.max(0, loan.totalRepayment - investor.totalPaidToDate);
    summary.remainingPrincipal = remainingPrincipal;
    summary.recoveredAmount = Math.min(investor.investmentAmount, investor.principalRecovered || 0);
  } else if (m === "Pure Equity") {
    const equity = pureEquityModel(investor.investmentAmount, investor.preMoneyValuation ?? 0);
    summary.equity = equity;
    summary.remainingBalance = 0;
  } else if (m === "Hybrid") {
    summary.remainingPrincipal = remainingPrincipal;
    summary.recoveredAmount = Math.min(investor.investmentAmount, investor.principalRecovered || 0);
    summary.recoveryPct =
      investor.investmentAmount > 0
        ? (summary.recoveredAmount / investor.investmentAmount) * 100
        : 0;
    summary.principalRecoveredFlag = remainingPrincipal <= 0;
    summary.remainingBalance = 0;
  } else {
    summary.remainingBalance = 0;
    summary.remainingPrincipal = remainingPrincipal;
    summary.recoveredAmount = Math.min(investor.investmentAmount, investor.principalRecovered || 0);
  }
  return { ...investor, summary };
}

export const insert = internalMutation({
  args: {
    fullName: v.string(),
    cnicEncrypted: v.string(),
    cnicMasked: v.string(),
    cnicHash: v.string(),
    phoneNumber: v.string(),
    email: v.optional(v.string()),
    relationshipToOwner: v.string(),
    investmentAmount: v.number(),
    investmentDate: v.number(),
    investmentModel: v.string(),
    notes: v.optional(v.string()),
    interestRate: v.optional(v.number()),
    repaymentPeriodMonths: v.optional(v.number()),
    repaymentFrequency: v.optional(v.string()),
    preMoneyValuation: v.optional(v.number()),
    profitSharePercentage: v.optional(v.number()),
    payoutFrequency: v.optional(v.string()),
    profitDefinitionNotes: v.optional(v.string()),
    batchNameOrId: v.optional(v.string()),
    batchProfitSharePercentage: v.optional(v.number()),
    expectedBatchDuration: v.optional(v.string()),
    profitSharePercentageAfterPrincipal: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("investors")
      .withIndex("by_cnicHash", (q) => q.eq("cnicHash", args.cnicHash))
      .first();
    if (existing) throw new Error("An investor with this CNIC already exists in the system.");
    const now = Date.now();
    return await ctx.db.insert("investors", {
      ...args,
      status: "Active",
      dateAdded: now,
      principalRecovered: 0,
      cumulativeProfitLogged: 0,
      totalPaidToDate: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const logAudit = internalMutation({
  args: {
    actorEmail: v.string(),
    action: v.string(),
    targetType: v.string(),
    targetId: v.string(),
    changes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("auditLogs", { ...args, createdAt: Date.now() });
  },
});

export const create = action({
  args: {
    sessionToken: v.string(),
    fullName: v.string(),
    cnic: v.string(),
    phoneNumber: v.string(),
    email: v.optional(v.string()),
    relationshipToOwner: v.string(),
    investmentAmount: v.number(),
    investmentDate: v.number(),
    investmentModel: v.string(),
    notes: v.optional(v.string()),
    interestRate: v.optional(v.number()),
    repaymentPeriodMonths: v.optional(v.number()),
    repaymentFrequency: v.optional(v.string()),
    preMoneyValuation: v.optional(v.number()),
    profitSharePercentage: v.optional(v.number()),
    payoutFrequency: v.optional(v.string()),
    profitDefinitionNotes: v.optional(v.string()),
    batchNameOrId: v.optional(v.string()),
    batchProfitSharePercentage: v.optional(v.number()),
    expectedBatchDuration: v.optional(v.string()),
    profitSharePercentageAfterPrincipal: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<{ investorId: Id<"investors"> }> => {
    const admin = await ctx.runQuery(internal.admin.checkSession, {
      sessionToken: args.sessionToken,
    });
    const errors = validateInvestmentInput(args);
    if (errors.length > 0) throw new Error(errors.join(" | "));
    if (!RELS.has(args.relationshipToOwner)) throw new Error("Invalid relationship to owner.");
    if (!validateCnic(args.cnic)) throw new Error("CNIC must be in XXXXX-XXXXXXX-X format.");
    if (args.fullName.trim().length < 2) throw new Error("Full name is required.");
    if (args.phoneNumber.trim().length < 7) throw new Error("Phone number is required.");
    if (args.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.email.trim()))
      throw new Error("Invalid email format.");

    const cnicEncrypted = await ctx.runAction(internal.crypto.encryptCnic, {
      plain: args.cnic.trim(),
    });
    const cnicHash = await ctx.runAction(internal.crypto.hashCnic, { plain: args.cnic.trim() });
    const cnicMasked = maskCnic(args.cnic.trim());

    const id = await ctx.runMutation(internal.investors.insert, {
      fullName: args.fullName.trim(),
      cnicEncrypted,
      cnicMasked,
      cnicHash,
      phoneNumber: args.phoneNumber.trim(),
      email: args.email ? args.email.trim() : undefined,
      relationshipToOwner: args.relationshipToOwner,
      investmentAmount: args.investmentAmount,
      investmentDate: args.investmentDate,
      investmentModel: args.investmentModel,
      notes: args.notes ? args.notes.trim() : undefined,
      interestRate: args.interestRate,
      repaymentPeriodMonths: args.repaymentPeriodMonths,
      repaymentFrequency: args.repaymentFrequency,
      preMoneyValuation: args.preMoneyValuation,
      profitSharePercentage: args.profitSharePercentage,
      payoutFrequency: args.payoutFrequency,
      profitDefinitionNotes: args.profitDefinitionNotes,
      batchNameOrId: args.batchNameOrId,
      batchProfitSharePercentage: args.batchProfitSharePercentage,
      expectedBatchDuration: args.expectedBatchDuration,
      profitSharePercentageAfterPrincipal: args.profitSharePercentageAfterPrincipal,
    });

    await ctx.runMutation(internal.investors.logAudit, {
      actorEmail: admin.email,
      action: "create",
      targetType: "investor",
      targetId: id,
      changes: JSON.stringify({ model: args.investmentModel, amount: args.investmentAmount }),
    });

    return { investorId: id };
  },
});

export const list = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const investors = await ctx.db.query("investors").order("desc").collect();
    return investors.map(enrichInvestor);
  },
});

export const findByCnicHash = internalQuery({
  args: { cnicHash: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("investors")
      .withIndex("by_cnicHash", (q) => q.eq("cnicHash", args.cnicHash))
      .first();
  },
});

export const checkCnicDuplicate = action({
  args: { sessionToken: v.string(), cnic: v.string() },
  handler: async (
    ctx,
    args,
  ): Promise<
    | { exists: false; masked: string }
    | { exists: true; masked: string; name: string; status: string }
  > => {
    await ctx.runQuery(internal.admin.checkSession, { sessionToken: args.sessionToken });
    if (!validateCnic(args.cnic)) throw new Error("CNIC must be in XXXXX-XXXXXXX-X format.");
    const cnicHash = await ctx.runAction(internal.crypto.hashCnic, { plain: args.cnic.trim() });
    const existing = await ctx.runQuery(internal.investors.findByCnicHash, { cnicHash });
    if (!existing) return { exists: false, masked: maskCnic(args.cnic.trim()) };
    return {
      exists: true,
      masked: existing.cnicMasked,
      name: existing.fullName,
      status: existing.status,
    };
  },
});

export const getById = query({
  args: { sessionToken: v.string(), id: v.id("investors") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const investor = await ctx.db.get(args.id);
    if (!investor) return null;
    const payouts = await ctx.db
      .query("payouts")
      .withIndex("by_investorId", (q) => q.eq("investorId", args.id))
      .order("desc")
      .collect();
    const audit = await ctx.db
      .query("auditLogs")
      .withIndex("by_target", (q) => q.eq("targetType", "investor").eq("targetId", args.id))
      .order("desc")
      .collect();
    const capital = await ctx.db
      .query("capitalContributions")
      .withIndex("by_investorId", (q) => q.eq("investorId", args.id))
      .order("desc")
      .collect();
    return { investor: enrichInvestor(investor), payouts, audit, capital };
  },
});

export const update = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("investors"),
    fullName: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    email: v.optional(v.string()),
    relationshipToOwner: v.optional(v.string()),
    investmentDate: v.optional(v.number()),
    status: v.optional(v.string()),
    notes: v.optional(v.string()),
    batchNameOrId: v.optional(v.string()),
    expectedBatchDuration: v.optional(v.string()),
    profitDefinitionNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const investor = await ctx.db.get(args.id);
    if (!investor) throw new Error("Investor not found.");
    const safe: Record<string, unknown> = { updatedAt: Date.now() };
    const changed: string[] = [];
    if (args.fullName !== undefined) {
      if (args.fullName.trim().length < 2) throw new Error("Full name is required.");
      safe.fullName = args.fullName.trim();
      changed.push("fullName");
    }
    if (args.phoneNumber !== undefined) {
      if (args.phoneNumber.trim().length < 7) throw new Error("Phone number is required.");
      safe.phoneNumber = args.phoneNumber.trim();
      changed.push("phoneNumber");
    }
    if (args.email !== undefined) {
      if (args.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.email.trim()))
        throw new Error("Invalid email format.");
      safe.email = args.email.trim() || undefined;
      changed.push("email");
    }
    if (args.relationshipToOwner !== undefined) {
      if (!RELS.has(args.relationshipToOwner)) throw new Error("Invalid relationship to owner.");
      safe.relationshipToOwner = args.relationshipToOwner;
      changed.push("relationshipToOwner");
    }
    if (args.investmentDate !== undefined) {
      if (!isPositiveNumber(args.investmentDate)) throw new Error("Invalid investment date.");
      safe.investmentDate = args.investmentDate;
      changed.push("investmentDate");
    }
    if (args.status !== undefined) {
      if (!STATUSES.has(args.status)) throw new Error("Invalid status.");
      safe.status = args.status;
      changed.push("status");
    }
    if (args.notes !== undefined) {
      safe.notes = args.notes.trim() || undefined;
      changed.push("notes");
    }
    if (args.batchNameOrId !== undefined) {
      safe.batchNameOrId = args.batchNameOrId.trim() || undefined;
      changed.push("batchNameOrId");
    }
    if (args.expectedBatchDuration !== undefined) {
      safe.expectedBatchDuration = args.expectedBatchDuration.trim() || undefined;
      changed.push("expectedBatchDuration");
    }
    if (args.profitDefinitionNotes !== undefined) {
      safe.profitDefinitionNotes = args.profitDefinitionNotes.trim() || undefined;
      changed.push("profitDefinitionNotes");
    }
    await ctx.db.patch(args.id, safe);
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "update",
      targetType: "investor",
      targetId: args.id,
      changes: JSON.stringify(changed),
      createdAt: Date.now(),
    });
  },
});

export const logPayout = mutation({
  args: {
    sessionToken: v.string(),
    investorId: v.id("investors"),
    cycleDate: v.number(),
    grossRevenue: v.number(),
    costs: v.number(),
    kind: v.optional(v.string()),
    payoutAmountOverride: v.optional(v.number()),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const investor = await ctx.db.get(args.investorId);
    if (!investor) throw new Error("Investor not found.");
    if (!isPositiveNumber(args.grossRevenue)) throw new Error("Gross revenue cannot be negative.");
    if (!isPositiveNumber(args.costs)) throw new Error("Costs cannot be negative.");
    if (args.payoutAmountOverride !== undefined && !isPositiveNumber(args.payoutAmountOverride))
      throw new Error("Payout amount cannot be negative.");
    const kind = args.kind ?? "profit-cycle";
    if (!KINDS.has(kind)) throw new Error("Invalid payout kind.");

    if (
      (investor.status === "Withdrawn" || investor.status === "Defaulted") &&
      kind === "profit-cycle"
    ) {
      throw new Error("Cannot log a profit cycle for a withdrawn or defaulted investor.");
    }

    const netProfit = args.grossRevenue - args.costs;
    const model = investor.investmentModel;
    const remainingPrincipal = Math.max(
      0,
      investor.investmentAmount - (investor.principalRecovered || 0),
    );
    let payout = 0;
    let toPrincipal = 0;

    if (kind === "loan-repayment") {
      payout = args.payoutAmountOverride ?? 0;
      toPrincipal = Math.min(payout, remainingPrincipal);
    } else if (
      kind === "distribution" ||
      kind === "manual-adjustment" ||
      kind === "withdrawal-payout"
    ) {
      payout = args.payoutAmountOverride ?? 0;
    } else {
      if (model === "Profit Share") {
        payout = profitShareModel(netProfit, investor.profitSharePercentage ?? 0).payout;
      } else if (model === "Batch Revenue Share") {
        payout = batchModel(netProfit, investor.batchProfitSharePercentage ?? 0).payout;
      } else if (model === "Hybrid") {
        const r = hybridModel(
          netProfit,
          remainingPrincipal,
          investor.profitSharePercentageAfterPrincipal ?? 0,
        );
        payout = r.payout;
        toPrincipal = r.toPrincipal;
      } else if (model === "Loan") {
        payout = args.payoutAmountOverride ?? 0;
        toPrincipal = Math.min(payout, remainingPrincipal);
      } else {
        payout = 0;
      }
    }

    const runningTotalPaid = (investor.totalPaidToDate || 0) + payout;
    const principalRecoveredAfter = Math.min(
      investor.investmentAmount,
      (investor.principalRecovered || 0) + toPrincipal,
    );

    let remainingBalanceAfter = 0;
    if (model === "Loan") {
      const loan = loanModel(
        investor.investmentAmount,
        investor.interestRate ?? 0,
        investor.repaymentPeriodMonths ?? 0,
        (investor.repaymentFrequency as RepaymentFrequency) ?? "Monthly",
        investor.investmentDate,
      );
      remainingBalanceAfter = Math.max(0, loan.totalRepayment - runningTotalPaid);
    } else if (model === "Hybrid") {
      remainingBalanceAfter = Math.max(0, investor.investmentAmount - principalRecoveredAfter);
    }

    await ctx.db.patch(args.investorId, {
      totalPaidToDate: runningTotalPaid,
      principalRecovered: principalRecoveredAfter,
      cumulativeProfitLogged: (investor.cumulativeProfitLogged || 0) + Math.max(0, netProfit),
      updatedAt: Date.now(),
    });

    await ctx.db.insert("payouts", {
      investorId: args.investorId,
      cycleDate: args.cycleDate,
      grossRevenue: args.grossRevenue,
      costs: args.costs,
      netProfit,
      payoutAmount: payout,
      kind,
      note: args.note ? args.note.trim() : undefined,
      principalRecoveredAfter,
      remainingBalanceAfter,
      runningTotalPaid,
      createdAt: Date.now(),
    });

    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "log-payout",
      targetType: "investor",
      targetId: args.investorId,
      changes: JSON.stringify({ kind, payout, netProfit }),
      createdAt: Date.now(),
    });
  },
});

export const withdraw = mutation({
  args: {
    sessionToken: v.string(),
    investorId: v.id("investors"),
    settlementAmount: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const investor = await ctx.db.get(args.investorId);
    if (!investor) throw new Error("Investor not found.");
    if (!isPositiveNumber(args.settlementAmount))
      throw new Error("Settlement amount cannot be negative.");
    if (investor.status === "Withdrawn") throw new Error("Investor is already withdrawn.");

    const payout = args.settlementAmount;
    const remainingPrincipal = Math.max(
      0,
      investor.investmentAmount - (investor.principalRecovered || 0),
    );
    const toPrincipal = Math.min(payout, remainingPrincipal);
    const runningTotalPaid = (investor.totalPaidToDate || 0) + payout;
    const principalRecoveredAfter = Math.min(
      investor.investmentAmount,
      (investor.principalRecovered || 0) + toPrincipal,
    );

    await ctx.db.patch(args.investorId, {
      status: "Withdrawn",
      withdrawnAt: Date.now(),
      totalPaidToDate: runningTotalPaid,
      principalRecovered: principalRecoveredAfter,
      updatedAt: Date.now(),
    });

    if (payout > 0) {
      await ctx.db.insert("payouts", {
        investorId: args.investorId,
        cycleDate: Date.now(),
        grossRevenue: 0,
        costs: 0,
        netProfit: 0,
        payoutAmount: payout,
        kind: "withdrawal-payout",
        note: args.note ? args.note.trim() : undefined,
        principalRecoveredAfter,
        remainingBalanceAfter: Math.max(0, investor.investmentAmount - principalRecoveredAfter),
        runningTotalPaid,
        createdAt: Date.now(),
      });
    }

    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "withdraw",
      targetType: "investor",
      targetId: args.investorId,
      changes: JSON.stringify({ settlementAmount: payout }),
      createdAt: Date.now(),
    });
  },
});

export const markBatchSoldOut = mutation({
  args: { sessionToken: v.string(), investorId: v.id("investors"), note: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const investor = await ctx.db.get(args.investorId);
    if (!investor) throw new Error("Investor not found.");
    if (investor.investmentModel !== "Batch Revenue Share")
      throw new Error("This action only applies to batch-based revenue share deals.");
    if (investor.batchSoldOutAt) throw new Error("Batch is already marked as sold out.");
    await ctx.db.patch(args.investorId, {
      batchSoldOutAt: Date.now(),
      status: "Completed",
      updatedAt: Date.now(),
    });
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "mark-batch-sold-out",
      targetType: "investor",
      targetId: args.investorId,
      changes: args.note ? JSON.stringify({ note: args.note.trim() }) : undefined,
      createdAt: Date.now(),
    });
  },
});

export const forceClose = mutation({
  args: {
    sessionToken: v.string(),
    investorId: v.id("investors"),
    reason: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const investor = await ctx.db.get(args.investorId);
    if (!investor) throw new Error("Investor not found.");
    if (!["Completed", "Defaulted"].includes(args.status)) throw new Error("Invalid close status.");
    if (args.reason.trim().length < 5) throw new Error("A reason is required (min 5 characters).");
    await ctx.db.patch(args.investorId, {
      status: args.status,
      closedAt: Date.now(),
      updatedAt: Date.now(),
    });
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "force-close",
      targetType: "investor",
      targetId: args.investorId,
      changes: JSON.stringify({ reason: args.reason.trim(), status: args.status }),
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("investors") },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const investor = await ctx.db.get(args.id);
    if (!investor) throw new Error("Investor not found.");
    await ctx.db.delete(args.id);
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "delete",
      targetType: "investor",
      targetId: args.id,
      changes: JSON.stringify({ name: investor.fullName, masked: investor.cnicMasked }),
      createdAt: Date.now(),
    });
  },
});

export { MODELS, STATUSES, isPositiveNumber, isPercent };
