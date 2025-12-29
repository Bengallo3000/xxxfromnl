# TechVerseHub.xyz - Premium Software & Tools Shop

## Overview
TechVerseHub.xyz is a premium e-commerce platform for software and digital tools. The site features a dark-themed design with cyan and purple gradient accents.

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
  products/page.tsx  # Products listing from database with search
  layout.tsx         # Root layout with header/footer
  globals.css        # Global styles with dark theme
  api/
    init/            # Database initialization
    navigation/      # Navigation CRUD API
    images/          # Image upload API
    products/        # Products CRUD API
    pages/           # Pages CRUD API
    admin/login/     # Admin authentication API
    admin/password/  # Admin password change API

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
  techverse-logo.jpg # Site logo
  techverse-wallpaper.png # Branding wallpaper
  hero-bg.png        # Hero background
```

## Admin Panel CMS
Access at `/admin` with password: `demo123`

**All tabs are functional with persistent database storage:**
- **Navigation**: Add/delete header navigation links
- **Settings**: Shop name, slogan, contact email
- **Security**: Change admin password (server-side authenticated)
- **Images**: Upload images to library
- **Products**: Create products with image upload, category selection
- **Categories**: Create/delete categories (shown in shop filter)
- **Pages**: Create custom pages with content
- **Banners**: Add banners to header/footer for backlinks (various sizes)
- **Popups**: Create promotional popups (Black Friday, sales) - banner, modal, floating, slide types
- **Header/Footer**: Customize colors, logo, footer text, copyright
- **Support**: Configure messenger session ID for support button
- **Crypto**: Add crypto wallet addresses for checkout payments
- **Orders**: View and manage customer orders with status updates
- **Payments**: Track and manage payment transactions
- **Themes**: Choose from 5 pre-designed shop themes
- **Telegram Bot**: Manage orders and products via Telegram bot

## Environment Variables
- `ADMIN_PASSWORD`: Server-side admin password (default: demo123)
- `DATABASE_URL`: PostgreSQL connection string

## Running the Project
```bash
pnpm dev  # Starts on port 5000
```

## Features
- **Product Search**: Search products by name, description, or category on /products page
- **Server-side Authentication**: Admin login and password changes are verified server-side
- **Password Change**: Admin can change password via Security tab (stored in database)

## Recent Changes
- 2025-12-29: Rebranded to TechVerseHub.xyz with new logo and hero images
- 2025-12-29: Added product search functionality to /products page
- 2025-12-29: Added Security tab for password change in admin panel
- 2025-12-29: Implemented server-side admin authentication
- 2025-12-29: Updated all SEO metadata and Open Graph tags
- 2025-12-28: Added Popups management for promotional banners
- 2025-12-28: Enhanced Matrix rain effect
- 2025-12-28: Added Free Products feature with toggle in Settings
- 2025-12-28: Added Orders and Payments management
- 2025-12-28: Added Telegram bot integration
- 2025-12-28: Added Shop Themes with 5 pre-made designs
