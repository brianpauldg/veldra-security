# VELDRA — Complete Deployment Guide
# Security-hardened + Integrated with veldra.io

## ════════════════════════════════════════
## STEP 1 — SUPABASE SETUP (30 minutes)
## ════════════════════════════════════════

1. Go to supabase.com → Create new project
   - Name: veldra-production
   - Database password: generate strong password (save it)
   - Region: West US (closest to Irvine, CA)

2. Go to SQL Editor → paste entire supabase-setup.sql → Run
   This creates all tables, RLS policies, and triggers.

3. Go to Authentication → Providers:
   - Enable Email (set "Confirm email" to ON)
   - Enable Google (add OAuth credentials from Google Cloud Console)
   - Enable Azure (for Microsoft sign-in)

4. Go to Authentication → URL Configuration:
   - Site URL: https://app.veldra.io
   - Redirect URLs: https://app.veldra.io/auth/callback

5. Go to Storage → Create bucket:
   - Name: documents
   - Public: NO (private)
   - Enable RLS: YES
   - File size limit: 50MB
   - Allowed MIME types: application/pdf,image/*,application/msword,application/vnd.openxmlformats-officedocument.*

6. Copy your API keys from Settings → API:
   - Project URL → NEXT_PUBLIC_SUPABASE_URL
   - anon public → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - service_role → SUPABASE_SERVICE_ROLE_KEY (keep secret!)

## ════════════════════════════════════════
## STEP 2 — INSTALL DEPENDENCIES
## ════════════════════════════════════════

Run in your project directory:

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install zod
npm install @types/node --save-dev
```

## ════════════════════════════════════════
## STEP 3 — ADD FILES TO YOUR PROJECT
## ════════════════════════════════════════

Copy these files from this security package:

middleware.ts          → /middleware.ts (root of project)
next.config.js         → /next.config.js (replace existing)
lib-auth.ts            → /lib/auth.ts
lib-encryption.ts      → /lib/encryption.ts
lib-validation.ts      → /lib/validation.ts
auth-callback-route.ts → /app/auth/callback/route.ts (create folder)
api-clients-route.ts   → /app/api/clients/route.ts (create folder)
vercel.json            → /vercel.json (root of project)

## ════════════════════════════════════════
## STEP 4 — GENERATE ENCRYPTION KEY
## ════════════════════════════════════════

Run this in Terminal to generate your ENCRYPTION_KEY:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output — this is your ENCRYPTION_KEY. Store it safely.
If you lose it, all encrypted data is unrecoverable.

## ════════════════════════════════════════
## STEP 5 — CREATE .env.local
## ════════════════════════════════════════

Copy env-example.txt to .env.local in your project root.
Fill in all values. Add .env.local to .gitignore immediately:

```bash
echo ".env.local" >> .gitignore
```

## ════════════════════════════════════════
## STEP 6 — CONNECT LOGIN PAGE TO SUPABASE
## ════════════════════════════════════════

Update your login page to use the auth functions from lib/auth.ts.

Replace your current sign-in buttons with:

```typescript
// Google button onClick:
import { signInWithGoogle } from '@/lib/auth'
onClick={() => signInWithGoogle()}

// Microsoft button onClick:
import { signInWithMicrosoft } from '@/lib/auth'
onClick={() => signInWithMicrosoft()}

// Email form onSubmit:
import { signInWithEmail } from '@/lib/auth'
const { data, error } = await signInWithEmail(email, password)
if (error) setError(error.message)
else router.push('/dashboard')
```

## ════════════════════════════════════════
## STEP 7 — PROTECT SERVER COMPONENTS
## ════════════════════════════════════════

Add this to the top of every dashboard page (server component):

```typescript
// app/(dashboard)/dashboard/page.tsx
import { getCurrentProfile } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/login')
  
  // Now fetch data scoped to profile.firm_id
  // Supabase RLS automatically filters by firm
  ...
}
```

## ════════════════════════════════════════
## STEP 8 — DEPLOY TO VERCEL
## ════════════════════════════════════════

1. Push your code to GitHub (make sure .env.local is in .gitignore)

2. Go to vercel.com → Add New Project → Import from GitHub
   - Select your VELDRA repo
   - Framework: Next.js (auto-detected)
   - Root directory: . (default)

3. Add Environment Variables in Vercel dashboard:
   (Settings → Environment Variables)
   Add every variable from your .env.local

4. Set Custom Domain:
   - Go to Settings → Domains
   - Add: app.veldra.io
   - Vercel gives you DNS records → add to Cloudflare

5. Deploy → Vercel builds and deploys automatically

## ════════════════════════════════════════
## STEP 9 — CONNECT VELDRA.IO TO THE APP
## ════════════════════════════════════════

Update veldra.io (veldra_FINAL_SITE.html):
- All "Start Free Trial" buttons → https://app.veldra.io/signup
- All "Book Demo" buttons → keep as cal.com/brian-deguzman

The Stripe payment links currently on the site can stay for 
direct checkout OR redirect to app.veldra.io/signup after payment
via a Stripe webhook → Supabase profile update.

## ════════════════════════════════════════
## STEP 10 — CLOUDFLARE DNS FOR app.veldra.io
## ════════════════════════════════════════

In Cloudflare for veldra.io → DNS → Add records:

Type: CNAME | Name: app | Target: cname.vercel-dns.com | Proxy: OFF (grey)

That's it. app.veldra.io → your Vercel deployment.

## ════════════════════════════════════════
## SECURITY CHECKLIST — VERIFY BEFORE LAUNCH
## ════════════════════════════════════════

[ ] /dashboard returns 302 redirect to /login when not authenticated
[ ] /clients returns 302 redirect to /login when not authenticated  
[ ] Security headers present (check: securityheaders.com)
[ ] HTTPS enforced (no HTTP access)
[ ] .env.local NOT in git (check: git status)
[ ] ENCRYPTION_KEY saved somewhere safe (password manager)
[ ] Supabase RLS enabled on all tables (check in Supabase dashboard)
[ ] Documents bucket set to PRIVATE
[ ] Supabase service role key only in server env vars
[ ] Rate limiting active on /login
[ ] Audit logs recording all sensitive actions
[ ] CORS set correctly in Supabase dashboard
[ ] Google/Microsoft OAuth redirect URIs set to app.veldra.io only

## ════════════════════════════════════════
## PACKAGES USED — WHAT EACH DOES
## ════════════════════════════════════════

@supabase/supabase-js          — Supabase client
@supabase/auth-helpers-nextjs  — Supabase + Next.js auth integration
zod                            — Runtime type validation / input sanitization
crypto (built-in Node.js)      — AES-256-GCM encryption (no install needed)

## ════════════════════════════════════════
## ONGOING SECURITY — DO MONTHLY
## ════════════════════════════════════════

1. Run: npm audit — fixes known vulnerabilities
2. Check Supabase dashboard → Auth → Users for suspicious accounts
3. Review audit_logs table for unusual patterns
4. Rotate ENCRYPTION_KEY annually (requires re-encrypting all data)
5. Review Vercel deployment logs for errors
6. Check securityheaders.com → app.veldra.io for header score
