import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("coupons").order("desc").collect();
  },
});

export const getByCode = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("coupons")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();
  },
});

export const create = mutation({
  args: {
    code: v.string(),
    type: v.string(),
    value: v.number(),
    minPurchase: v.optional(v.number()),
    maxUses: v.optional(v.number()),
    usedCount: v.number(),
    expiresAt: v.number(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("coupons", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("coupons"),
    code: v.optional(v.string()),
    type: v.optional(v.string()),
    value: v.optional(v.number()),
    minPurchase: v.optional(v.number()),
    maxUses: v.optional(v.number()),
    usedCount: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("coupons") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const validateCoupon = query({
  args: { code: v.string(), subtotal: v.number() },
  handler: async (ctx, args) => {
    const coupon = await ctx.db
      .query("coupons")
      .withIndex("by_code", (q) => q.eq("code", args.code.toUpperCase()))
      .first();
    if (!coupon) return { valid: false, reason: "Coupon not found" };
    if (!coupon.isActive) return { valid: false, reason: "Coupon is inactive" };
    if (Date.now() > coupon.expiresAt) return { valid: false, reason: "Coupon has expired" };
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return { valid: false, reason: "Coupon usage limit reached" };
    if (coupon.minPurchase && args.subtotal < coupon.minPurchase) return { valid: false, reason: `Minimum purchase of $${coupon.minPurchase} required` };
    let discountAmount = 0;
    if (coupon.type === "percentage") discountAmount = Math.round(args.subtotal * (coupon.value / 100) * 100) / 100;
    else if (coupon.type === "fixed") discountAmount = coupon.value;
    if (discountAmount > args.subtotal) discountAmount = args.subtotal;
    return {
      valid: true,
      coupon: {
        _id: coupon._id,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discountAmount,
      },
    };
  },
});
