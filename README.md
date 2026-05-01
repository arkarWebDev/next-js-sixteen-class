# Dev Forum

A full-stack developer discussion platform built with Next.js 16, Prisma, Better Auth, and Stripe subscriptions.

## Features

- Email/password + GitHub authentication with Better Auth
- Create, edit, and delete posts with rich text and image uploads
- Commenting system for post discussions
- Upvote/downvote system for posts
- Profile page with user stats and premium status
- Stripe-powered premium subscription checkout
- Stripe webhook sync for premium state and payment details
- Premium visual effects for subscribed users in post cards

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui + Radix UI
- Prisma ORM
- Better Auth
- Stripe API + Webhooks
- Zod + React Hook Form + next-safe-action

## Project Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`:

```env
DATABASE_URL=
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
RESEND_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_PREMIUM_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Generate Prisma client and push schema:

```bash
npx prisma generate
npx prisma db push
```

4. Run development server:

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Stripe Webhook (Local)

This project listens for Stripe webhooks at:

`/api/stripe/webhook`

Use Stripe CLI to forward events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the signing secret from CLI output into `STRIPE_WEBHOOK_SECRET`.

## Useful Scripts

- `npm run dev` - Start local development server
- `npm run build` - Production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## Suggested Demo Flow (Class Presentation)

1. Sign up / sign in
2. Create a post with tags and content
3. Add comments on a post
4. Upvote/downvote a post
5. Open profile and start premium checkout
6. Trigger webhook event and show premium status update
7. Show premium username effect in post list

## Notes

- Premium checkout redirects back to profile with status query params.
- Premium state is synced by Stripe webhook events.
- Payment details are shown on profile after successful invoice events.
