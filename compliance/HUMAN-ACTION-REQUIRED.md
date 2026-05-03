# Human Action Required — Security Remediation

## CRITICAL: Rotate Compromised Secrets

The following secrets were previously committed to git in `.mcp.json`. Even though the file is now gitignored and secrets removed, they exist in git history and must be rotated.

| Secret | Where to Rotate |
|--------|----------------|
| Obsidian API Key | Obsidian plugin settings → regenerate API key |
| Google OAuth Client Secret (`GOCSPX-...`) | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client → regenerate secret |
| GoHighLevel API Key (`pit-649cd3f0-...`) | GoHighLevel → Settings → API → regenerate key |
| GoHighLevel Location ID (`EtuSnpCLjL9iAaorat63`) | Not rotatable — but limit access to the API key above |

After rotating, store new values in environment variables (not `.mcp.json`).

## REQUIRED: Set ENCRYPTION_KEY on Vercel

Intake form PHI encryption requires `ENCRYPTION_KEY` (64 hex chars = 32 bytes).

Generate one:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to Vercel:
```bash
npx vercel env add ENCRYPTION_KEY production
```

## REQUIRED: Verify BAAs

See `/compliance/baa-status.md` for vendor list. Brian must confirm each BAA is executed.

## COMPLETED: privacy@bloommetabolics.com Email — DONE (April 29, 2026)

## REQUIRED: Build Cookie Preferences Page

Build a `/cookie-preferences` page allowing users to update their CookieBanner choices post-acceptance. Currently users must clear browser cookies to reset preferences. Low priority but required for full CCPA compliance.

## RECOMMENDED: Review Git History

Consider whether to scrub `.mcp.json` from git history using `git filter-branch` or BFG Repo Cleaner. This is optional if all secrets above have been rotated.
