# SEIIKI - PT. Solusi Energi Kelistrikan Indonesia

## Overview
This is a Next.js application for SEIIKI (PT. Solusi Energi Kelistrikan Indonesia), which provides services related to electrical safety certification (SLO - Sertifikat Laik Operasi).

## Project Architecture
- **Frontend**: Next.js 15.3.3 with TypeScript
- **UI Framework**: Tailwind CSS with Radix UI components
- **Database**: PostgreSQL with Prisma ORM (fully connected and seeded)
- **Icons**: Lucide React
- **Carousel**: Embla Carousel
- **Form Handling**: React Hook Form with Zod validation

## Features
- Professional landing page with hero carousel
- Navigation with dropdown menus for various services
- Service sections for SLO (electrical certification) services
- Contact and company profile pages
- Dashboard functionality for user management
- Responsive design with mobile-first approach

## Database Configuration
- **Type**: External PostgreSQL (NOT Replit built-in postgres module)
- **Connection**: Configured via `DATABASE_URL` environment secret (points to external host)
- **ORM**: Prisma — run `npx prisma db push` to sync schema, `npm run seed` to seed data
- The `postgresql-16` Replit module is intentionally NOT used; the app connects to an external managed PostgreSQL instance via `DATABASE_URL`.

## Required Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (external managed DB, already configured as secret)
- `JWT_SECRET` — Secret for signing auth tokens (already configured as secret)

## Recent Changes (July 7, 2026)
- ✅ Installed all project dependencies via npm
- ✅ Pushed Prisma schema to external PostgreSQL database
- ✅ Seeded database with initial data (admin users, hero slides, services, products, etc.)
- ✅ Started frontend development server on port 5000
- ✅ Fixed path traversal vulnerability in `/api/uploads/[...path]`
- ✅ Fixed broken RBAC on `/api/konsultasi/[id]/status` (now requires ADMIN or ADMIN_KONSULTASI role)
- ✅ Hardened `/api/konsultasi/[id]/payment` with file validation and submission state check

## Development Setup
The application is configured to run on:
- Host: 0.0.0.0 (allowing Replit proxy access)
- Port: 5000 (required for Replit environment)
- Dev command: `npm run dev`
- Environment: JWT_SECRET configured in .env.local
- Database: PostgreSQL connected via DATABASE_URL

## User Preferences
- The project uses Indonesian language for content
- Professional business theme with electrical industry focus (SEIIKI - PT. Solusi Energi Kelistrikan Indonesia)
- Uses modern UI components and responsive design
- Authentication system for user management
- Content management system for dynamic content

## File Structure
- `/src/app/` - Next.js App Router pages and API routes
- `/src/components/` - Reusable UI components (auth, layout, UI)
- `/src/lib/` - Utility functions, authentication, database configurations
- `/src/hooks/` - Custom React hooks
- `/src/contexts/` - React context providers
- `/prisma/` - Database schema and seed files
- `/docs/` - Project documentation

## Current Status
✅ Project fully imported and operational
✅ Frontend server running successfully on port 5000
✅ All dependencies installed and configured
✅ Database connected and schema deployed
✅ Authentication system configured
✅ Deployment configuration completed
✅ Ready for production deployment