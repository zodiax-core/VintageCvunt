import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendEmail = action({
  args: {
    email: v.string(),
    otp: v.string(),
    type: v.union(v.literal("verification"), v.literal("reset")),
  },
  handler: async (ctx, args) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.warn("⚠️ RESEND_API_KEY is not set. Email will not be sent.");
      console.log(`[Mock Email] To: ${args.email} | Type: ${args.type} | OTP: ${args.otp}`);
      return { success: false, reason: "Missing API key" };
    }

    const subject =
      args.type === "verification"
        ? "Verify your VintageCvunt Account"
        : "Reset your VintageCvunt Password";

    const title =
      args.type === "verification"
        ? "Welcome to VintageCvunt"
        : "Account Recovery";

    const message =
      args.type === "verification"
        ? "Thank you for joining. Use the following code to verify your email address:"
        : "We received a request to reset your password. Use the following code to proceed:";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; margin: 0; }
          .container { max-w-xl; margin: 0 auto; background-color: #111; padding: 40px; border-radius: 8px; border: 1px solid #333; }
          h1 { font-size: 24px; font-weight: normal; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; text-align: center; }
          p { font-size: 14px; line-height: 1.6; color: #a1a1aa; text-align: center; margin-bottom: 32px; }
          .code { font-size: 32px; font-weight: bold; font-family: monospace; letter-spacing: 0.25em; text-align: center; color: #fff; background: #222; padding: 24px; border-radius: 8px; margin-bottom: 32px; }
          .footer { font-size: 10px; color: #555; text-align: center; text-transform: uppercase; letter-spacing: 0.2em; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${title}</h1>
          <p>${message}</p>
          <div class="code">${args.otp}</div>
          <p style="font-size: 12px; margin-bottom: 40px;">This code will expire in 10 minutes.</p>
          <div class="footer">VintageCvunt &middot; Objects / Chrome / Bone</div>
        </div>
      </body>
      </html>
    `;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "VintageCvunt <onboarding@resend.dev>",
          to: [args.email],
          subject: subject,
          html: html,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to send email via Resend:", errorText);
        return { success: false, reason: "API Error" };
      }

      const data = await response.json();
      console.log(`[Email] Successfully sent ${args.type} email to ${args.email}. ID:`, data.id);
      return { success: true };
    } catch (error: any) {
      console.error("Error sending email:", error);
      return { success: false, reason: error.message };
    }
  },
});
