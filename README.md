# GDG On Campus (RBU) — Recruitment Task Submission

> **Technical Assignment Submission**  
> A full-stack prototype web application developed as an assignment/task submission for induction into the **Google Developer Groups (GDG) On Campus Chapter** at **Ramdeobaba University (RBU)**.

Built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **QRCode**.

---

## 📌 Project Overview

This project is a sample community web platform built to fulfill the technical assessment requirements for entering the GDG On Campus chapter. It showcases modern full-stack engineering practices, interactive neo-brutalist UI design, secure authentication, and an end-to-end event registration workflow featuring scannable digital QR passes.

---

## 🌟 Key Highlights & Task Implementations

### 1. Frontend & Neo-Brutalist Design System
- **Modern Neo-Brutalist Aesthetics**: High-contrast borders, tactile drop shadows, and clean modern typography.
- **Sleek Minimal Rectangular Controls**: Standardized `rounded-[4px]` geometry across all buttons and inputs with smooth micro-interaction hover transitions.
- **Developer Background Grid**: Geometric square grid pattern (`36px × 36px`) across the webpage background in both light and dark mode.
- **Dark & Light Mode**: Zero-flash theme switcher with persistent local preference.
- **Chapter Domains & Core Team Showcase**:
  - Highlights the chapter's operational tracks and domains: **Web Development**, **Mobile App Development (MAC)**, **UI/UX Design**, **Marketing**, **Management**, **Social Media**, and **Competitive Programming (CP)**.
  - Interactive profile cards with domain badges and direct LinkedIn redirection buttons.
- **Official Chapter Socials**: Quick links to the chapter's official Instagram, LinkedIn, and Twitter/X channels.

---

### 2. Event Registration & Digital QR Pass System
- **Active Event Registration**: Seamless registration flow for the chapter's flagship event (**GDG ORIENTATION 2024**) capturing attendee credentials (Name, College Email, Department, Year).
- **Instant Scannable Digital QR Pass**:
  - Automatically generates an encrypted, scannable QR code (`qrcode` library) encoding full verification credentials (Ticket ID, Attendee Name, Email, Department, Event Name, Venue, Date, and Confirmed Status).
  - Includes a **Download QR Pass** feature to save the digital pass (`.png`) for offline venue check-in.
- **"My Passes" Dashboard**:
  - Attendees can view all their claimed tickets, inspect event details, and re-download their QR pass anytime.

---

### 3. Backend Architecture & REST APIs
- **Authentication & Role-Based Access Control (RBAC)**:
  - HMAC-SHA256 JWT tokens with role differentiation between students and chapter administrators.
  - Pre-configured demo credentials for assignment evaluation:
    - **Admin Account**: `admin@rknec.edu` / `admin123` *(Event CRUD, capacity editing, attendee roster inspection)*
    - **Student Account**: `student@rknec.edu` / `student123` *(Ticket reservations, personal pass dashboard, cancellation)*
- **Event Lifecycle & Capacity Enforcement**:
  - Duplicate registration protection (`409 Conflict`).
  - Real-time seat capacity enforcement (`400 Bad Request` once full).
  - Cancellation & spot release (`POST /api/events/[id]/unregister`).
  - Cascade attendee cleanup on event deletion.

---

## 📡 Backend API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new student account & receive JWT token |
| `POST` | `/api/auth/login` | Public | Authenticate user/admin credentials & receive JWT token |
| `GET` | `/api/auth/me` | Authenticated | Retrieve current session profile and role |
| `POST` | `/api/auth/me` | Authenticated | Logout and invalidate session |
| `GET` | `/api/events` | Public | Fetch all chapter events |
| `POST` | `/api/events` | Admin Only | Create new event with date, venue, capacity |
| `GET` | `/api/events/[id]` | Public | Fetch single event details |
| `PUT` | `/api/events/[id]` | Admin Only | Update event details & capacity limits |
| `DELETE`| `/api/events/[id]` | Admin Only | Delete event and cascade cancel registrations |
| `POST` | `/api/events/[id]/register` | Authenticated | Reserve ticket & generate verified digital QR pass |
| `POST` | `/api/events/[id]/unregister` | Authenticated | Cancel pass and release spot back to capacity |
| `GET` | `/api/events/[id]/attendees` | Admin Only | View registered attendees and ticket IDs |
| `GET` | `/api/users/registrations` | Authenticated | View all claimed passes for the authenticated user |

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.17 or higher)
- `npm` or `yarn`

### 2. Installation
```bash
git clone https://github.com/Kanishkk23/GDG-TASK.git
cd GDG-TASK
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Execution
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
GDG-TASK/
├── src/
│   ├── app/
│   │   ├── api/                   # Next.js App Router REST API endpoints
│   │   │   ├── auth/              # Authentication & session endpoints
│   │   │   ├── events/            # Event CRUD, registration & attendee rosters
│   │   │   └── users/             # User passes & registration data
│   │   ├── globals.css            # Custom neo-brutalist styles & grid blocks
│   │   ├── layout.tsx             # Root layout with typography & metadata
│   │   └── page.tsx               # Main chapter landing page
│   ├── components/                # Modular React UI components
│   │   ├── AdminEventModal.tsx    # Admin dashboard for event management
│   │   ├── AuthContext.tsx        # Global authentication state provider
│   │   ├── AuthModal.tsx          # Login & signup modal
│   │   ├── FaqSection.tsx         # Interactive accordion FAQ component
│   │   ├── Footer.tsx             # Social links & contact cards
│   │   ├── Hero.tsx               # Chapter banner with CTA controls
│   │   ├── MyRegistrationsModal.tsx# Student pass drawer with QR code view
│   │   ├── Navbar.tsx             # Navigation bar with role & theme toggles
│   │   ├── RegistrationModal.tsx  # Event registration form & QR code generator
│   │   ├── TeamSection.tsx        # Chapter domain tracks & team lead cards
│   │   ├── ThemeToggle.tsx        # Zero-flash dark/light mode toggle
│   │   └── UpcomingEvent.tsx      # Flagship upcoming event showcase
│   ├── lib/                       # Utility & business logic modules
│   │   ├── auth.ts                # HMAC-SHA256 JWT auth utilities
│   │   └── db.ts                  # In-memory database with pre-seeded data
│   └── types/                     # TypeScript data interfaces
├── public/                        # Static assets (logos, vector graphics)
├── package.json
└── README.md
```

---

## 📝 Submission Note
Developed as an induction task submission for **Google Developer Groups (GDG) On Campus — Ramdeobaba University Chapter**.
