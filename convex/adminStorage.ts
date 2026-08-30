import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const getAllUsedStorageIds = internalQuery({
  args: {},
  handler: async (ctx) => {
    const usedIds = new Set<string>();

    // Products
    const products = await ctx.db.query("products").collect();
    for (const p of products) {
      if (p.images) p.images.forEach((id: string) => usedIds.add(id));
      if (p.video) usedIds.add(p.video);
      if (p.variants) {
        for (const variant of p.variants) {
          if (variant.image) usedIds.add(variant.image);
        }
      }
    }

    // Orders
    const orders = await ctx.db.query("orders").collect();
    for (const o of orders) {
      if (o.screenshot) usedIds.add(o.screenshot);
      if (o.items) {
        for (const item of o.items) {
          if (item.image) usedIds.add(item.image);
        }
      }
    }

    // Collections
    const collections = await ctx.db.query("collections").collect();
    for (const c of collections) {
      if (c.image) usedIds.add(c.image);
    }

    // Customers
    const customers = await ctx.db.query("customers").collect();
    for (const c of customers) {
      if (c.avatar) usedIds.add(c.avatar);
    }

    return Array.from(usedIds);
  },
});

export const deleteStorageBulk = internalMutation({
  args: { ids: v.array(v.id("_storage")) },
  handler: async (ctx, args) => {
    let deleted = 0;
    for (const id of args.ids) {
      try {
        await ctx.storage.delete(id);
        deleted++;
      } catch (e) {
        console.error(`Failed to delete storage id ${id}`, e);
      }
    }
    return deleted;
  },
});
