# Google Developer Groups (GDG) - RBU Chapter Platform

A full-stack, responsive web application for the official **Google Developer Groups (GDG) On Campus Chapter** at **Ramdeobaba University (RBU)**. Built with modern neo-brutalist styling, sleek minimal rectangular UI elements, subtle developer background grid blocks, and a robust backend event registration and verification system.

Built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **QRCode**.

---

## 🌟 Key Highlights & Features

### 1. Frontend & Design System
- **Pixel-Fidelity & Modern Neo-Brutalism**: High-contrast borders, solid tactile drop shadows, and clean typography.
- **Sleek Minimal Rectangular Buttons**: Standardized `rounded-[4px]` geometry across all buttons with smooth micro-interaction hover transitions.
- **Background Grid Blocks**: Geometric square grid pattern (`36px × 36px`) across the webpage background in both light and dark mode.
- **Chapter Core Leads & Domains**: Showcases all 7 official domain leads with individual compact LinkedIn profile buttons:
  - **Rohit Agrawal** — Web Lead (`Web dev`)
  - **Vivian Demello** — MAC Lead (`MAC`)
  - **Gayatri Donode** — Design Lead (`Design`)
  - **Jagravi Bisen** — Marketing Lead (`Marketing`)
  - **Saarth Meshram** — Management Lead (`Management`)
  - **Arshpreet Puri** — Socials Lead (`Socials`)
  - **Adarsh Jha** — Competitive Programming Lead (`CP`)
- **Official GDG Socials**: Direct redirection to official chapter profiles for **Instagram**, **LinkedIn**, and **Twitter/X (@gdsc_rcoem)**.
- **Dark & Light Mode**: Instant zero-flash theme toggle with persistent state.

---

### 2. Event Registration & Scannable QR Pass System
- **Flagship Orientation Registration**: Directly register for the active event (**GDG ORIENTATION 2024**) with full attendee details (Name, College Email, Department, Year).
- **Instant Scannable Digital QR Pass**:
  - Automatically generates an encrypted, scannable QR code (`qrcode` library) encoding full verification credentials (Ticket ID, Attendee Name, Email, Department, Event Name, Venue, Date, and Confirmed Status).
  - Includes a **Download QR Pass** button to save the pass image (`.png`) for offline venue check-in.
- **Student Passes Dashboard ("My Passes")**:
  - Students can review their active passes anytime and expand or download their QR pass code directly from the drawer.

---

### 3. Backend Architecture & Event Management APIs
- **Authentication & RBAC (HMAC-SHA256 JWT)**:
  - Role-based authorization distinguishing regular student users from chapter admins.
  - Pre-seeded test accounts:
    - **Admin**: `admin@rknec.edu` / `admin123` (Full event CRUD, capacity editing, attendee list inspection)
    - **Student**: `student@rknec.edu` / `student123` (Pass reservation, My Passes dashboard, pass cancellation)
- **Event CRUD Operations**:
  - Admins can create, view, update, and delete events with title, description, date/time, venue, capacity, and track category.
- **Capacity & Duplicate Prevention**:
  - Duplicate registration prevention (`409 Conflict`).
  - Strict capacity enforcement (`400 Bad Request` once capacity is reached).
  - Unregister and spot release (`POST /api/events/[id]/unregister`).
  - Cascade deletion on event removal.

---

## 📡 Backend API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new student account & receive JWT token |
| `POST` | `/api/auth/login` | Public | Authenticate user/admin credentials & receive JWT token |
| `GET` | `/api/auth/me` | Authenticated | Retrieve current user profile and role |
| `POST` | `/api/auth/me` | Authenticated | Logout and clear session cookie |
| `GET` | `/api/events` | Public | List all chapter events |
| `POST` | `/api/events` | Admin Only | Create new event with capacity constraints |
| `GET` | `/api/events/[id]` | Public | Retrieve single event details |
| `PUT` | `/api/events/[id]` | Admin Only | Update event details & capacity |
| `DELETE`| `/api/events/[id]` | Admin Only | Delete event and cascade cancel registrations |
| `POST` | `/api/events/[id]/register` | Authenticated | Claim pass & generate verified digital ticket |
| `POST` | `/api/events/[id]/unregister` | Authenticated | Cancel pass and release spot back to capacity |
| `GET` | `/api/events/[id]/attendees` | Admin Only | View list of registered attendees and ticket IDs |
| `GET` | `/api/users/registrations` | Authenticated | View all claimed passes for the current user |

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.17 or later)
- `npm` or `yarn`

### 2. Installation
```bash
git clone https://github.com/k3kriplani-coder/<YOUR_REPO_NAME>.git
cd <YOUR_REPO_NAME>
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Start
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
gdg-rbu-website/
├── src/
│   ├── app/
│   │   ├── api/                   # Next.js App Router API endpoints
│   │   │   ├── auth/              # Login, register, session management
│   │   │   ├── events/            # Event CRUD, registration, attendees
│   │   │   └── users/             # User passes and registration records
│   │   ├── globals.css            # Custom neo-brutalist styling & grid blocks
│   │   ├── layout.tsx             # Root layout with font definitions & metadata
│   │   └── page.tsx               # Main chapter landing page
│   ├── components/                # React modular UI components
│   │   ├── AdminEventModal.tsx    # Admin event CRUD & attendee rosters
│   │   ├── AuthContext.tsx        # Authentication state provider
│   │   ├── AuthModal.tsx          # Login & signup modal
│   │   ├── FaqSection.tsx         # Interactive accordion FAQs
│   │   ├── Footer.tsx             # Official socials & contact information
│   │   ├── Hero.tsx               # Chapter banner & retro terminal graphic
│   │   ├── MyRegistrationsModal.tsx# Student digital pass & QR drawer
│   │   ├── Navbar.tsx             # Responsive header with theme & role badges
│   │   ├── RegistrationModal.tsx  # Event registration form & QR code generator
│   │   ├── TeamSection.tsx        # Chapter overview & core domain leads
│   │   ├── ThemeToggle.tsx        # Zero-flash dark/light mode toggle
│   │   └── UpcomingEvent.tsx      # Flagship upcoming event dual cards
│   ├── lib/                       # Utility & business logic modules
│   │   ├── auth.ts                # HMAC-SHA256 JWT creation and verification
│   │   └── db.ts                  # In-memory database with pre-seeded data
│   └── types/                     # TypeScript shared interfaces
├── public/                        # Static assets (logos, images, vectors)
├── package.json
└── README.md
```

---

## 👥 Built for GDG RBU Chapter
Developed with ❤️ for Google Developer Groups (GDG) On Campus — Ramdeobaba University Chapter.
