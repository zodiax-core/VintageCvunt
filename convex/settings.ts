import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAdmin } from "./admin";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").first();
    return settings ?? null;
  },
});

export const upsert = mutation({
  args: {
    sessionToken: v.string(),
    storeName: v.string(),
    storeEmail: v.string(),
    currency: v.string(),
    timezone: v.string(),
    defaultTaxRate: v.number(),
    taxInclusive: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const { sessionToken, ...fields } = args;
    const existing = await ctx.db.query("settings").first();
    if (existing) {
      await ctx.db.patch(existing._id, { ...fields, updatedAt: Date.now() });
      return existing._id;
    }
    return await ctx.db.insert("settings", { ...fields, updatedAt: Date.now() });
  },
});
