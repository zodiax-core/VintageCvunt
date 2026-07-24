import { internalAction } from "./_generated/server";
import { v } from "convex/values";

// ─── Shared Design System ────────────────────────────────────────────────────
const BRAND_NAME = "VintageCvunt";
const BRAND_TAGLINE = "Objects / Chrome / Bone";
const SITE_URL = "https://vintagecvunt.vercel.app";

function emailShell(content: string): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${BRAND_NAME}</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #080808;
      color: #e8e8e3;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    .wrapper { background-color: #080808; padding: 40px 16px; }
    .container {
      max-width: 560px;
      margin: 0 auto;
      background-color: #0e0e0e;
      border: 1px solid #1e1e1e;
      border-radius: 4px;
      overflow: hidden;
    }
    .header {
      padding: 32px 40px 24px;
      border-bottom: 1px solid #1e1e1e;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .header-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #e8e8e3;
      display: inline-block;
    }
    .header-name {
      font-family: 'Courier New', Courier, monospace;
      font-size: 11px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #e8e8e3;
    }
    .body { padding: 40px; }
    .label {
      font-family: 'Courier New', Courier, monospace;
      font-size: 9px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #555;
      margin-bottom: 16px;
    }
    .title {
      font-size: 26px;
      font-weight: 300;
      color: #e8e8e3;
      letter-spacing: -0.01em;
      line-height: 1.2;
      margin-bottom: 20px;
    }
    .text {
      font-size: 13px;
      color: #888;
      line-height: 1.7;
      margin-bottom: 16px;
    }
    .divider {
      height: 1px;
      background-color: #1e1e1e;
      margin: 32px 0;
    }
    .code-block {
      background-color: #141414;
      border: 1px solid #1e1e1e;
      border-radius: 4px;
      padding: 28px;
      text-align: center;
      margin: 28px 0;
    }
    .code-label {
      font-family: 'Courier New', Courier, monospace;
      font-size: 9px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #444;
      margin-bottom: 16px;
    }
    .code-value {
      font-family: 'Courier New', Courier, monospace;
      font-size: 34px;
      letter-spacing: 0.3em;
      color: #e8e8e3;
      font-weight: 400;
    }
    .code-expires {
      font-family: 'Courier New', Courier, monospace;
      font-size: 9px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #3a3a3a;
      margin-top: 12px;
    }
    .btn {
      display: inline-block;
      background-color: #e8e8e3;
      color: #080808 !important;
      font-family: 'Courier New', Courier, monospace;
      font-size: 10px;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      padding: 14px 28px;
      border-radius: 2px;
      font-weight: 500;
      margin-top: 8px;
    }
    .order-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 14px 0;
      border-bottom: 1px solid #141414;
      gap: 16px;
    }
    .order-row:last-child { border-bottom: none; }
    .order-item-name { font-size: 13px; color: #c8c8c3; font-weight: 400; }
    .order-item-meta { font-family: 'Courier New', Courier, monospace; font-size: 10px; color: #444; margin-top: 3px; }
    .order-item-price { font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #888; white-space: nowrap; }
    .summary-row {
      display: flex;
      justify-content: space-between;
      font-family: 'Courier New', Courier, monospace;
      font-size: 11px;
      color: #555;
      padding: 6px 0;
      letter-spacing: 0.05em;
    }
    .summary-row.total {
      color: #e8e8e3;
      font-size: 13px;
      border-top: 1px solid #1e1e1e;
      padding-top: 14px;
      margin-top: 8px;
    }
    .address-block {
      background-color: #141414;
      border: 1px solid #1e1e1e;
      border-radius: 4px;
      padding: 20px 24px;
    }
    .address-block .address-label {
      font-family: 'Courier New', Courier, monospace;
      font-size: 9px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #444;
      margin-bottom: 10px;
    }
    .address-block .address-text { font-size: 13px; color: #888; line-height: 1.7; }
    .status-badge {
      display: inline-block;
      font-family: 'Courier New', Courier, monospace;
      font-size: 9px;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: #e8e8e3;
      background-color: #1a1a1a;
      border: 1px solid #2a2a2a;
      padding: 4px 12px;
      border-radius: 100px;
    }
    .footer {
      padding: 24px 40px;
      border-top: 1px solid #1e1e1e;
    }
    .footer-brand {
      font-family: 'Courier New', Courier, monospace;
      font-size: 9px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #2a2a2a;
      margin-bottom: 8px;
    }
    .footer-text {
      font-size: 11px;
      color: #2a2a2a;
      line-height: 1.6;
    }
    .footer-link { color: #3a3a3a; }
  </style>
</head>
<body>
<div class="wrapper">
  <div class="container">
    <!-- Header -->
    <div class="header">
      <span class="header-dot"></span>
      <span class="header-name">${BRAND_NAME}</span>
    </div>

    ${content}

    <!-- Footer -->
    <div class="footer">
      <div class="footer-brand">${BRAND_NAME} &middot; ${BRAND_TAGLINE}</div>
      <div class="footer-text">
        Questions? <a href="mailto:support@vintagecvunt.com" class="footer-link">support@vintagecvunt.com</a>
        &nbsp;&middot;&nbsp; <a href="${SITE_URL}" class="footer-link">${SITE_URL}</a>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;
}

function verificationTemplate(otp: string): string {
  return emailShell(`
    <div class="body">
      <div class="label">— Account Verification</div>
      <div class="title">Verify your<br/>email address.</div>
      <div class="text">
        Welcome to VintageCvunt. You're almost in — use the code below
        to complete your registration and unlock your account.
      </div>

      <div class="code-block">
        <div class="code-label">Verification Code</div>
        <div class="code-value">${otp}</div>
        <div class="code-expires">Expires in 10 minutes</div>
      </div>

      <div class="text" style="font-size:12px; margin-top:24px;">
        If you didn't create an account with VintageCvunt, you can safely ignore this email.
      </div>
    </div>
  `);
}

function resetPasswordTemplate(otp: string): string {
  return emailShell(`
    <div class="body">
      <div class="label">— Account Recovery</div>
      <div class="title">Reset your<br/>password.</div>
      <div class="text">
        We received a request to reset the password for your VintageCvunt account.
        Use the code below to set a new password.
      </div>

      <div class="code-block">
        <div class="code-label">Reset Code</div>
        <div class="code-value">${otp}</div>
        <div class="code-expires">Expires in 10 minutes</div>
      </div>

      <div class="text" style="font-size:12px; margin-top:24px;">
        If you didn't request a password reset, please secure your account immediately.
      </div>
    </div>
  `);
}

function orderConfirmationTemplate(order: {
  orderNumber: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number; size?: string; color?: string }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  shippingAddress: { street: string; city: string; state: string; zip: string; country: string };
}): string {
  const fmt = (n: number) => `$${n.toFixed(2)}`;

  const itemsHtml = order.items
    .map(
      (item) => `
    <div class="order-row">
      <div>
        <div class="order-item-name">${item.name}</div>
        <div class="order-item-meta">Qty: ${item.quantity}${item.size ? ` &middot; Size: ${item.size}` : ""}${item.color ? ` &middot; ${item.color}` : ""}</div>
      </div>
      <div class="order-item-price">${fmt(item.price * item.quantity)}</div>
    </div>`
    )
    .join("");

  const addr = order.shippingAddress;
  const addrStr = `${addr.street}<br/>${addr.city}, ${addr.state} ${addr.zip}<br/>${addr.country}`;

  return emailShell(`
    <div class="body">
      <div class="label">— Order Confirmed</div>
      <div class="title">Thank you,<br/>${order.customerName.split(" ")[0]}.</div>
      <div class="text">
        Your order has been placed and is being processed. We'll send you another
        update when your items are on their way.
      </div>

      <div style="display:flex; align-items:center; gap:16px; margin:24px 0 8px;">
        <div>
          <div style="font-family:'Courier New',Courier,monospace; font-size:9px; letter-spacing:0.24em; text-transform:uppercase; color:#444; margin-bottom:4px;">Order</div>
          <div style="font-family:'Courier New',Courier,monospace; font-size:13px; color:#e8e8e3;">${order.orderNumber}</div>
        </div>
        <div style="margin-left:auto;">
          <span class="status-badge">${order.status}</span>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Items -->
      <div class="label">Items Ordered</div>
      ${itemsHtml}

      <div class="divider"></div>

      <!-- Summary -->
      <div class="summary-row">
        <span>Subtotal</span><span>${fmt(order.subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span><span>${order.shipping === 0 ? "Free" : fmt(order.shipping)}</span>
      </div>
      <div class="summary-row">
        <span>Tax</span><span>${fmt(order.tax)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span><span>${fmt(order.total)}</span>
      </div>

      <div class="divider"></div>

      <!-- Shipping Address -->
      <div class="label" style="margin-bottom:12px;">Shipping To</div>
      <div class="address-block">
        <div class="address-label">Delivery Address</div>
        <div class="address-text">${addrStr}</div>
      </div>

      <div style="text-align:center; margin-top:32px;">
        <a href="${SITE_URL}/orders" class="btn">Track Your Order</a>
      </div>
    </div>
  `);
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export const sendEmail = internalAction({
  args: {
    email: v.string(),
    otp: v.string(),
    type: v.union(v.literal("verification"), v.literal("reset")),
  },
  handler: async (_ctx, args) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    const subject =
      args.type === "verification"
        ? "Verify your VintageCvunt Account"
        : "Reset your VintageCvunt Password";

    const html =
      args.type === "verification"
        ? verificationTemplate(args.otp)
        : resetPasswordTemplate(args.otp);

    if (!RESEND_API_KEY) {
      console.warn("⚠️ RESEND_API_KEY is not set. Email will not be sent.");
      console.log(`[Mock Email] To: ${args.email} | Type: ${args.type} | OTP: ${args.otp}`);
      return { success: false, reason: "Missing API key" };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "VintageCvunt <onboarding@resend.dev>",
          to: [args.email],
          subject,
          html,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("[Email] Resend API error:", err);
        return { success: false, reason: "API Error" };
      }

      const data = (await response.json()) as { id: string };
      console.log(`[Email] Sent ${args.type} to ${args.email}. ID: ${data.id}`);
      return { success: true };
    } catch (error: any) {
      console.error("[Email] Fetch error:", error.message);
      return { success: false, reason: error.message };
    }
  },
});

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
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    const html = orderConfirmationTemplate(args);

    if (!RESEND_API_KEY) {
      console.warn("⚠️ RESEND_API_KEY is not set. Order confirmation email will not be sent.");
      console.log(`[Mock Email] Order confirmation for ${args.email}: ${args.orderNumber}`);
      return { success: false, reason: "Missing API key" };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "VintageCvunt <onboarding@resend.dev>",
          to: [args.email],
          subject: `Order Confirmed — ${args.orderNumber}`,
          html,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("[Email] Resend API error:", err);
        return { success: false, reason: "API Error" };
      }

      const data = (await response.json()) as { id: string };
      console.log(`[Email] Order confirmation sent to ${args.email}. ID: ${data.id}`);
      return { success: true };
    } catch (error: any) {
      console.error("[Email] Fetch error:", error.message);
      return { success: false, reason: error.message };
    }
  },
});
