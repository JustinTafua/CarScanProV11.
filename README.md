# CarScan Pro — Fixed Garage Edition

This project is a Next.js app that keeps your **garage background EXACTLY the same**
and varies only the **Skyline color, rim overlay, and floor tools** as users move through pages.

- Pages: Home, Scan, Guides (+ detail), Tutorial, Assistant, Pricing, About, Settings, Privacy, Terms, Feedback
- Camera Scan: Start / Flip / Torch / Zoom / Snapshot
- Assistant: Works offline with built-in tips; set OPENAI_API_KEY for smarter answers
- Fixed Garage: Upload your one image to `public/garage/bg.jpg`. Only car/rims/tools change.

## Run locally
```bash
npm install
npm run dev
```

## Deploy (Vercel)
1) Push to GitHub
2) Import to Vercel → Project Settings → Environment Variables (optional):
   - OPENAI_API_KEY = sk-...
   - OPENAI_MODEL = gpt-4o-mini
3) Deploy

## Upload your assets
- Fixed background (required): `public/garage/bg.jpg`
- Car cutout (optional): `public/garage/car_base.png` (transparent, 1992 Skyline R32 sedan)
- Rims: `public/garage/rims/*.png` (transparent)
- Tools: `public/garage/tools/*.png` (transparent)
