import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("featuredProducts").collect();
    return all[0] ?? null;
  },
});

export const set = mutation({
  args: {
    productIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("featuredProducts").collect();
    if (all.length > 0) {
      await ctx.db.patch(all[0]._id, { productIds: args.productIds, updatedAt: Date.now() });
      return all[0]._id;
    }
    return await ctx.db.insert("featuredProducts", {
      productIds: args.productIds,
      updatedAt: Date.now(),
    });
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
