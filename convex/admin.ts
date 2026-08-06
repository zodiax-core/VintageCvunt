import { v } from "convex/values";
import { internalMutation, internalQuery, mutation } from "./_generated/server";
import type { QueryCtx } from "./_generated/server";

export const ADMIN_EMAILS = new Set(["zodiaxcore@gmail.com", "vintagecvunt@gmail.com"]);

export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.has(email.toLowerCase().trim());
}

export function isAdminCustomer(
  customer: { role?: string; email: string } | null | undefined,
): customer is { role?: string; email: string } {
  if (!customer) return false;
  return customer.role === "admin" || isAdminEmail(customer.email);
}

export function generateSessionToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function requireAdmin(
  ctx: Pick<QueryCtx, "db">,
  sessionToken?: string,
): Promise<{ email: string; name: string }> {
  if (!sessionToken || typeof sessionToken !== "string" || sessionToken.length < 40) {
    throw new Error("Unauthorized.");
  }
  const tokenHash = await sha256Hex(sessionToken);
  const session = await ctx.db
    .query("adminSessions")
    .withIndex("by_tokenHash", (q) => q.eq("tokenHash", tokenHash))
    .first();
  if (!session) throw new Error("Unauthorized.");
  if (session.expiresAt < Date.now()) throw new Error("Unauthorized.");
  const customer = await ctx.db.get(session.customerId);
  if (!isAdminCustomer(customer)) throw new Error("Unauthorized.");
  return { email: customer.email, name: customer.name };
}

export const checkSession = internalQuery({
  args: { sessionToken: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return await requireAdmin(ctx, args.sessionToken);
  },
});

export const issueSession = internalMutation({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    const token = generateSessionToken();
    const tokenHash = await sha256Hex(token);
    const now = Date.now();
    await ctx.db.insert("adminSessions", {
      customerId: args.customerId,
      tokenHash,
      createdAt: now,
      expiresAt: now + SESSION_DURATION_MS,
    });
    return token;
  },
});

export const revokeSession = mutation({
  args: { sessionToken: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.sessionToken) return;
    const tokenHash = await sha256Hex(args.sessionToken);
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_tokenHash", (q) => q.eq("tokenHash", tokenHash))
      .first();
    if (session) await ctx.db.delete(session._id);
  },
});
