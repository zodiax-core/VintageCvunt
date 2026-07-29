# EmailJS Setup Guide

## Problem
OTP emails are not being sent because EmailJS environment variables are not configured in Convex.

## Solution

### Step 1: Get EmailJS Credentials
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to your Email Service (e.g., Gmail, SendGrid, etc.)
3. Copy your **Service ID**
4. Go to Account → General → Copy your **Public Key**
5. Go to Account → General → Copy your **Private Key**

### Step 2: Create Email Templates
You need two email templates in EmailJS:

#### Verification/OTP Template
- Template ID: Copy this (you'll need it as `EMAILJS_VERIFICATION_TEMPLATE_ID`)
- Subject: "Verify your VintageCvunt account"
- Variables to include:
  - `{{email}}` - Recipient email
  - `{{passcode}}` - 6-digit verification code
  - `{{time}}` - Expiration time (e.g., "15 minutes")

Example content:
```
Your verification code is: {{passcode}}

This code will expire in {{time}}.

If you didn't request this, please ignore this email.
```

#### Order Confirmation Template
- Template ID: Copy this (you'll need it as `EMAILJS_ORDER_TEMPLATE_ID`)
- Variables to include:
  - `{{email}}` - Customer email
  - `{{customer_name}}` - Customer name
  - `{{order_id}}` - Order number
  - `{{orders}}` - Array of order items
  - `{{cost.shipping}}` - Shipping cost
  - `{{cost.tax}}` - Tax amount
  - `{{cost.total}}` - Total amount

### Step 3: Configure Convex Environment Variables
**CRITICAL:** These must be set in Convex Dashboard, NOT Vercel!

1. Go to [Convex Dashboard](https://dashboard.convex.dev/)
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:

```
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here
EMAILJS_PRIVATE_KEY=your_private_key_here
EMAILJS_VERIFICATION_TEMPLATE_ID=your_verification_template_id
EMAILJS_ORDER_TEMPLATE_ID=your_order_template_id
```

### Step 4: Enable Non-Browser Requests in EmailJS
1. Go to EmailJS Dashboard → Account → Security
2. Enable **"Allow API requests from non-browser environments"**
3. This is required for server-side requests from Convex

### Step 5: Redeploy Convex
After setting environment variables:
```bash
npx convex deploy
```

Or if using the dev script:
```bash
npm run convex:sync
```

### Step 6: Test
1. Try registering a new account
2. Check Convex logs for any errors
3. Check if email is received

## Troubleshooting

### Emails still not sending?
1. Check Convex Function Logs in the dashboard
2. Verify all environment variables are set correctly
3. Ensure EmailJS non-browser requests are enabled
4. Check EmailJS email template variables match exactly

### Common Errors
- **"EmailJS credentials missing"**: Environment variables not set in Convex
- **"non-browser" error**: Enable non-browser requests in EmailJS Security settings
- **"template error"**: Check template variables match the code expectations

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `EMAILJS_SERVICE_ID` | Yes | Your EmailJS Service ID |
| `EMAILJS_PUBLIC_KEY` | Yes | Your EmailJS Public Key |
| `EMAILJS_PRIVATE_KEY` | Yes | Your EmailJS Private Key |
| `EMAILJS_VERIFICATION_TEMPLATE_ID` | Yes | Template ID for OTP emails |
| `EMAILJS_ORDER_TEMPLATE_ID` | Yes | Template ID for order emails |
