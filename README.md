# Noor Store - Haute Beauté

A luxurious e-commerce platform for curated beauty products and botanical skincare, built with Next.js, Prisma, and Tailwind CSS.

## Features

- **Modern Storefront**: Beautifully designed user interface featuring a luxury aesthetic (Rose/Gold palette) with fluid micro-animations.
- **WhatsApp Integration**: Seamless checkout and direct customer support through WhatsApp.
- **Admin Dashboard**: Comprehensive products management portal to control inventory, pricing, and product visibility.
- **Shopping Cart**: Client-side state cart with persistent local storage.
- **Authentication**: Secure email/password authentication via NextAuth.js.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: NextAuth.js
- **Icons**: Google Material Symbols

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables in `.env` and `.env.dev`:
   ```
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="..."
   NEXTAUTH_URL="http://localhost:3000"
   ```
4. Run database migrations: `npx prisma db push`
5. Start development server: `npm run dev`

## Design Aesthetic
Adapted from a premium, modern design system featuring sophisticated typography (Playfair Display + Plus Jakarta Sans) and elegant minimalist components.
