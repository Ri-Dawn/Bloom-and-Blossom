# Bloom & Blossom — Website

A complete, real Next.js website: glass-tile category browsing, per-item customisation,
a Design Studio chat with voice notes, UPI-only checkout that pays straight into your
personal bank account, automatic order-status emails, and a private admin page for you
to update orders from your phone or laptop.

No Shopify, no Wix, no monthly platform fee — just this codebase, deployed on your own
Vercel account and domain.

---

## What you need to create first (all free tier)

1. **Supabase** (the database) — [supabase.com](https://supabase.com) → New Project.
   Once it's created: **Project Settings → API** — copy the *Project URL*, the
   *anon public* key, and the *service_role* key (click "Reveal").
   Then: **SQL Editor → New query** → paste the entire contents of
   `supabase-schema.sql` from this project → **Run**. That creates your three tables.

2. **Resend** (the email sender) — [resend.com](https://resend.com) → sign up →
   **API Keys → Create API Key**. For emails to send from your own domain
   (e.g. `orders@bloomandblossom.com`) rather than a generic address, add and verify
   your domain under **Domains** — it's a couple of DNS records, and your domain
   registrar's dashboard will have a place to paste them.

3. **Your UPI ID** — the same one your GPay/PhonePe/Paytm app shows you
   (e.g. `yourname@oksbi`). No new account needed — payments land straight in your
   existing personal bank account.

4. **An admin password** — just something only you know. This protects `/admin`.

---

## Setup

```bash
npm install
cp .env.example .env.local
```

Open `.env.local` and fill in everything from the steps above.

```bash
npm run dev
```

Visit `http://localhost:3000` — the whole site runs locally.

---

## How the site works, end to end

1. **Browse** — glass category tiles on the homepage → category page → pick a style.
2. **Customise** (or skip) — items marked customisable open the Studio (base colour,
   charms, engraving, live price). Items that aren't go straight to checkout.
3. **Unsure?** — the Design Studio chat (bottom-right, on every page) lets a visitor
   type or record a voice note at any point. It's tied to that item or order and
   emails you the moment a message comes in.
4. **Checkout** — name, email, address, one "Place Order" button.
5. **Pay** — a UPI QR code with the exact amount pre-filled. They scan, pay, tap
   "I've Paid" — which just emails *you* to go check your bank app. There's no
   payment gateway involved, so nothing auto-confirms; that's by design, since a
   personal UPI ID has no way to verify a payment automatically.
6. **You confirm** — open `/admin`, find the order, click **Confirm Payment
   Received**. That fires the "your order has begun" email automatically.
7. **You update status** as you actually make the piece — In Design → Hand-Finished →
   Quality Check → Dispatched (with courier name + tracking number). Each click
   sends the customer an email automatically. They can also self-serve check
   `/track` any time, and message you again through the same chat thread.

## About payments

This ships with **UPI only** — no Razorpay, no Cashfree, nothing requiring business
KYC. If you later want to accept international cards, that will need a payment
gateway account (most support an "Individual" onboarding tier without a registered
company, but confirm the current requirement directly with them — policies shift).
The checkout flow is written so a card option can be added later without changing
anything else on the site.

## Deploying to Vercel

```bash
npm i -g vercel   # if you don't have it
vercel
```

Then in the Vercel dashboard for this project: **Settings → Environment Variables**
— paste in everything from `.env.local` (use your real production values — for
`NEXT_PUBLIC_SITE_URL`, use your actual domain, e.g. `https://bloomandblossom.com`).
Redeploy once they're saved. Then **Settings → Domains** to attach the domain you
already own.

## Project structure

```
app/
  page.tsx                  Home — glass tile categories
  category/[slug]/page.tsx  Category page
  studio/page.tsx           Customisation Studio
  checkout/page.tsx         Checkout form
  pay/[orderId]/page.tsx    UPI QR payment
  track/page.tsx            Order lookup
  order/[id]/page.tsx       Order status + chat
  admin/                    Password-protected order management
  api/                      Orders, chat, admin login
components/                 Header, glass tiles, chat widget, icons
lib/                        Supabase, email templates, UPI helper, catalog data
supabase-schema.sql         Run once in Supabase's SQL editor
```

To edit product names, prices, or descriptions, everything is in
`lib/categories.ts` — no database changes needed for that.
