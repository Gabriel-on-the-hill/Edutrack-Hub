# EduTrack Hub — Owner's Guide

Welcome! This guide helps you manage your EduTrack Hub platform day-to-day.

---

## 🚀 Getting Started

### Running Locally
```bash
npm run dev
```
Access at [http://localhost:3000](http://localhost:3000)

### Admin Login
1. Go to `/login`
2. Use your admin credentials
3. Access `/admin/dashboard`

---

## 📊 Admin Dashboard

The dashboard gives you real-time insights into your platform.

### Overview Cards
- **Total Revenue** — All-time earnings
- **Total Students** — Registered users
- **Active Classes** — Current sessions
- **Enrollments** — Total class signups

### Charts
- **Revenue Trend** — Last 6 months income
- **Student Growth** — Monthly signups

### Currency Toggle
Switch between **NGN** (Naira) and **USD** (Dollars) using the toggle in the top-right. USD is estimated based on a fixed exchange rate.

### Quick Actions
- **New Class** — Schedule a live tutoring session
- **Find Student** — Search the student database
- **Upload Resource** — Add downloadable materials

---

## 📅 Managing Classes

### Create a New Class
1. Go to Admin Dashboard → **New Class** (or `/admin/classes`)
2. Fill in:
   - **Title** — e.g., "IGCSE Math: Algebra"
   - **Subject** — e.g., "Mathematics"
   - **Curriculum** — IGCSE, A-Level, SAT, IB, or AP
   - **Day & Time** — When the class runs
   - **Max Students** — Class size limit (recommend 6-8)
   - **Price** — In your primary currency
3. Click **Create Class**

### Edit or Delete Classes
- From the classes list, use the action menu on each class
- Editing updates the class for all enrolled students
- Deleting removes the class (enrollments are preserved in records)

---

## 👥 Managing Students

### View All Students
Go to `/admin/students` to see:
- Student list with search
- Enrollment history per student
- Account status

### Student Enrollments
Access `/admin/dashboard` → **Enrollments** tab to see:
- All enrollments across classes
- Filter by status (Active, Completed, Cancelled)
- Payment status

---

## 📝 Managing the Blog

The blog uses **MDX** (Markdown + React components) for SEO-optimized content.

### Adding a New Post

1. Navigate to `content/blog/` in your project
2. Create a new `.mdx` file (e.g., `igcse-math-tips.mdx`)
3. Add frontmatter at the top:

```yaml
---
title: 'Top 10 IGCSE Math Tips'
date: '2025-01-15'
description: 'Essential strategies for scoring A* in IGCSE Mathematics.'
tags: ['IGCSE', 'Math', 'Study Tips']
author: 'Gabriel'
---
```

4. Write your content using Markdown:

```markdown
## Introduction

Start with a hook that draws readers in...

## Tip 1: Master the Basics

Content here...

## Conclusion

Wrap up with a call to action.
```

5. **Publish**: Save the file and deploy — it appears automatically!

### Best Practices for Blog SEO
- Use descriptive titles with keywords
- Write compelling meta descriptions (the `description` field)
- Include relevant tags
- Use headers (H2, H3) to structure content
- Aim for 800-1500 words per post
- Add internal links to your classes page

---

## 📧 Lead Management

### Viewing Leads
Leads captured from the homepage email signup are stored in the database.

To view leads:
1. Open Prisma Studio: `npx prisma studio`
2. Navigate to the **Lead** table
3. Export as needed

### Email Marketing
Consider connecting your leads to:
- Mailchimp
- ConvertKit
- Resend for transactional emails

---

## 💳 Payments (Stripe)

### Viewing Payments
1. Go to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Check Payments → All payments
3. View detailed transaction history

### Refunds
1. Find the payment in Stripe Dashboard
2. Click the payment → **Refund**
3. The system automatically updates enrollment status

---

## 🛠 Maintenance

### Updating Content
Most content changes require a redeploy:
1. Make changes locally
2. Test with `npm run dev`
3. Push to GitHub
4. Vercel auto-deploys

### Database Management
```bash
# Open visual database editor
npx prisma studio

# Backup considerations
# Neon automatically handles backups
# For manual export, use pg_dump with your connection string
```

### Updating Dependencies
```bash
# Check for updates
npm outdated

# Update all packages
npm update

# For major updates (test thoroughly!)
npx npm-check-updates -u
npm install
```

---

## 🔧 Common Tasks

### Reset a Student's Password
1. Go to database (Prisma Studio)
2. Find the user
3. They should use "Forgot Password" flow
4. Or manually update the password hash

### Change Class Schedule
1. Edit the class in Admin Dashboard
2. Students see updated times immediately
3. Consider emailing enrolled students about changes

### Add a New Admin
1. Create a regular account via signup
2. In Prisma Studio, change their `role` to `ADMIN`
3. They can now access admin features

---

## 📞 Support Contacts

### Technical Issues
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for troubleshooting
- Vercel status: [status.vercel.com](https://status.vercel.com)
- Neon status: [neon.tech/status](https://neon.tech/status)

### Platform Issues
- Review error logs in Vercel Dashboard
- Check browser console for frontend errors
- Database issues: Check Neon dashboard

---

## 📋 Quick Reference

| Task | Location |
|------|----------|
| View analytics | `/admin/dashboard` |
| Manage classes | `/admin/classes` |
| View students | `/admin/students` |
| Add blog post | `content/blog/` folder |
| View database | `npx prisma studio` |
| Deploy changes | Push to GitHub |

---

**EduTrack Hub** | Owner's Operations Guide
