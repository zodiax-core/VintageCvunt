import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const insertProduct = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    price: v.number(),
    compareAtPrice: v.optional(v.number()),
    images: v.array(v.string()),
    category: v.string(),
    subcategory: v.optional(v.string()),
    tags: v.array(v.string()),
    sizes: v.array(v.string()),
    colors: v.array(v.string()),
    material: v.optional(v.string()),
    careInstructions: v.optional(v.string()),
    details: v.optional(v.string()),
    dimensions: v.optional(v.string()),
    video: v.optional(v.string()),
    featured: v.boolean(),
    inStock: v.boolean(),
    stockCount: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if product with slug already exists
    const existing = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      // Append new images and video if missing
      const images = Array.from(new Set([...existing.images, ...args.images]));
      const video = existing.video || args.video;
      await ctx.db.patch(existing._id, {
        images,
        video,
        stockCount: 100,
        inStock: true,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    const now = Date.now();
    return await ctx.db.insert("products", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
