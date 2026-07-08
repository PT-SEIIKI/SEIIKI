# SEIIKI – PT. Solusi Energi Kelistrikan Indonesia

A Next.js 15 company website for SEIIKI, a provider of Sertifikat Laik Operasi (SLO) and electrical installation services in Indonesia.

## Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Database:** PostgreSQL 16 via Prisma ORM
- **Styling:** Tailwind CSS + Radix UI components
- **Auth:** JWT-based (jose/jsonwebtoken), session via cookies
- **Animations:** Framer Motion

## How to run
The `Frontend Server` workflow runs `npm run dev` on port 5000.

## Database setup
```bash
npx prisma migrate deploy   # apply migrations
npm run seed                # seed default content and admin users
```

Seeded admin accounts are created by `prisma/seed.js`. Default credentials are in that file — **change them before going to production**.

## Key routes
- `/` — public homepage
- `/login` — admin login
- `/dashboard` — admin dashboard (protected)
- `/api/*` — REST API routes

## Environment variables
All set in `.replit` `[userenv.shared]`. `DATABASE_URL` is auto-provided by Replit's PostgreSQL integration.

## User preferences
