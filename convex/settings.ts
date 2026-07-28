import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").first();
    return settings ?? null;
  },
});

export const upsert = mutation({
  args: {
    storeName: v.string(),
    storeEmail: v.string(),
    currency: v.string(),
    timezone: v.string(),
    defaultTaxRate: v.number(),
    taxInclusive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("settings").first();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: Date.now() });
      return existing._id;
    }
    return await ctx.db.insert("settings", { ...args, updatedAt: Date.now() });
  },
});
