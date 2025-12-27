# Deployment Guide

This guide explains how to deploy **EduTrack Hub** to production using **Vercel** and **Neon**.

## 1. Database Setup (Neon)

1.  Sign up at [neon.tech](https://neon.tech).
2.  Create a project named `edutrack`.
3.  Copy the **Connection String** from the dashboard.
    - *Example*: `postgresql://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require`

## 2. Prepare Environment Variables

You will need the following for production:

| Variable | Source |
| :--- | :--- |
| `DATABASE_URL` | From Neon dashboard |
| `JWT_SECRET` | Generate via `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_URL` | Your final Vercel URL (e.g., `https://edutrack-hub.vercel.app`) |

## 3. Deploy to Vercel

### via Vercel Dashboard (Recommended)
1.  Push your code to a **GitHub** repository.
2.  Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** → **Project**.
3.  Import your repository.
4.  In the **Environment Variables** section, add the variables from Step 2.
5.  Click **Deploy**.

### Post-Deployment (Manual Database Sync)
Once deployed, Vercel runs the build. However, you must ensure the database schema is synchronized:
1.  Run the following command locally using your **Production** `DATABASE_URL`:
    ```bash
    npx prisma db push
    ```
    *Alternatively, you can set up a GitHub Action to handle this.*

## 4. Troubleshooting

### Build Failures
- Ensure all dependencies are in `package.json`.
- Check that `prisma generate` is part of your build script: `"build": "prisma generate && next build"`.

### Database Connection
- If using Neon, ensure `?sslmode=require` is at the end of your `DATABASE_URL`.
- Check **IP Allowlisting** in Neon if you have restricted access.

### Authentication Issues
- Ensure `JWT_SECRET` is consistent across all environments.
- Check that `NEXT_PUBLIC_APP_URL` matches your actual domain for cookie security.

---
**EduTrack Hub** | Production Readiness Guide
