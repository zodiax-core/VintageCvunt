import { internalAction } from "./_generated/server";
import { v } from "convex/values";

type EmailJSResult = { success: true } | { success: false; reason: string };

function getEmailJSCredentials() {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  console.log("[EmailJS] Checking credentials:", {
    hasServiceId: !!serviceId,
    hasPublicKey: !!publicKey,
    hasPrivateKey: !!privateKey,
  });

  return {
    serviceId,
    publicKey,
    privateKey,
  };
}

function explainEmailJSError(status: number, body: string): string {
  const normalized = body.toLowerCase();

  if (normalized.includes("non-browser")) {
    return (
      'EmailJS is blocking server-side requests. In EmailJS Dashboard → Account → Security, enable "Allow API requests from non-browser environments", then redeploy Convex.'
    );
  }

  if (normalized.includes("strict mode") && normalized.includes("private key")) {
    return (
      "EmailJS strict mode is on. Add your Private Key as EMAILJS_PRIVATE_KEY in Convex Dashboard → Settings → Environment Variables."
    );
  }

  if (normalized.includes("template")) {
    return `EmailJS template error: ${body}. Ensure your template uses {{email}}, {{passcode}}, and {{time}} variables.`;
  }

  return `EmailJS error (${status}): ${body}`;
}

async function sendViaEmailJS(options: {
  templateId: string | undefined;
  templateParams: Record<string, string | number | object>;
  logLabel: string;
}): Promise<EmailJSResult> {
  const { serviceId, publicKey, privateKey } = getEmailJSCredentials();

  console.log(`[EmailJS] Attempting to send: ${options.logLabel}`, {
    hasTemplateId: !!options.templateId,
    templateId: options.templateId?.substring(0, 8) + "...",
  });

  if (!serviceId || !options.templateId || !publicKey) {
    const missing = [
      !serviceId && "EMAILJS_SERVICE_ID",
      !options.templateId && "template ID env var",
      !publicKey && "EMAILJS_PUBLIC_KEY",
    ].filter(Boolean);

    console.warn(`⚠️ EmailJS credentials missing (${missing.join(", ")}). ${options.logLabel} skipped.`);
    return {
      success: false,
      reason: `Email is not configured. Missing in Convex env: ${missing.join(", ")}. Please set these in Convex Dashboard → Settings → Environment Variables.`,
    };
  }

  const payload: Record<string, unknown> = {
    service_id: serviceId,
    template_id: options.templateId,
    user_id: publicKey,
    template_params: options.templateParams,
  };

  if (privateKey) {
    payload.accessToken = privateKey;
  }

  try {
    console.log(`[EmailJS] Sending request to EmailJS API...`);
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await response.text();
    console.log(`[EmailJS] Response status: ${response.status}, body: ${body}`);

    if (!response.ok) {
      const reason = explainEmailJSError(response.status, body);
      console.error(`[EmailJS] ${options.logLabel} failed:`, reason);
      return { success: false, reason };
    }

    console.log(`[EmailJS] ${options.logLabel} sent successfully`);
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[EmailJS] ${options.logLabel} fetch error:`, message);
    return { success: false, reason: message };
  }
}

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
      }),
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
    const orders = args.items.map((item) => ({
      name: item.name + (item.size ? ` (${item.size})` : "") + (item.color ? ` — ${item.color}` : ""),
      units: item.quantity,
      price: item.price.toFixed(2),
      image: item.image || "",
    }));

    return sendViaEmailJS({
      templateId: process.env.EMAILJS_ORDER_TEMPLATE_ID,
      logLabel: `Order confirmation to ${args.email} (${args.orderNumber})`,
      templateParams: {
        email: args.email,
        to_email: args.email,
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
      },
    });
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
    return sendViaEmailJS({
      templateId: process.env.EMAILJS_VERIFICATION_TEMPLATE_ID,
      logLabel: `Verification code to ${args.email}`,
      templateParams: {
        email: args.email,
        to_email: args.email,
        user_email: args.email,
        passcode: args.passcode,
        time: args.time,
      },
    });
  },
});
