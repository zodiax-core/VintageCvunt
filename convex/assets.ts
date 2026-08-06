import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAdmin } from "./admin";
import { ASSET_CATEGORIES } from "./models";

const CATEGORIES = new Set<string>(ASSET_CATEGORIES);

export const list = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    return await ctx.db.query("assets").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    sessionToken: v.string(),
    name: v.string(),
    category: v.string(),
    purchaseDate: v.number(),
    purchaseValue: v.number(),
    currentValue: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    if (args.name.trim().length < 2) throw new Error("Asset name is required.");
    if (!CATEGORIES.has(args.category)) throw new Error("Invalid category.");
    if (!(typeof args.purchaseValue === "number") || args.purchaseValue < 0)
      throw new Error("Purchase value cannot be negative.");
    if (!(typeof args.currentValue === "number") || args.currentValue < 0)
      throw new Error("Current value cannot be negative.");
    await ctx.db.insert("assets", {
      name: args.name.trim(),
      category: args.category,
      purchaseDate: args.purchaseDate,
      purchaseValue: args.purchaseValue,
      currentValue: args.currentValue,
      note: args.note ? args.note.trim() : undefined,
      createdBy: admin.email,
      createdAt: Date.now(),
    });
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "create",
      targetType: "asset",
      targetId: args.name.trim(),
      changes: JSON.stringify({ category: args.category, value: args.currentValue }),
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("assets"),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    currentValue: v.optional(v.number()),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const asset = await ctx.db.get(args.id);
    if (!asset) throw new Error("Asset not found.");
    const safe: Record<string, unknown> = {};
    if (args.name !== undefined) {
      if (args.name.trim().length < 2) throw new Error("Asset name is required.");
      safe.name = args.name.trim();
    }
    if (args.category !== undefined) {
      if (!CATEGORIES.has(args.category)) throw new Error("Invalid category.");
      safe.category = args.category;
    }
    if (args.currentValue !== undefined) {
      if (!(typeof args.currentValue === "number") || args.currentValue < 0)
        throw new Error("Current value cannot be negative.");
      safe.currentValue = args.currentValue;
    }
    if (args.note !== undefined) safe.note = args.note.trim() || undefined;
    await ctx.db.patch(args.id, safe);
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "update",
      targetType: "asset",
      targetId: args.id,
      changes: JSON.stringify(Object.keys(safe)),
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("assets") },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx, args.sessionToken);
    const asset = await ctx.db.get(args.id);
    if (!asset) throw new Error("Asset not found.");
    await ctx.db.delete(args.id);
    await ctx.db.insert("auditLogs", {
      actorEmail: admin.email,
      action: "delete",
      targetType: "asset",
      targetId: args.id,
      changes: JSON.stringify({ name: asset.name }),
      createdAt: Date.now(),
    });
  },
});
