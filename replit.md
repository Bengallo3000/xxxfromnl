# FromNL.pro - Premium Dutch Quality Shop

## Overview
FromNL.pro is a premium e-commerce platform showcasing Dutch quality products. The site features a dark-themed design with red accents and Dutch flag colors (red, white, blue).

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4 with custom theme
- **UI Components**: Radix UI + shadcn/ui
- **Package Manager**: pnpm
- **Port**: 5000

## Project Structure
```
app/
  page.tsx          # Homepage with hero, categories, products sections
  admin/page.tsx    # Admin panel with multi-tab interface
  products/page.tsx # Products listing page
  about/page.tsx    # About page
  layout.tsx        # Root layout with header/footer
  globals.css       # Global styles with dark theme

components/
  header.tsx        # Navigation header
  footer.tsx        # Site footer
  ui/               # shadcn/ui components

public/
  wallpaperfromnl_*.jpg  # Hero background image
  brande_es_als_*.jpg    # Secondary background
```

## Admin Panel
Access the admin panel at `/admin` with password: `demo123`

Available tabs:
- Navigation, Settings, Images, Products, Categories, Pages
- Banners, Header/Footer, Support, Crypto, Sales
- Spam Bot, Bot Config, Special Bot, Popups

## Environment Variables
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Admin panel password (default: demo123)

## Running the Project
```bash
pnpm dev  # Starts on port 5000
```

## Recent Changes
- 2025-12-28: Migrated from Vercel to Replit
- 2025-12-28: Restored FromNL design with dark theme, hero section, admin panel
