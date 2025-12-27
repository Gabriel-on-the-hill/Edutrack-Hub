# Deployment Guide

This guide explains how to deploy **EduTrack Hub** to production using **Vercel** and **Neon**.

---

## Prerequisites

- GitHub repository with your code
- [Neon](https://neon.tech) account (free tier available)
- [Vercel](https://vercel.com) account
- [Resend](https://resend.com) account (for transactional emails)
- [Stripe](https://stripe.com) account (for payments, optional)

---

## 1. Database Setup (Neon)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project named `edutrack`
3. Copy the **Connection String** from the dashboard
   - Format: `postgresql://user:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require`

---

## 2. Environment Variables

Prepare these values before deploying:

| Variable | Source | Required |
|----------|--------|----------|
| `DATABASE_URL` | Neon dashboard | ✅ Yes |
| `JWT_SECRET` | Generate: `openssl rand -base64 32` | ✅ Yes |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL (e.g., `https://edutrack-hub.vercel.app`) | ✅ Yes |
| `RESEND_API_KEY` | Resend dashboard | ✅ Yes |
| `STRIPE_SECRET_KEY` | Stripe dashboard | Optional |
| `STRIPE_PUBLISHABLE_KEY` | Stripe dashboard | Optional |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook settings | Optional |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard | Optional |
| `CLOUDINARY_API_KEY` | Cloudinary dashboard | Optional |
| `CLOUDINARY_API_SECRET` | Cloudinary dashboard | Optional |

---

## 3. Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Push your code to **GitHub**
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. In **Environment Variables**, add all variables from Step 2
6. Click **Deploy**

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 4. Post-Deployment Setup

### Sync Database Schema

After the first deployment, sync your database:

```bash
# Set your production DATABASE_URL temporarily
export DATABASE_URL="postgresql://..."

# Push schema
npx prisma db push

# Optional: Seed with initial data
npm run db:seed
```

### Configure Stripe Webhooks (If using payments)

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET` in Vercel

### Configure Resend Domain (For emails)

1. Go to Resend Dashboard → Domains
2. Add your domain and verify DNS records
3. Update `EMAIL_FROM` in your code if needed

---

## 5. Troubleshooting

### Build Failures

**Prisma Client not generated**
- Ensure build script is: `"build": "prisma generate && next build"`

**Missing dependencies**
- Run `npm install` and commit `package-lock.json`

### Database Connection Issues

**SSL required error**
- Ensure `?sslmode=require` is at the end of `DATABASE_URL`

**Connection timeout**
- Check Neon dashboard for IP restrictions
- Verify the connection string is correct

### Authentication Issues

**Cookies not working**
- Ensure `NEXT_PUBLIC_APP_URL` matches your actual domain
- For custom domains, update cookie settings in `lib/auth.js`

**JWT errors**
- Ensure `JWT_SECRET` is the same across all environments
- Regenerate tokens after changing the secret

### Email Not Sending

**Resend errors**
- Verify API key is correct
- Check domain is verified in Resend dashboard
- Review Resend logs for specific errors

---

## 6. Custom Domain Setup

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain
5. Redeploy for changes to take effect

---

## 7. Monitoring & Logs

### Vercel Logs
- Go to Vercel Dashboard → Your Project → Deployments
- Click on any deployment → Functions tab

### Database Monitoring
- Neon Dashboard shows queries, connections, and storage

### Error Tracking (Recommended)
Consider adding [Sentry](https://sentry.io) for production error tracking.

---

## Quick Reference

```bash
# Local development
npm run dev

# Production build (test locally)
npm run build && npm run start

# Database commands
npx prisma db push      # Sync schema
npx prisma studio       # Visual editor
npm run db:seed         # Seed data

# Vercel CLI
vercel                  # Preview deploy
vercel --prod           # Production deploy
vercel env pull         # Pull env vars
```

---

**EduTrack Hub** | Production Deployment Guide
