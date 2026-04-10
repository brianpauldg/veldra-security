# Nova Health — Pre-Deployment Checklist

Before pushing to Vercel, verify everything is ready:

## Code & Git

- [ ] `package.json` exists with all dependencies
- [ ] `.gitignore` has `.env.local` and `.env*.local`
- [ ] Git repo initialized and ready to push (no uncommitted changes)
- [ ] GitHub repo created (or GitLab/Bitbucket if using Vercel)

## Environment Setup

- [ ] `.env.local` created locally with all dev/test keys
- [ ] `ENCRYPTION_KEY` generated (64 hex chars, never hardcoded)
- [ ] `CSRF_SECRET` generated
- [ ] Supabase project running with RLS enabled
- [ ] Stripe test/live keys ready
- [ ] Anthropic API key optional (for AI features)

## Local Testing

```bash
npm install
npm run dev
```

Then verify:
- [ ] Landing page loads at http://localhost:3000
- [ ] Header and Footer render properly
- [ ] `/signup` page works with email input
- [ ] `/api/create-checkout-session` accepts POST with email
- [ ] Auth flows work (Google/Microsoft, if configured)
- [ ] Database queries don't error (check terminal logs)

## Vercel Setup

- [ ] Vercel account created
- [ ] GitHub repo connected to Vercel
- [ ] Vercel project created successfully
- [ ] All env vars added to Vercel dashboard:
  - Public vars (NEXT_PUBLIC_*)
  - Secret vars (server-only)
  - Same vars for Production, Preview, and Development environments

## Stripe Webhook

- [ ] Stripe API keys copied to Vercel
- [ ] Stripe Webhook endpoint created pointing to Vercel domain
- [ ] Webhook Signing Secret (`whsec_...`) in Vercel env var `STRIPE_WEBHOOK_SECRET`
- [ ] Webhook events selected: `checkout.session.completed`

## Deployment Verification

After Vercel deployment:

- [ ] Landing page accessible at Vercel URL
- [ ] `/signup` works (form submits without 404)
- [ ] Existing email redirects to `/dashboard`
- [ ] New email redirects to Stripe Checkout
- [ ] Stripe webhook delivery succeeds (check Stripe dashboard)
- [ ] Supabase `profiles` table receives new row after checkout
- [ ] No 500 errors in Vercel logs

## Optional: Custom Domain

- [ ] DNS records added (if using custom domain)
- [ ] Domain verified in Vercel
- [ ] HTTPS working (automatic with Vercel)

## Final Production Checks

- [ ] Update marketing site links to point to live Vercel URL
- [ ] Test "Start Free Trial" end-to-end with real Stripe card
- [ ] Monitor Vercel logs for 48 hours for errors
- [ ] Supabase RLS policies reviewed and correct
- [ ] No secrets in code or git history

## Quick Deploy Command

```bash
# From repo root after env vars are set in Vercel:
git push origin main
# Vercel auto-deploys
```

All set? You're ready to launch! 🚀
