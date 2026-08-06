import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAdmin } from "./admin";
import { EXPENSE_CATEGORIES } from "./models";

const CATEGORIES = new Set<string>(EXPENSE_CATEGORIES);

export const list = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    return await ctx.db.query("expenses").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    sessionToken: v.string(),
    title: v.string(),
    category: v.string(),
    amount: v.number(),
    expenseDate: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    if (args.title.trim().length < 2) throw new Error("Title is required.");
    if (!CATEGORIES.has(args.category)) throw new Error("Invalid category.");
    if (!(typeof args.amount === "number") || args.amount < 0)
      throw new Error("Amount cannot be negative.");
    await ctx.db.insert("expenses", {
      title: args.title.trim(),
      category: args.category,
      amount: args.amount,
      expenseDate: args.expenseDate,
      note: args.note ? args.note.trim() : undefined,
      createdBy: admin.email,
      createdAt: Date.now(),
    });
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "create",
      targetType: "expense",
      targetId: args.title.trim(),
      changes: JSON.stringify({ category: args.category, amount: args.amount }),
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("expenses") },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const expense = await ctx.db.get(args.id);
    if (!expense) throw new Error("Expense not found.");
    await ctx.db.delete(args.id);
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "delete",
      targetType: "expense",
      targetId: args.id,
      changes: JSON.stringify({ title: expense.title, amount: expense.amount }),
      createdAt: Date.now(),
    });
  },
});
