# Deployment (Astro Static)

This project now runs as an Astro static site.

## Local preview

1. Install dependencies:
   - `npm install`
2. Start dev server:
   - `npm run dev`
3. Preview production build:
   - `npm run build`
   - `npm run preview`

## Production build output

- Build command: `npm run build`
- Output directory: `dist/`

## Apache/cPanel hosting

1. Run `npm run build`.
2. Upload everything inside `dist/` to your web root (`public_html`).
3. Keep `.htaccess` in the root of uploaded files (generated from `public/.htaccess`).

## Notes

- Static assets live in `public/` and are served as-is.
- Pages are in `src/pages/*.astro`.
- Canonical site URL is configured in `astro.config.mjs` as `https://bharatjewellers.ca`.
