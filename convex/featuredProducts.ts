import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAdmin } from "./admin";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("featuredProducts").collect();
    return all[0] ?? null;
  },
});

export const set = mutation({
  args: {
    sessionToken: v.string(),
    productIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
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
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    return await ctx.storage.generateUploadUrl();
  },
});
