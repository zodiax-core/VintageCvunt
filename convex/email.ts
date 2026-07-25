import { internalAction } from "./_generated/server";
import { v } from "convex/values";

// ─── Order Confirmation via EmailJS ──────────────────────────────────────────
// Template variables used:
//   {{order_id}}         → order number string
//   {{orders}}           → array of items: {{name}}, {{units}}, {{price}}, {{image}}
//   {{cost.shipping}}    → formatted shipping cost
//   {{cost.tax}}         → formatted tax
//   {{cost.total}}       → formatted total
//   {{email}}            → customer email

export const sendOrderConfirmation = internalAction({
  args: {
    email: v.string(),
    customerName: v.string(),
    orderNumber: v.string(),
    items: v.array(
      v.object({
        name: v.string(),
        quantity: v.number(),
        price: v.number(),
        size: v.optional(v.string()),
        color: v.optional(v.string()),
        image: v.optional(v.string()),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    total: v.number(),
    status: v.string(),
    shippingAddress: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
  },
  handler: async (_ctx, args) => {
    const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const EMAILJS_ORDER_TEMPLATE_ID = process.env.EMAILJS_ORDER_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_ORDER_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn("⚠️ EmailJS credentials not set. Order confirmation email skipped.");
      console.log(`[Mock Email] Order ${args.orderNumber} confirmed for ${args.email}`);
      return { success: false, reason: "Missing EmailJS credentials" };
    }

    const orders = args.items.map((item) => ({
      name: item.name + (item.size ? ` (${item.size})` : "") + (item.color ? ` — ${item.color}` : ""),
      units: item.quantity,
      price: item.price.toFixed(2),
      image: item.image || "",
    }));

    const templateParams = {
      email: args.email,
      customer_name: args.customerName,
      order_id: args.orderNumber,
      orders,
      cost: {
        shipping: args.shipping === 0 ? "Free" : `$${args.shipping.toFixed(2)}`,
        tax: `$${args.tax.toFixed(2)}`,
        total: `$${args.total.toFixed(2)}`,
      },
      shipping_street: args.shippingAddress.street,
      shipping_city: args.shippingAddress.city,
      shipping_state: args.shippingAddress.state,
      shipping_zip: args.shippingAddress.zip,
      shipping_country: args.shippingAddress.country,
    };

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_ORDER_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: templateParams,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("[EmailJS] Order Confirmation API error:", err);
        return { success: false, reason: `EmailJS error: ${err}` };
      }

      console.log(`[EmailJS] Order confirmation sent to ${args.email} — order ${args.orderNumber}`);
      return { success: true };
    } catch (error: any) {
      console.error("[EmailJS] Fetch error:", error.message);
      return { success: false, reason: error.message };
    }
  },
});

// ─── Verification Code / OTP via EmailJS ──────────────────────────────────────
// Template variables used:
//   {{email}}            → customer email
//   {{passcode}}         → OTP code
//   {{time}}             → e.g., "15 minutes"

export const sendVerificationCode = internalAction({
  args: {
    email: v.string(),
    passcode: v.string(),
    time: v.string(),
  },
  handler: async (_ctx, args) => {
    const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const EMAILJS_VERIFICATION_TEMPLATE_ID = process.env.EMAILJS_VERIFICATION_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_VERIFICATION_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn("⚠️ EmailJS credentials not set for verification. Code email skipped.");
      console.log(`[Mock Email] OTP for ${args.email} is ${args.passcode} (valid for ${args.time})`);
      return { success: false, reason: "Missing EmailJS credentials" };
    }

    const templateParams = {
      email: args.email,
      passcode: args.passcode,
      time: args.time,
    };

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_VERIFICATION_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: templateParams,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("[EmailJS] Verification API error:", err);
        return { success: false, reason: `EmailJS error: ${err}` };
      }

      console.log(`[EmailJS] Verification code sent to ${args.email}`);
      return { success: true };
    } catch (error: any) {
      console.error("[EmailJS] Fetch error:", error.message);
      return { success: false, reason: error.message };
    }
  },
});
