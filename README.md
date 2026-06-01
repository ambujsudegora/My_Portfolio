# Ambuj Kumar Rai Portfolio

Production-ready React + Vite portfolio deployed on Netlify.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Netlify Functions
- EmailJS

## Local Setup

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

Netlify publish directory: `dist`

## Environment Variables

Create a local `.env`. Do not commit real secret values.

```env
VITE_SERVICE_ID=
VITE_TEMPLATE_ID=
VITE_PUBLIC_KEY=
VITE_CONTACT_EMAIL=
VITE_LEETCODE_API_URL=/api/leetcode
```

For Netlify, add the same variables in:

`Site settings -> Environment variables`

## Project Structure

```text
src/
  assets/          app-bundled images
  components/      shared UI components
  sections/        page sections
public/
  award/           achievement screenshots
  certifications/  certification screenshots
  cv/              resume PDF
netlify/
  functions/       serverless API functions
```
