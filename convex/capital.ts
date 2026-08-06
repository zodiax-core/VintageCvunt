import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAdmin } from "./admin";
import { CAPITAL_METHODS } from "./models";

const METHODS = new Set<string>(CAPITAL_METHODS);

export const list = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const contributions = await ctx.db.query("capitalContributions").order("desc").collect();
    const investors = await ctx.db.query("investors").collect();
    const nameById = new Map(investors.map((i) => [i._id, i.fullName]));
    return contributions.map((c) => ({
      ...c,
      investorName: nameById.get(c.investorId) ?? "Unknown",
      investorStatus: investors.find((i) => i._id === c.investorId)?.status ?? "Unknown",
    }));
  },
});

export const create = mutation({
  args: {
    sessionToken: v.string(),
    investorId: v.id("investors"),
    amountReceived: v.number(),
    receivedDate: v.number(),
    method: v.string(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const investor = await ctx.db.get(args.investorId);
    if (!investor) throw new Error("Investor not found.");
    if (!(typeof args.amountReceived === "number") || args.amountReceived <= 0)
      throw new Error("Amount must be greater than 0.");
    if (!METHODS.has(args.method)) throw new Error("Invalid payment method.");
    await ctx.db.insert("capitalContributions", {
      investorId: args.investorId,
      amountReceived: args.amountReceived,
      receivedDate: args.receivedDate,
      method: args.method,
      note: args.note ? args.note.trim() : undefined,
      createdAt: Date.now(),
    });
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "create",
      targetType: "capital-contribution",
      targetId: args.investorId,
      changes: JSON.stringify({ amount: args.amountReceived, method: args.method }),
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("capitalContributions") },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const contribution = await ctx.db.get(args.id);
    if (!contribution) throw new Error("Contribution not found.");
    await ctx.db.delete(args.id);
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "delete",
      targetType: "capital-contribution",
      targetId: args.id,
      changes: JSON.stringify({ amount: contribution.amountReceived }),
      createdAt: Date.now(),
    });
  },
});
