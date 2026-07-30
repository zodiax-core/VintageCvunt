import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

async function enrichCollection(ctx: any, collection: any) {
  if (!collection) return null;
  let imageUrl: string | undefined;
  if (collection.image) {
    const url = await ctx.storage.getUrl(collection.image as any);
    if (url) imageUrl = url;
  }
  return {
    ...collection,
    imageUrl,
  };
}

async function enrichCollections(ctx: any, collections: any[]) {
  return Promise.all(collections.map((c) => enrichCollection(ctx, c)));
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const collections = await ctx.db.query("collections").collect();
    return await enrichCollections(ctx, collections);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const collection = await ctx.db
      .query("collections")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return await enrichCollection(ctx, collection);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    productIds: v.array(v.string()),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("collections", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("collections"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    productIds: v.optional(v.array(v.string())),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("collections") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getByName = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("collections")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
  },
});

export const addProductToCollection = mutation({
  args: { category: v.string(), productId: v.string() },
  handler: async (ctx, args) => {
    const collection = await ctx.db
      .query("collections")
      .filter((q) => q.eq(q.field("name"), args.category))
      .first();
    if (!collection) return;
    const ids = new Set(collection.productIds);
    ids.add(args.productId);
    await ctx.db.patch(collection._id, { productIds: Array.from(ids) });
  },
});

export const removeProductFromCollection = mutation({
  args: { category: v.string(), productId: v.string() },
  handler: async (ctx, args) => {
    const collection = await ctx.db
      .query("collections")
      .filter((q) => q.eq(q.field("name"), args.category))
      .first();
    if (!collection) return;
    const ids = collection.productIds.filter((id) => id !== args.productId);
    await ctx.db.patch(collection._id, { productIds: ids });
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
