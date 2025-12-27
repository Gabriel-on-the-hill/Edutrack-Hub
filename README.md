# EduTrack Hub

> **Learn live. Learn anytime.**  
> Flexible learning. Measurable progress.

A modern live tutoring platform built with Next.js, Prisma, and Neon PostgreSQL. EduTrack Hub helps learners of all ages build real skills through live instruction, guided resources, and progress-driven learning.

---

## ✨ Features

### Learning Hubs
- **Foundation Hub** — Elementary & Middle school fundamentals
- **Success Hub** — High School, IGCSE, SAT, A-Levels, IB, AP
- **Elite Hub** — Professional upskilling & mentorship  
- **Partner Hub** — Resources for parents & educators

### Core Platform
- **Real Authentication** — JWT with httpOnly cookies, bcrypt password hashing
- **Role-Based Access** — ADMIN and STUDENT roles with protected routes
- **Class Management** — Full CRUD for live tutoring sessions
- **Enrollment System** — Browse, enroll, and track participation
- **Progress Tracking** — Subject-based progress with visual stats
- **Attendance System** — Record and persist class attendance
- **Blog & SEO** — MDX-powered blog for content marketing
- **Admin Dashboard** — Revenue/growth analytics with charts
- **Lead Capture** — Email collection for marketing
- **Contact System** — Inquiry forms with email notifications

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Neon (Serverless PostgreSQL) |
| ORM | Prisma |
| Auth | JWT + bcrypt |
| Charts | Recharts |
| Email | Resend |
| Payments | Stripe (ready) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
edutrack-hub/
├── components/
│   ├── admin/           # Admin-specific components
│   ├── layout/          # Navigation, Footer
│   ├── marketing/       # LeadMagnet, etc.
│   └── ui/              # Icons, shared UI
├── content/
│   └── blog/            # MDX blog posts
├── hooks/
│   └── useAuth.js       # Auth context & HOC
├── lib/
│   ├── auth.js          # JWT, bcrypt, cookies, RBAC
│   ├── db.js            # Prisma client singleton
│   ├── mdx.js           # Blog post utilities
│   └── rate-limit.js    # API rate limiting
├── pages/
│   ├── index.jsx        # Homepage
│   ├── about.jsx        # About page with tutor photo
│   ├── classes.jsx      # Browse & enroll
│   ├── contact.jsx      # Contact form
│   ├── blog/            # Blog listing & posts
│   ├── hubs/            # Learning hub pages
│   ├── admin/           # Admin dashboard & management
│   ├── dashboard/       # Student dashboard
│   └── api/             # All API endpoints
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.js          # Seed script
├── public/
│   ├── logo.png         # Brand logo
│   └── gabriel-portrait.jpg  # Tutor photo
└── styles/
    └── globals.css      # Tailwind + custom styles
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Neon account (free tier works)

### 1. Clone & Install
```bash
git clone <your-repo>
cd edutrack-hub
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="postgresql://..." # From Neon dashboard
JWT_SECRET="..."                # Run: openssl rand -base64 32
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 👤 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@edutrackhub.com | admin123456 |
| Student | student@example.com | student123456 |

---

## 📊 Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Marketing landing page |
| About | `/about` | Meet the tutor |
| Classes | `/classes` | Browse & enroll |
| Blog | `/blog` | SEO content |
| Contact | `/contact` | Inquiry form |
| FAQ | `/faq` | Common questions |
| Hub Pages | `/hubs/[slug]` | Foundation, Success, Elite, Partner |
| Login | `/login` | Authentication |
| Signup | `/signup` | Registration |
| Student Dashboard | `/dashboard/student` | Progress & classes |
| Admin Dashboard | `/admin/dashboard` | Analytics & management |

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` — Create account
- `POST /api/auth/login` — Login
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Current user
- `POST /api/auth/forgot-password` — Password reset request
- `POST /api/auth/reset-password` — Reset password

### Classes
- `GET /api/classes` — List all classes
- `POST /api/classes` — Create class (admin)
- `GET /api/classes/[id]` — Class details
- `PUT /api/classes/[id]` — Update class (admin)
- `DELETE /api/classes/[id]` — Delete class (admin)

### User & Progress
- `GET /api/enrollments` — User's enrollments
- `POST /api/enrollments` — Enroll in class
- `GET /api/progress` — Learning progress
- `POST /api/attendance` — Record attendance

### Admin
- `GET /api/admin/stats` — Platform statistics
- `GET /api/admin/enrollments` — All enrollments
- `GET /api/admin/users` — User management
- `POST /api/admin/upload` — File uploads

### Other
- `POST /api/contact/send` — Contact form
- `POST /api/leads` — Email capture
- `GET /api/sitemap` — Dynamic sitemap

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel Dashboard](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)
   - `RESEND_API_KEY` (for emails)
   - `STRIPE_SECRET_KEY` (for payments)
4. Deploy!

### Post-Deployment
```bash
# Sync database schema (run locally with production DATABASE_URL)
npx prisma db push
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 📝 Adding Blog Posts

1. Create a new `.mdx` file in `content/blog/`
2. Add frontmatter:
```yaml
---
title: 'Your Post Title'
date: '2025-01-01'
description: 'SEO description'
tags: ['SAT', 'Math']
author: 'Gabriel'
---
```
3. Write content in Markdown
4. Deploy — it's automatic!

---

## 🛠 npm Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # Run ESLint
npm run db:push    # Push schema to database
npm run db:seed    # Seed sample data
npm run db:studio  # Visual database editor
```

---

## 📄 License

Private — All Rights Reserved

---

**Built with ❤️ for EduTrack Hub** | Optimized for Vercel + Neon
