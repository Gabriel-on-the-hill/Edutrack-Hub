# EduTrack Hub v2.0 - Phase 1 Complete

A production-ready live tutoring platform built with Next.js, Prisma, and Neon (Serverless PostgreSQL).

## 🎯 Phase 1 Features

### ✅ Core Features Implemented
- **Real Authentication** - JWT with httpOnly cookies, bcrypt password hashing
- **Role-Based Access** - ADMIN and STUDENT roles with protected routes
- **Class Management** - Full CRUD for tutoring sessions
- **Enrollment System** - Browse, enroll, and track class participation
- **Progress Tracking** - Track learning progress by subject with stats
- **Attendance System** - Record and persist class attendance
- **Audit Trail** - Log admin actions for accountability
- **Real Data** - All features use actual database, no mocks

### 🏗️ Tech Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Prisma
- **Auth**: JWT + bcrypt

## 📁 Project Structure

```
edutrack-hub/
├── components/           # Reusable UI components
├── hooks/
│   └── useAuth.js       # Auth hook, context, withAuth HOC
├── lib/
│   ├── auth.js          # JWT, bcrypt, cookies, RBAC
│   ├── db.js            # Prisma client singleton
│   ├── audit.js         # Audit logging utility
│   └── brandTokens.js   # Design tokens
├── pages/
│   ├── _app.jsx         # App wrapper with AuthProvider
│   ├── index.jsx        # Homepage
│   ├── login.jsx        # Login page
│   ├── signup.jsx       # Signup page
│   ├── classes.jsx      # Browse & enroll in classes
│   ├── admin/
│   │   ├── dashboard.jsx  # Admin overview + stats
│   │   └── classes.jsx    # Manage classes (CRUD)
│   ├── dashboard/
│   │   └── student.jsx    # Student dashboard + progress
│   └── api/
│       ├── auth/          # signup, login, logout, me
│       ├── classes/       # CRUD + list
│       ├── enrollments/   # Student enrollments
│       ├── progress/      # Progress tracking
│       ├── attendance/    # Attendance recording
│       ├── admin/         # Admin stats, enrollments
│       └── contact/       # Contact form
├── prisma/
│   ├── schema.prisma    # PostgreSQL schema
│   └── seed.js          # Seed script
├── public/              # Static assets
├── styles/
│   └── globals.css      # Tailwind + custom styles
└── .env.example         # Environment template
```

## 🚀 Quick Start

### 1. Create Neon Database (Free)

1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project called `edutrack`
3. Go to **Dashboard** → **Connection Details**
4. Copy the connection string (starts with `postgresql://`)

### 2. Local Setup

```bash
# Clone/extract the project
cd edutrack-hub

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your values:
# DATABASE_URL="postgresql://..."  (from Neon)
# JWT_SECRET="..."  (run: openssl rand -base64 32)

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npm run db:seed

# Start development server
npm run dev
```

### 3. Access the App

| Page | URL |
|------|-----|
| Homepage | http://localhost:3000 |
| Browse Classes | http://localhost:3000/classes |
| Login | http://localhost:3000/login |
| Student Dashboard | http://localhost:3000/dashboard/student |
| Admin Dashboard | http://localhost:3000/admin/dashboard |

## 👤 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@edutrackhub.com | admin123456 |
| Student | student@example.com | student123456 |
| Student | jane@example.com | student123456 |

## 📊 Database Schema

### Models
- **User** - Students and admins
- **Class** - Live tutoring sessions
- **Enrollment** - Student-class relationships
- **Attendance** - Class attendance records
- **Progress** - Learning progress by subject
- **Payment** - Payment records (Phase 2)
- **Resource** - Downloadable content
- **AuditLog** - Admin action history
- **ContactMessage** - Contact form submissions

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Create account |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| GET | /api/auth/me | Get current user |

### Classes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/classes | List classes |
| POST | /api/classes | Create class (admin) |
| GET | /api/classes/[id] | Get class details |
| PUT | /api/classes/[id] | Update class (admin) |
| DELETE | /api/classes/[id] | Delete class (admin) |

### Enrollments & Progress
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/enrollments | Get user's enrollments |
| POST | /api/enrollments | Enroll in a class |
| GET | /api/progress | Get learning progress |
| POST | /api/attendance | Record attendance |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/stats | Platform statistics |
| GET | /api/admin/enrollments | All enrollments |

## 🌐 Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL` (Neon connection string)
   - `JWT_SECRET` (your secret key)
4. Deploy!

## ✅ Phase 1 Checklist

- [x] Neon PostgreSQL database
- [x] Real authentication (signup, login, logout)
- [x] JWT with httpOnly cookies
- [x] Password hashing with bcrypt
- [x] Role-based access control (ADMIN, STUDENT)
- [x] Classes API with full CRUD
- [x] Enrollments API with status tracking
- [x] Progress tracking by subject
- [x] Attendance recording system
- [x] Admin dashboard with real stats
- [x] Student dashboard with progress visualization
- [x] Audit trail for admin actions
- [x] Public classes page with enrollment
- [x] Database seed script with sample data
- [x] Build verified with zero errors

- [x] Class recordings & notes (Basic URL fields added)
- [x] Resource downloads (Lead Magnet added)
- [x] Advanced analytics (Admin Dashboard)
- [x] Blog & SEO System

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | Neon PostgreSQL connection string | Yes |
| JWT_SECRET | Secret for JWT (min 32 chars) | Yes |
| NEXT_PUBLIC_APP_URL | Your app URL | No |

## 🛠️ npm Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run db:push   # Push schema to database
npm run db:seed   # Seed database
npm run db:studio # Open Prisma Studio
```

---

**Built for EduTrack Hub** | Optimized for Vercel + Neon | Phase 1 Complete ✅
