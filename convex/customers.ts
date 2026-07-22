import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("customers").order("desc").collect();
  },
});

export const getById = query({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    totalOrders: v.number(),
    totalSpent: v.number(),
    status: v.string(),
    role: v.optional(v.string()),
    password: v.optional(v.string()),
    avatar: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const isAdmin = args.email.toLowerCase() === "zodiaxcore@gmail.com";
    return await ctx.db.insert("customers", {
      ...args,
      role: args.role || (isAdmin ? "admin" : "customer"),
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();
    const existing = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    const isAdmin = normalizedEmail === "zodiaxcore@gmail.com";
    const role = isAdmin ? "admin" : "customer";
    const now = Date.now();

    if (existing) {
      // Update existing customer record with password and admin role if applicable
      await ctx.db.patch(existing._id, {
        name: args.name || existing.name,
        password: args.password,
        role: isAdmin ? "admin" : (existing.role || "customer"),
        updatedAt: now,
      });
      return {
        _id: existing._id,
        name: args.name || existing.name,
        email: normalizedEmail,
        role: isAdmin ? "admin" : (existing.role || "customer"),
      };
    }

    const newId = await ctx.db.insert("customers", {
      name: args.name,
      email: normalizedEmail,
      password: args.password,
      totalOrders: 0,
      totalSpent: 0,
      status: "Active",
      role,
      createdAt: now,
      updatedAt: now,
    });

    return {
      _id: newId,
      name: args.name,
      email: normalizedEmail,
      role,
    };
  },
});

export const authenticate = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();
    const existing = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    const isAdmin = normalizedEmail === "zodiaxcore@gmail.com";

    if (!existing) {
      throw new Error("No account found with this email. Please register first.");
    }

    if (existing.password && existing.password !== args.password) {
      throw new Error("Incorrect password. Please try again.");
    }

    // Ensure role is updated to admin if it's zodiaxcore@gmail.com
    if (isAdmin && existing.role !== "admin") {
      await ctx.db.patch(existing._id, { role: "admin", updatedAt: Date.now() });
    }

    return {
      _id: existing._id,
      name: existing.name,
      email: existing.email,
      role: isAdmin ? "admin" : (existing.role || "customer"),
    };
  },
});

export const update = mutation({
  args: {
    id: v.id("customers"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    totalOrders: v.optional(v.number()),
    totalSpent: v.optional(v.number()),
    status: v.optional(v.string()),
    avatar: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
