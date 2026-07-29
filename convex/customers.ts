import { v } from "convex/values";
import { query, mutation, action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

async function hashPassword(password: string, salt?: string): Promise<{ hash: string; salt: string }> {
  const encoder = new TextEncoder();
  let saltString: string;
  if (salt) {
    saltString = salt;
  } else {
    const saltBytes = crypto.getRandomValues(new Uint8Array(16));
    saltString = Array.from(saltBytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: encoder.encode(saltString), iterations: 100000, hash: "SHA-512" },
    key,
    256,
  );
  const hash = Array.from(new Uint8Array(derived)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return { hash, salt: saltString };
}

function sanitize(str: string): string {
  return str.trim().replace(/[<>]/g, "");
}

const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

function isLocked(customer: { loginAttempts: number; lockedUntil?: number }): boolean {
  if (customer.lockedUntil && customer.lockedUntil > Date.now()) return true;
  return false;
}

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
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase().trim()))
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
    avatar: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const isAdmin = args.email.toLowerCase().trim() === "zodiaxcore@gmail.com";
    return await ctx.db.insert("customers", {
      ...args,
      role: args.role || (isAdmin ? "admin" : "customer"),
      loginAttempts: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const registerCustomer = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();
    const safeName = sanitize(args.name);

    if (!normalizedEmail) throw new Error("Email is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) throw new Error("Invalid email format.");
    if (safeName.length < 1) throw new Error("Name is required.");
    if (args.password.length < 8) throw new Error("Password must be at least 8 characters.");

    const existing = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      throw new Error("Email is already registered. Please sign in.");
    }

    const isAdmin = normalizedEmail === "zodiaxcore@gmail.com";
    const role = isAdmin ? "admin" : "customer";
    const now = Date.now();
    const { hash, salt } = await hashPassword(args.password);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = now + 15 * 60 * 1000;
    const isEmailVerified = isAdmin;

    const newId = await ctx.db.insert("customers", {
      name: safeName,
      email: normalizedEmail,
      passwordHash: hash,
      passwordSalt: salt,
      loginAttempts: 0,
      totalOrders: 0,
      totalSpent: 0,
      status: "Active",
      role,
      isEmailVerified,
      otp: isAdmin ? undefined : otp,
      otpExpiresAt: isAdmin ? undefined : otpExpiresAt,
      createdAt: now,
      updatedAt: now,
    });

    return {
      _id: newId,
      name: safeName,
      email: normalizedEmail,
      role,
      isEmailVerified,
      otp: isAdmin ? undefined : otp,
    };
  },
});

export const register = action({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runMutation(internal.customers.registerCustomer, args);

    if (!user.isEmailVerified && user.otp) {
      const emailResult = await ctx.runAction(internal.email.sendVerificationCode, {
        email: user.email,
        passcode: user.otp,
        time: "15 minutes",
      });

      if (!emailResult.success) {
        throw new Error(emailResult.reason || "Failed to send verification email. Please try resending the code.");
      }
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };
  },
});

export const verifyEmail = mutation({
  args: {
    email: v.string(),
    otp: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();
    if (!normalizedEmail) throw new Error("Email is required.");
    if (!args.otp) throw new Error("OTP is required.");

    const existing = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!existing) {
      throw new Error("No account found with this email.");
    }

    if (existing.isEmailVerified) {
      return {
        _id: existing._id,
        name: existing.name,
        email: existing.email,
        role: existing.role || "customer",
      };
    }

    if (existing.otp !== args.otp) {
      throw new Error("Invalid verification code.");
    }

    if (existing.otpExpiresAt && existing.otpExpiresAt < Date.now()) {
      throw new Error("Verification code has expired. Please resend code.");
    }

    await ctx.db.patch(existing._id, {
      isEmailVerified: true,
      otp: undefined,
      otpExpiresAt: undefined,
      updatedAt: Date.now(),
    });

    return {
      _id: existing._id,
      name: existing.name,
      email: existing.email,
      role: existing.role || "customer",
    };
  },
});

export const prepareResendVerification = internalMutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();
    if (!normalizedEmail) throw new Error("Email is required.");

    const existing = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!existing) throw new Error("No account found with this email.");
    if (existing.isEmailVerified) throw new Error("Email is already verified.");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = Date.now() + 15 * 60 * 1000;

    await ctx.db.patch(existing._id, {
      otp,
      otpExpiresAt,
      updatedAt: Date.now(),
    });

    return { email: normalizedEmail, otp };
  },
});

export const resendVerification = action({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const { email, otp } = await ctx.runMutation(internal.customers.prepareResendVerification, args);

    const emailResult = await ctx.runAction(internal.email.sendVerificationCode, {
      email,
      passcode: otp,
      time: "15 minutes",
    });

    if (!emailResult.success) {
      throw new Error(emailResult.reason || "Failed to resend verification email.");
    }

    return { success: true };
  },
});

export const authenticate = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();

    if (!normalizedEmail) throw new Error("Email is required.");
    if (!args.password) throw new Error("Password is required.");

    const existing = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    const isAdmin = normalizedEmail === "zodiaxcore@gmail.com";

    if (!existing) {
      throw new Error("Invalid email or password.");
    }

    if (isLocked(existing)) {
      const remaining = Math.ceil((existing.lockedUntil! - Date.now()) / 60000);
      throw new Error(`Account temporarily locked. Try again in ${remaining} minute(s).`);
    }

    if (!existing.passwordHash || !existing.passwordSalt) {
      await ctx.db.patch(existing._id, {
        loginAttempts: (existing.loginAttempts || 0) + 1,
        lockedUntil: existing.loginAttempts + 1 >= LOCKOUT_THRESHOLD ? Date.now() + LOCKOUT_DURATION_MS : undefined,
        updatedAt: Date.now(),
      });
      throw new Error("Invalid email or password.");
    }

    const { hash } = await hashPassword(args.password, existing.passwordSalt);
    if (hash !== existing.passwordHash) {
      const attempts = (existing.loginAttempts || 0) + 1;
      const lockedUntil = attempts >= LOCKOUT_THRESHOLD ? Date.now() + LOCKOUT_DURATION_MS : undefined;
      await ctx.db.patch(existing._id, {
        loginAttempts: attempts,
        lockedUntil,
        updatedAt: Date.now(),
      });
      const remaining = LOCKOUT_THRESHOLD - attempts;
      if (remaining <= 0) throw new Error("Account locked due to too many failed attempts. Try again in 15 minutes.");
      throw new Error("Invalid email or password.");
    }

    if (!existing.isEmailVerified) {
      // User must verify their email before fully logging in
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = Date.now() + 15 * 60 * 1000;
      await ctx.db.patch(existing._id, {
        otp,
        otpExpiresAt,
        updatedAt: Date.now(),
      });
      // @ts-ignore
      await ctx.scheduler.runAfter(0, internal.email.sendVerificationCode, {
        email: normalizedEmail,
        passcode: otp,
        time: "15 minutes",
      });
      return { needsVerification: true, email: normalizedEmail };
    }

    await ctx.db.patch(existing._id, {
      loginAttempts: 0,
      lockedUntil: undefined,
      updatedAt: Date.now(),
    });

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
    const safe: Record<string, unknown> = { updatedAt: Date.now() };
    if (fields.name !== undefined) safe.name = sanitize(fields.name);
    if (fields.email !== undefined) safe.email = fields.email.toLowerCase().trim();
    if (fields.phone !== undefined) safe.phone = fields.phone.trim();
    if (fields.address !== undefined) safe.address = fields.address.trim();
    if (fields.totalOrders !== undefined) safe.totalOrders = fields.totalOrders;
    if (fields.totalSpent !== undefined) safe.totalSpent = fields.totalSpent;
    if (fields.status !== undefined) safe.status = fields.status;
    if (fields.avatar !== undefined) safe.avatar = fields.avatar;
    if (fields.notes !== undefined) safe.notes = fields.notes;
    await ctx.db.patch(id, safe);
  },
});

export const updateProfile = mutation({
  args: {
    id: v.id("customers"),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const safe: Record<string, unknown> = { updatedAt: Date.now() };
    if (fields.name !== undefined) {
      const n = sanitize(fields.name);
      if (n.length < 1) throw new Error("Name cannot be empty.");
      safe.name = n;
    }
    if (fields.phone !== undefined) safe.phone = fields.phone.trim();
    if (fields.address !== undefined) safe.address = fields.address.trim();
    await ctx.db.patch(id, safe);
  },
});

export const updatePassword = mutation({
  args: {
    id: v.id("customers"),
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.newPassword.length < 8) throw new Error("New password must be at least 8 characters.");

    const customer = await ctx.db.get(args.id);
    if (!customer) throw new Error("Customer not found.");

    if (!customer.passwordHash || !customer.passwordSalt) {
      throw new Error("No password set. Please contact support.");
    }

    const { hash } = await hashPassword(args.currentPassword, customer.passwordSalt);
    if (hash !== customer.passwordHash) {
      throw new Error("Current password is incorrect.");
    }

    if (args.currentPassword === args.newPassword) {
      throw new Error("New password must be different from current password.");
    }

    const { hash: newHash, salt: newSalt } = await hashPassword(args.newPassword);
    await ctx.db.patch(args.id, {
      passwordHash: newHash,
      passwordSalt: newSalt,
      loginAttempts: 0,
      lockedUntil: undefined,
      updatedAt: Date.now(),
    });
  },
});

export const preparePasswordReset = internalMutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();
    if (!normalizedEmail) throw new Error("Email is required.");

    const customer = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!customer) {
      return { email: normalizedEmail, otp: undefined };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = Date.now() + 15 * 60 * 1000;

    await ctx.db.patch(customer._id, {
      otp,
      otpExpiresAt,
      updatedAt: Date.now(),
    });

    return { email: normalizedEmail, otp };
  },
});

export const requestPasswordReset = action({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const { email, otp } = await ctx.runMutation(internal.customers.preparePasswordReset, args);

    if (otp) {
      const emailResult = await ctx.runAction(internal.email.sendVerificationCode, {
        email,
        passcode: otp,
        time: "15 minutes",
      });

      if (!emailResult.success) {
        throw new Error(emailResult.reason || "Failed to send password reset email.");
      }
    }

    return { success: true };
  },
});

export const resetPassword = mutation({
  args: {
    email: v.string(),
    otp: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();
    if (!normalizedEmail) throw new Error("Email is required.");
    if (!args.otp) throw new Error("OTP is required.");
    if (args.newPassword.length < 8) throw new Error("New password must be at least 8 characters.");

    const customer = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!customer) throw new Error("Invalid request.");

    if (customer.otp !== args.otp) {
      throw new Error("Invalid reset code.");
    }

    if (customer.otpExpiresAt && customer.otpExpiresAt < Date.now()) {
      throw new Error("Reset code has expired. Please request a new one.");
    }

    const { hash, salt } = await hashPassword(args.newPassword);

    await ctx.db.patch(customer._id, {
      passwordHash: hash,
      passwordSalt: salt,
      otp: undefined,
      otpExpiresAt: undefined,
      loginAttempts: 0,
      lockedUntil: undefined,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

export const remove = mutation({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
