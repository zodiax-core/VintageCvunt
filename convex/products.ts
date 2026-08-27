import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAdmin } from "./admin";

async function resolveImages(ctx: any, images: string[]): Promise<string[]> {
  const resolved: string[] = [];
  for (const id of images) {
    if (!id) continue;
    const url = await ctx.storage.getUrl(id as any);
    resolved.push(url ?? id);
  }
  return resolved;
}

async function enrichProduct(ctx: any, product: any) {
  if (!product) return null;
  const imageUrls = await resolveImages(ctx, product.images ?? []);
  
  // Resolve variant images
  let variants = product.variants;
  if (variants) {
    variants = await Promise.all(
      variants.map(async (v: any) => {
        const imageUrl = v.image ? await ctx.storage.getUrl(v.image as any) : undefined;
        return { ...v, imageUrl };
      })
    );
  }
  
  return {
    ...product,
    imageUrls,
    variants,
    videoUrl: product.video ? await ctx.storage.getUrl(product.video as any) : undefined,
  };
}

async function enrichProducts(ctx: any, products: any[]) {
  return Promise.all(products.map((p) => enrichProduct(ctx, p)));
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").order("desc").collect();
    return await enrichProducts(ctx, products);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return await enrichProduct(ctx, product);
  },
});

export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    return await enrichProduct(ctx, product);
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
    return await enrichProducts(ctx, products);
  },
});

export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
    return await enrichProducts(ctx, products);
  },
});

export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const products = await ctx.db.query("products").collect();
    const q = args.query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    return await enrichProducts(ctx, filtered);
  },
});

export const create = mutation({
  args: {
    sessionToken: v.string(),
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
    variants: v.optional(v.array(v.object({
      name: v.string(),
      image: v.optional(v.string()),
      price: v.optional(v.number()),
      stock: v.optional(v.number()),
    }))),
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
    await requireAdmin(ctx, args.sessionToken);
    const { sessionToken, ...fields } = args;
    const now = Date.now();
    return await ctx.db.insert("products", {
      ...fields,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("products"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    compareAtPrice: v.optional(v.number()),
    images: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    subcategory: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    sizes: v.optional(v.array(v.string())),
    colors: v.optional(v.array(v.string())),
    variants: v.optional(v.array(v.object({
      name: v.string(),
      image: v.optional(v.string()),
      price: v.optional(v.number()),
      stock: v.optional(v.number()),
    }))),
    material: v.optional(v.string()),
    careInstructions: v.optional(v.string()),
    details: v.optional(v.string()),
    dimensions: v.optional(v.string()),
    video: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    inStock: v.optional(v.boolean()),
    stockCount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const { sessionToken, id, ...fields } = args;
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("products") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    return await ctx.storage.generateUploadUrl();
  },
});

export const generateCheckoutUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId as any);
  },
});
