# Velcura Hygiene — Ecommerce Platform

> Skincare Science Meets Everyday Cleansing

A full-stack ecommerce web application for Velcura Hygiene, a skincare brand based in Ahmedabad, India.

## Live Site
[velcurahygiene.in](https://velcurahygiene.in)

## Tech Stack
- **Frontend**: React 18, Vite, Framer Motion, React Query, React Router v6
- **Backend**: Node.js, Express
- **Styling**: CSS custom properties (design tokens), DM Sans + Playfair Display
- **State**: React Context (Cart, Wishlist, Compare)
- **Deployment**: Vercel (frontend), localhost.run tunnel (backend dev)

## Features
- Product catalog with filtering, sorting, and search
- Cart with localStorage persistence, coupon codes, quantity controls
- Wishlist with localStorage persistence
- Product comparison (up to 3 products)
- Skin type quiz with product recommendations
- Product reviews with rating breakdown
- Order tracking page
- Rewards widget
- Admin dashboard (/admin, password: velcura2025)
- Blog / Journal (/journal)
- Ingredient glossary (/ingredients)
- PWA manifest
- SEO: react-helmet-async, JSON-LD schema, sitemap, robots.txt
- Full keyboard accessibility

## Local Development
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend  
cd backend
npm install
node server.js
```

## Environment Variables
Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000
```

## Admin Access
Visit `/admin` and enter password `velcura2025`

## Coupon Codes
- `VELCURA10` — 10% off
- `WELCOME20` — 20% off
- `SKIN15` — 15% off
