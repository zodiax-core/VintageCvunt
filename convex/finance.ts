import { v } from "convex/values";
import { query } from "./_generated/server";
import { requireAdmin } from "./admin";
import { loanModel } from "./models";
import type { RepaymentFrequency } from "./models";

export const summary = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const [orders, expenses, investors, contributions, assets, payouts] = await Promise.all([
      ctx.db.query("orders").collect(),
      ctx.db.query("expenses").collect(),
      ctx.db.query("investors").collect(),
      ctx.db.query("capitalContributions").collect(),
      ctx.db.query("assets").collect(),
      ctx.db.query("payouts").collect(),
    ]);

    const revenueByMonth: Record<string, number> = {};
    const expenseByMonth: Record<string, number> = {};
    const expenseByCategory: Record<string, number> = {};

    const key = (ts: number) => {
      const d = new Date(ts);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    };

    for (const o of orders)
      revenueByMonth[key(o.createdAt)] = (revenueByMonth[key(o.createdAt)] || 0) + o.total;
    for (const e of expenses) {
      const k = key(e.expenseDate);
      expenseByMonth[k] = (expenseByMonth[k] || 0) + e.amount;
      expenseByCategory[e.category] = (expenseByCategory[e.category] || 0) + e.amount;
    }

    const months = new Set([...Object.keys(revenueByMonth), ...Object.keys(expenseByMonth)]);
    const timeline = Array.from(months)
      .sort()
      .map((month) => ({
        month,
        revenue: Math.round(revenueByMonth[month] || 0),
        expenses: Math.round(expenseByMonth[month] || 0),
        netProfit: Math.round((revenueByMonth[month] || 0) - (expenseByMonth[month] || 0)),
      }));

    const totalCapitalReceived = contributions.reduce((s, c) => s + c.amountReceived, 0);
    const totalAssets = assets.reduce((s, a) => s + a.currentValue, 0);
    const totalPaidToInvestors = payouts.reduce((s, p) => s + p.payoutAmount, 0);

    let totalOutstanding = 0;
    for (const investor of investors) {
      if (investor.status === "Withdrawn" || investor.status === "Defaulted") continue;
      if (investor.investmentModel === "Loan") {
        const loan = loanModel(
          investor.investmentAmount,
          investor.interestRate ?? 0,
          investor.repaymentPeriodMonths ?? 0,
          (investor.repaymentFrequency as RepaymentFrequency) ?? "Monthly",
          investor.investmentDate,
        );
        totalOutstanding += Math.max(0, loan.totalRepayment - investor.totalPaidToDate);
      } else {
        totalOutstanding += Math.max(
          0,
          investor.investmentAmount - (investor.principalRecovered || 0),
        );
      }
    }

    return {
      timeline,
      expenseByCategory,
      totalRevenue: Object.values(revenueByMonth).reduce((s, n) => s + n, 0),
      totalExpenses: Object.values(expenseByMonth).reduce((s, n) => s + n, 0),
      totalNetProfit:
        Object.values(revenueByMonth).reduce((s, n) => s + n, 0) -
        Object.values(expenseByMonth).reduce((s, n) => s + n, 0),
      totalCapitalReceived,
      totalAssets,
      totalPaidToInvestors,
      totalOutstanding,
      netWorth: totalAssets - totalOutstanding,
      investorCount: investors.filter((i) => i.status === "Active").length,
    };
  },
});
