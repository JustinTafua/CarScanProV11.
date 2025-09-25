# CarScan Pro v11
Next.js PWA with AI camera scan, tiered memberships (Free, Base, Pro, Pro Max), Stripe checkout, AdSense, Affiliate links, Parts search, Store locator, About, Settings.

## Run
npm install
npm run dev

## Deploy (Vercel)
Import repo → Framework: Next.js  
Add ENV (Stripe):
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- NEXT_PUBLIC_STRIPE_PRICE_ID_BASE
- NEXT_PUBLIC_STRIPE_PRICE_ID_PRO
- NEXT_PUBLIC_STRIPE_PRICE_ID_PROMAX
- NEXT_PUBLIC_BASE_URL
