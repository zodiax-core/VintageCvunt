import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAdmin } from "./admin";

export const list = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    return await ctx.db.query("reviews").order("desc").collect();
  },
});

export const getByProductId = query({
  args: { productId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("by_productId", (q) => q.eq("productId", args.productId))
      .filter((q) => q.eq(q.field("status"), "Approved"))
      .collect();
  },
});

export const getByCustomerEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .filter((q) => q.eq(q.field("customerEmail"), args.email.toLowerCase().trim()))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    productId: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    rating: v.number(),
    title: v.optional(v.string()),
    comment: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reviews", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("reviews"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("reviews") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    await ctx.db.delete(args.id);
  },
});
