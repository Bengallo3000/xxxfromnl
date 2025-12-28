# FromNL.pro - Premium Dutch Quality Shop

## Overview
FromNL.pro is a premium e-commerce platform showcasing Dutch quality products. The site features a dark-themed design with red accents and Dutch flag colors (red, white, blue).

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Database**: PostgreSQL (Neon-backed via Replit)
- **Styling**: Tailwind CSS 4 with custom theme
- **UI Components**: Radix UI + shadcn/ui
- **Package Manager**: pnpm
- **Port**: 5000

## Project Structure
```
app/
  page.tsx           # Homepage with hero, dynamic products
  admin/page.tsx     # Admin CMS panel
  products/page.tsx  # Products listing from database
  layout.tsx         # Root layout with header/footer
  globals.css        # Global styles with dark theme
  api/
    init/            # Database initialization
    navigation/      # Navigation CRUD API
    images/          # Image upload API
    products/        # Products CRUD API
    pages/           # Pages CRUD API

lib/
  db.ts              # Database connection and schema
  auth.ts            # Admin authentication helper

components/
  header.tsx         # Dynamic navigation from database
  footer.tsx         # Site footer
  ui/                # shadcn/ui components

public/
  uploads/           # Uploaded images storage
  fromnl-logo.png    # Site logo
  fromnl-wallpaper.jpg # Hero background
```

## Admin Panel CMS
Access at `/admin` with password: `demo123`

**Functional tabs:**
- **Navigation**: Add/delete header navigation links (persisted)
- **Images**: Upload images to library (persisted)
- **Products**: Create products with image upload (shown in shop)
- **Pages**: Create custom pages with content

**Other tabs** (UI only, not yet functional):
- Settings, Categories, Banners, Header/Footer, Support
- Crypto, Sales, Spam Bot, Bot Config, Special Bot, Popups

## Environment Variables
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Client-side login check (default: demo123)
- `ADMIN_PASSWORD`: Server-side API authentication
- `DATABASE_URL`: PostgreSQL connection string

## Running the Project
```bash
pnpm dev  # Starts on port 5000
```

## Recent Changes
- 2025-12-28: Added PostgreSQL database with CMS functionality
- 2025-12-28: Admin panel now has working forms for navigation, images, products, pages
- 2025-12-28: Homepage and products page now display data from database
- 2025-12-28: Added server-side API authentication
- 2025-12-28: Migrated from Vercel to Replit
- 2025-12-28: Restored FromNL design with dark theme, hero section
