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
  page.tsx           # Homepage with hero, Matrix effect, products
  enter/page.tsx     # Captcha entry page with Matrix effect
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
  matrix-effect.tsx  # Matrix rain effect background
  ui/                # shadcn/ui components

public/
  uploads/           # Uploaded images storage
  fromnl-logo.png    # Site logo
  fromnl-wallpaper.jpg # Hero background
```

## Admin Panel CMS
Access at `/admin` with password: `demo123`

**All tabs are functional with persistent database storage:**
- **Navigation**: Add/delete header navigation links
- **Settings**: Shop name, slogan, contact email
- **Images**: Upload images to library
- **Products**: Create products with image upload, category selection
- **Categories**: Create/delete categories (shown in shop filter)
- **Pages**: Create custom pages with content
- **Banners**: Add banners to header/footer for backlinks (various sizes)
- **Header/Footer**: Customize colors, logo, footer text, copyright
- **Support**: Configure messenger session ID for support button
- **Crypto**: Add crypto wallet addresses for checkout payments
- **Orders**: View and manage customer orders with status updates
- **Payments**: Track and manage payment transactions
- **Themes**: Choose from 5 pre-designed shop themes
- **Telegram Bot**: Manage orders and products via Telegram bot

## Environment Variables
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Client-side login check (default: demo123)
- `ADMIN_PASSWORD`: Server-side API authentication
- `DATABASE_URL`: PostgreSQL connection string

## Running the Project
```bash
pnpm dev  # Starts on port 5000
```

## Recent Changes
- 2025-12-28: Added Matrix rain effect as subtle shop background
- 2025-12-28: Added Captcha entry page (/enter) with Matrix effect for age verification
- 2025-12-28: Added Free Products feature with toggle in Settings and separate display section
- 2025-12-28: Products can now be marked as "Free" (GRATIS) with separate styling
- 2025-12-28: Added Orders management with status tracking (new, confirmed, processing, shipped, delivered, cancelled)
- 2025-12-28: Added Payments management with transaction tracking
- 2025-12-28: Added Telegram bot integration for managing orders/products via Telegram
- 2025-12-28: Added Shop Themes with 5 pre-made designs (Dark Red, Ocean Blue, Forest Green, Royal Purple, Sunset Orange)
- 2025-12-28: Enhanced hero text - larger/bolder with stronger Dutch flag colors (red/white/blue)
- 2025-12-28: Added Categories management with shop filtering
- 2025-12-28: Added Banners system for header/footer with various sizes for backlinks
- 2025-12-28: Added Header/Footer customization (colors, logo, text)
- 2025-12-28: Added Support messenger integration with floating button
- 2025-12-28: Added Crypto wallet management for checkout payments
- 2025-12-28: Added PostgreSQL database with CMS functionality
- 2025-12-28: Admin panel now has working forms for all features
- 2025-12-28: Homepage and products page now display data from database
- 2025-12-28: Added server-side API authentication
- 2025-12-28: Migrated from Vercel to Replit
- 2025-12-28: Restored FromNL design with dark theme, hero section
