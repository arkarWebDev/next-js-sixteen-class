# Vercel Deployment & Setup Guide

This guide explains how to deploy `Dev Forum` to Vercel and configure required services (database, auth, and Stripe).

## 1) Prerequisites

- GitHub repository is up to date
- Vercel account connected to GitHub
- Production Postgres database URL
- Stripe account with an active recurring price (`STRIPE_PREMIUM_PRICE_ID`)
- Better Auth + GitHub OAuth app credentials
- Resend API key (if using password reset emails in production)

## 2) Import Project into Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your repository
3. Framework preset should auto-detect as `Next.js`
4. Keep default build settings
5. Click **Deploy**

## 3) Configure Environment Variables (Vercel)

In Vercel project → **Settings** → **Environment Variables**, add:

```env
DATABASE_URL=
BETTER_AUTH_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
RESEND_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_PREMIUM_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=
```

### Production Values Notes

- `NEXT_PUBLIC_APP_URL`: your Vercel domain, e.g. `https://your-app.vercel.app`
- `BETTER_AUTH_URL`: same as production app URL
- `DATABASE_URL`: production Postgres connection string
- `STRIPE_SECRET_KEY`: production secret key (`sk_live...` or test key if staging)
- `STRIPE_PREMIUM_PRICE_ID`: price ID from Stripe dashboard
- `STRIPE_WEBHOOK_SECRET`: from Stripe webhook endpoint configuration (next section)

After adding/changing env vars, redeploy.

## 4) Stripe Webhook Setup (Production)

Your webhook route is:

`/api/stripe/webhook`

Full production endpoint example:

`https://your-app.vercel.app/api/stripe/webhook`

In Stripe Dashboard:

1. Developers → Webhooks → **Add endpoint**
2. Endpoint URL: your production webhook URL above
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
4. Save endpoint
5. Copy **Signing secret** and set it as `STRIPE_WEBHOOK_SECRET` in Vercel
6. Redeploy

## 5) GitHub OAuth Callback URL

In GitHub OAuth app settings, set callback URL to your production auth callback (depends on your Better Auth config). Ensure it uses your Vercel production domain.

If local and production both are used, keep separate OAuth apps or include both callback URLs where supported.

## 6) Database & Prisma Notes

This project uses Prisma with `prisma db push` in local development. For production:

- Ensure the production DB schema is applied before first real usage.
- If your workflow uses migrations, run them as part of release workflow.
- If you rely on `db push`, run it carefully against production DB.

## 7) Post-Deploy Verification Checklist

- App loads correctly on production domain
- Sign in / sign up works
- Create/edit/delete post works
- Commenting works
- Voting works
- Profile page loads stats
- Premium upgrade opens Stripe checkout
- Successful checkout updates premium status after webhook event
- Premium username effect appears on posts for premium users

## 8) Common Issues

### 404 on webhook

- Confirm Stripe endpoint is exactly:
  `https://your-app.vercel.app/api/stripe/webhook`
- Confirm deployment contains webhook route

### Webhook signature errors

- Ensure `STRIPE_WEBHOOK_SECRET` matches the same Stripe endpoint
- Do not use local CLI secret for production endpoint

### Checkout redirects to wrong URL

- Verify `NEXT_PUBLIC_APP_URL` is your production Vercel domain

### Auth callback mismatch

- Verify GitHub OAuth callback URL and `BETTER_AUTH_URL` use the same domain

---

If you want, I can also add a short **"Deploy to Vercel"** section into `README.md` that links to this guide.
