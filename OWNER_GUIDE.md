# EduTrack Hub - Owner's Guide

## 🚀 Getting Started

### 1. Run Locally
To start the development server:
```bash
npm run dev
```
Access the site at `http://localhost:3000`.

### 2. Admin Access
- \*\*Login\*\*: Go to `/login`.
- \*\*Credentials\*\*: Use the admin account created during setup (or create one in the database with `role: 'ADMIN'`).
- \*\*Dashboard\*\*: Access `/admin/dashboard`.

---

## 📊 Admin Dashboard

The dashboard provides a real-time overview of your platform.

### Key Features
1.  **Revenue & Growth**:
    - **Revenue Trend**: Visualizes income over the last 6 months.
    - **Student Growth**: Tracks new signups.
2.  **Currency Toggle**:
    - Use the toggle in the top-right to switch between **NGN** (Naira) and **USD** (Dollars).
    - *Note*: USD values are estimated based on a fixed rate.
3.  **Quick Actions**:
    - **New Class**: Schedule a live session.
    - **Find Student**: Search the student database.

---

## 📝 Managing the Blog

The blog is built using **MDX** (Markdown + React). This is excellent for SEO.

### Adding a New Post
1.  Navigate to `content/blog/` in your project folder.
2.  Create a new file ending in `.mdx` (e.g., `my-new-post.mdx`).
3.  Add the **Frontmatter** at the top:
    ```yaml
    ---
    title: 'Your Post Title'
    date: '2025-XX-XX'
    description: 'A short summary for SEO and the preview card.'
    tags: ['Tag1', 'Tag2']
    author: 'Gabriel'
    ---
    ```
4.  Write your content below using Markdown.
5.  **Publish**: Just save the file and deploy!

---

## 🛠 Maintenance

### Updating Dependencies
Run `npm update` to keep packages fresh.

### Database
- **View Data**: Run `npx prisma studio` to open a visual database editor.
- **Backup**: Your data is safe in the Neon cloud, but you can export it via the Prisma CLI if needed.
