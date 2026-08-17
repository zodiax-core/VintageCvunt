import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { requireAdmin } from "./admin";

export const list = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    return await ctx.db.query("orders").order("desc").collect();
  },
});

export const getById = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id);
    if (!order) return null;
    if (order.screenshot) {
      const screenshotUrl = await ctx.storage.getUrl(order.screenshot as any);
      return { ...order, screenshot: screenshotUrl };
    }
    return order;
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("customerEmail", args.email))
      .collect();
  },
});

export const getByOrderNumber = query({
  args: { orderNumber: v.string() },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("orderNumber"), args.orderNumber))
      .collect();
    return orders[0] || null;
  },
});

export const getByCustomerId = query({
  args: { customerId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("customerId"), args.customerId))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    orderNumber: v.string(),
    customerId: v.optional(v.string()),
    customerName: v.string(),
    customerEmail: v.string(),
    phone: v.optional(v.string()),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        size: v.optional(v.string()),
        color: v.optional(v.string()),
        image: v.optional(v.string()),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    discount: v.optional(v.number()),
    couponCode: v.optional(v.string()),
    total: v.number(),
    status: v.string(),
    paymentMethod: v.string(),
    billingAddress: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
    shippingAddress: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
    screenshot: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const orderId = await ctx.db.insert("orders", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    if (args.customerId) {
      const customer = await ctx.db
        .query("customers")
        .filter((q) => q.eq(q.field("_id"), args.customerId!))
        .first();
      if (customer) {
        await ctx.db.patch(customer._id, {
          totalOrders: (customer.totalOrders || 0) + 1,
          totalSpent: (customer.totalSpent || 0) + args.total,
          updatedAt: now,
        });
      }
    }

    // Send order confirmation email
    // @ts-ignore: Stale convex types might type internal.email.sendOrderConfirmation as {}
    await ctx.scheduler.runAfter(0, internal.email.sendOrderConfirmation, {
      email: args.customerEmail,
      customerName: args.customerName,
      orderNumber: args.orderNumber,
      items: args.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color,
        image: item.image,
      })),
      subtotal: args.subtotal,
      shipping: args.shipping,
      tax: args.tax,
      total: args.total,
      status: args.status,
      shippingAddress: args.shippingAddress,
    });

    return orderId;
  },
});

export const update = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("orders"),
    status: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const { sessionToken, id, ...fields } = args;
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("orders") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    await ctx.db.delete(args.id);
  },
});

export const getStats = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const orders = await ctx.db.query("orders").collect();
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    return { totalRevenue, totalOrders, pendingOrders, averageOrderValue };
  },
});

export const getRevenueByMonth = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const orders = await ctx.db.query("orders").collect();
    const byMonth: Record<string, number> = {};
    for (const order of orders) {
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      byMonth[key] = (byMonth[key] || 0) + order.total;
    }
    return Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, revenue]) => ({ month, revenue }));
  },
});
