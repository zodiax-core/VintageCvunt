"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";

function getCnicKey(): Buffer {
  const hex = process.env.INVESTOR_CNIC_KEY;
  if (!hex || hex.length < 64) {
    throw new Error(
      "INVESTOR_CNIC_KEY is not configured. Set it in the Convex dashboard (Settings > Environment Variables).",
    );
  }
  return Buffer.from(hex, "hex");
}

export const encryptCnic = internalAction({
  args: { plain: v.string() },
  handler: async (_ctx, args) => {
    const key = getCnicKey();
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([cipher.update(args.plain, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, encrypted]).toString("base64");
  },
});

export const decryptCnic = internalAction({
  args: { payload: v.string() },
  handler: async (_ctx, args) => {
    const key = getCnicKey();
    const buf = Buffer.from(args.payload, "base64");
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(12, 28);
    const data = buf.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
  },
});

export const hashCnic = internalAction({
  args: { plain: v.string() },
  handler: async (_ctx, args) => {
    const key = getCnicKey();
    return createHmac("sha256", key).update(args.plain).digest("hex");
  },
});
