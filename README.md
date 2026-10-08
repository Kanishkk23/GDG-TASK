# Google Developer Groups (GDG) - RBU Student Chapter Website

An exact, pixel-perfect, and fully functional full-stack web implementation of the official **GDG Student Chapter Figma Design** for **Ramdeobaba University (RBU)**.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and integrated with full-stack backend API routes for event management, registration pass generation, and community contact.

---

## Key Features

### 1. Neo-Brutalist & Figma Pixel-Fidelity Design
- **Exact Visual Conversion**: Faithfully converts every section from the [Figma Design](https://www.figma.com/design/a8CZ4WnoYXeXN6r9RxFzhr/GDG-Frotend-Task):
  - **Retro-Tech Display Typography**: Blocky, vintage-tech headlines paired with clean sans-serif body copy.
  - **Signature Google Brand Palette**: Blue (`#4285F4`), Red (`#EA4335`), Yellow (`#FBBC04`), and Green (`#34A853`).
  - **Neo-Brutalist Cards & Shadows**: High-contrast black borders, crisp offset box shadows (`4px 4px 0px #000`), and tactile click animations.
  - **Geometric Google Developer Pattern**: Authentic geometric shape bottom banner matching GDG identity.
  - **Real Chapter Photography**: Extracted and framed team photo directly from the Figma canvas.

### 2. Dark & Light Mode System
- High-contrast **Dark Mode** toggle with automatic system preference detection.
- Zero-flicker state persistence in `localStorage`.
- Custom neo-brutalist styling tuned for dark aesthetics with elevated borders and neon accents.

### 3. Fully Responsive (Mobile, Tablet, Desktop)
- Smooth navigation across all screen sizes (mobile <640px, tablet 768px, desktop 1024px+).
- Interactive mobile hamburger navigation drawer with color-coded category pills.
- Adaptive grid layouts for event cards and FAQs.

### 4. Full-Stack Backend API Routes
- **`/api/events` (GET)**: Fetches upcoming and featured GDG events with attendee caps and metadata.
- **`/api/register` (POST / GET)**: 
  - Validates student details (Name, College Email, Department, Year, Interest Tracks).
  - Prevents duplicate signups.
  - Generates a unique, verifiable digital ticket ID (e.g. `GDG-RBU-XXXXX-1234`).
  - Returns digital ticket confirmation instantly to the frontend modal.
- **`/api/faqs` (GET)**: Dynamically serves chapter frequently asked questions.
- **`/api/contact` (POST)**: Community query submission endpoint.

### 5. Interactive Event Pass Registration Modal
- Click **"Register Now"** on the yellow event card or **"Join Us"** in the Hero.
- Interactive modal with real-time validation, multi-track selection, and instant digital pass display.

---

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict mode enabled)
- **Styling**: Tailwind CSS with custom Neo-brutalist configuration
- **Icons**: Lucide React
- **Fonts**: Google Fonts (`Silkscreen`, `Space Grotesk`, `Inter`)
- **Deployment Targets**: Vercel (recommended), Netlify, Render

---

## Repository Structure

```
gdg-rbu-website/
├── public/
│   └── assets/
│       ├── gdg-logo.svg              # Vector Google Developer Groups bracket logo
│       ├── google-shapes-pattern.svg # Google geometric pattern footer banner
│       └── team_photo.png            # GDG RBU student chapter photograph
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts      # Contact query endpoint
│   │   │   ├── events/route.ts       # Events catalog endpoint
│   │   │   ├── faqs/route.ts         # FAQs endpoint
│   │   │   └── register/route.ts     # Ticket generation & registration endpoint
│   │   ├── globals.css               # Tailwind & neo-brutalist design tokens
│   │   ├── layout.tsx                # App root layout, meta tags & fonts
│   │   └── page.tsx                  # Landing page composing all Figma sections
│   ├── components/
│   │   ├── FaqSection.tsx            # Accordion component with 5 Figma questions
│   │   ├── Footer.tsx                # Chapter cards, social links & geometric banner
│   │   ├── Hero.tsx                  # Hero section with interactive terminal CLI
│   │   ├── Navbar.tsx                # Multi-color pill badges & responsive drawer
│   │   ├── RegistrationModal.tsx     # Full modal form with instant ticket generation
│   │   ├── TeamSection.tsx           # Mission callouts, framed photo & lead cards
│   │   ├── ThemeToggle.tsx           # Dark/Light mode toggle button
│   │   └── UpcomingEvent.tsx         # Dual brutalist event cards (Orientation & Yellow)
│   ├── lib/
│   │   └── store.ts                  # In-memory database store for events & passes
│   └── types/
│       └── index.ts                  # TypeScript interfaces for API & UI models
├── vercel.json                       # Deployment configuration for Vercel
├── tailwind.config.ts                # Custom colors, fonts, shadows
├── tsconfig.json
├── package.json
└── README.md
```

---

## Getting Started Locally

### Prerequisites
- Node.js (v18.0 or newer)
- npm or yarn or pnpm

### 1. Installation
```bash
git clone <your-repo-url>
cd gdg-rbu-website
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import your GitHub repository `gdg-rbu-website`.
4. Vercel automatically detects Next.js:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. Click **Deploy**. Your site will be live with serverless API routes within 1 minute!

### Deploying to Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Set build command to `npm run build`.
3. Set publish directory to `.next`.

### Deploying to Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your repo and set environment to `Node`.
3. Set build command: `npm install && npm run build`.
4. Set start command: `npm start`.
