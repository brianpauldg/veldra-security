# VELDRA — Vercel Deployment Guide

This guide walks you through deploying Veldra to Vercel with all necessary environment variables and webhook configuration.

## Prerequisites

- GitHub account with repo ready to push
- Vercel account (free tier works)
- Stripe account with test/live keys
- Supabase project (from DEPLOY_GUIDE.md)
- Anthropic API key (optional, for AI features)

## Step 1: Prepare Your Git Repository

### 1a. Initialize git (if not already done)

```bash
cd /Users/briandeguzman/Downloads/veldra-security
git init
git add .
git commit -m "Initial commit: Veldra with security and landing page"
```

### 1b. Create a GitHub repository and push

```bash
# Create a new repo on GitHub (https://github.com/new)
# Name: veldra-security (or your preferred name)
# Then run:

git remote add origin https://github.com/<YOUR_USERNAME>/veldra-security.git
git branch -M main
git push -u origin main
```

## Step 2: Connect to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo (`veldra-security`)
4. Select "Next.js" as framework (auto-detected)
5. Leave root directory as `.` (default)
6. Click "Deploy"

Vercel will now build and deploy a preview. **It will fail at this stage** because environment variables are missing — that's expected.

## Step 3: Add Environment Variables in Vercel

After Vercel creates the project, go to **Settings → Environment Variables** and add these:

### Public Variables (safe to expose)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=https://veldra.vercel.app  (or your custom domain)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your-publishable-key
```

### Secret Variables (server-only, never exposed)

```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
STRIPE_PRICE_ID=price_XXXXXXXXXXXXXX
ENCRYPTION_KEY=generate-a-64-char-hex-string-here
ANTHROPIC_API_KEY=sk-ant-your-key-here (optional)
```

**Each variable screen shows a dropdown to select environment (Production, Preview, Development). Recommend adding to all three.**

After adding all variables, Vercel will automatically rebuild and deploy.

## Step 4: Update Stripe Webhook to Point to Vercel

Once deployed, Stripe webhooks need to target Vercel → Stripe dashboard:

1. Go to **Stripe Dashboard → Developers → Webhooks**
2. Add new endpoint:
   - **URL:** `https://your-vercel-domain.vercel.app/api/stripe-webhook`
   - **Events:** `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
3. Copy the **Signing Secret** (starts with `whsec_`)
4. Paste into Vercel env var `STRIPE_WEBHOOK_SECRET`
5. Vercel auto-rebuilds

## Step 5: Verify Deployment

After environment variables are set and Vercel rebuilds:

1. Open your Vercel deployment URL (e.g., https://veldra.vercel.app)
2. You should see the minimalistic landing page
3. Click "Start Free Trial" → should redirect to `/signup`
4. Enter an email → should create a Stripe Checkout session or redirect to dashboard if account exists
5. Test with a Stripe test card (e.g., 4242 4242 4242 4242)

## Step 6: Connect Custom Domain (Optional)

1. In Vercel: **Settings → Domains**
2. Add your domain (e.g., `app.veldra.io`)
3. Vercel provides DNS records
4. Add those records to your DNS provider (Cloudflare, GoDaddy, etc.)
5. Wait 24–48 hours for DNS propagation

## Step 7: Update Marketing Links

Once deployed, update your marketing site (`veldra_FINAL_SITE.html` or wherever):

```html
<!-- All "Start Free Trial" buttons should point to: -->
<a href="https://your-vercel-domain.vercel.app/signup">Start Free Trial</a>

<!-- All "Book Demo" buttons keep as: -->
<a href="https://cal.com/brian-deguzman">Book Demo</a>
```

## Step 8: Monitor & Debug in Production

**View logs:**
- Vercel Dashboard → **Deployments** → click latest → **Runtime Logs**
- Check for errors in auth, Stripe, or database calls

**Common issues:**

| Issue | Solution |
|-------|----------|
| 404 on `/api/create-checkout-session` | Check that API routes are deployed (look in Vercel logs) |
| "Environment variable not set" | Verify all env vars in Vercel Settings |
| Stripe webhook not firing | Check Stripe Signing Secret matches `STRIPE_WEBHOOK_SECRET` |
| Profile creation fails | Confirm `SUPABASE_SERVICE_ROLE_KEY` is correct and RLS policies allow inserts |
| 429 (Too Many Requests) | Rate limiting on `/login` — expected; test with different IPs or wait |

## Optional: Set Up Continuous Deployment

Vercel automatically deploys on every push to `main`. To control deployments:

1. **Settings → Git Configuration**
2. Disable "Deploy on every push" if you want manual deployments
3. Use "Deployments" tab to manually trigger builds

## Rollback to Previous Deployment

If something breaks:

1. Go to **Deployments** tab
2. Find the previous stable deployment
3. Click **...** → **Promote to Production**

## Summary

Your Veldra app is now live! 🚀

- **Public URL:** `https://your-vercel-domain.vercel.app`
- **Signup flow:** User enters email → existing users go to dashboard, new users see Stripe Checkout
- **Webhooks:** Stripe sends checkout.session.completed → creates Supabase profile
- **Audit logs:** All actions logged in Supabase `audit_logs` table

Questions? Check Vercel docs (https://vercel.com/docs) or Stripe webhook guide (https://stripe.com/docs/webhooks).
