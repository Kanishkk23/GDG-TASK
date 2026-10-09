# Google Developer Groups (GDG) - RBU Chapter Platform

An exact, pixel-perfect, and fully functional full-stack web implementation of the official **GDG Student Chapter** for **Ramdeobaba University (RBU)** matching the Figma neo-brutalist design with iOS 27 liquid glass styling and complete backend event management APIs.

Built with **Next.js 14+ (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## Features Overview

### 1. Frontend & Design Fidelity
- **Exact Figma Pixel Conversion**: Converts every section from the GDG Figma Design.
- **Retro-Tech Display Typography**: Blocky vintage-tech headlines (GOOGLE DEVELOPER GROUPS, RBU, Upcoming Event, FAQs) paired with crisp sans-serif copy.
- **Signature Google Brand Palette**: Blue (#4285F4), Red (#EA4335), Yellow (#FBBC04), and Green (#34A853).
- **iOS 27 Liquid Glass Buttons**: Frosted translucent blur (backdrop-filter: blur(20px)), specular upper-rim reflections, semi-translucent refraction borders, and tactile spring hover/press physics.
- **7 Chapter Domains**: Custom interactive dropdown selector for:
  Web dev • MAC • design • marketing • management • socials • competetive programming.
- **Dark & Light Mode**: Complete theme switcher with zero-flash persistence in localStorage.

---

### 2. Backend Event Management & Registration System

#### Authentication & Role-Based Access Control (JWT):
- User registration and login with secure HMAC-SHA256 JWT tokens.
- **Pre-Seeded Demo Accounts**:
  - Admin: admin@rknec.edu / admin123 (Manages events, creates/edits/deletes, views attendee rosters).
  - Student User: student@rknec.edu / student123 (Discovers events, registers, views passes, cancels reservations).
  - Or sign up as a new user with 1 click in the auth modal!

#### Full Event CRUD:
- Admins can **Create**, **Update**, and **Delete** events with:
  - Title, Description, Date/Time, Venue, Capacity, Category.
- Non-admins are blocked with 403 Forbidden.

#### Capacity & Duplicate Registration Enforcement:
- **Duplicate Prevention**: If an authenticated user attempts to register for an event they already joined, the system returns 409 Conflict: Already registered for this event!
- **Strict Capacity Enforcement**: If registeredCount >= capacity, registrations are blocked with 400 Bad Request: Event is at full capacity.
- **Unregister & Spot Release**: Users can cancel/unregister from any event, atomically decrementing registeredCount and releasing the seat for other students.
- **Cascade Deletion**: When an admin deletes an event, associated registration records are cleaned up safely.

---

## Backend API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Register new user account & receive JWT token |
| POST | /api/auth/login | Public | Authenticate user/admin credentials & receive JWT token |
| GET | /api/auth/me | Authenticated | Retrieve current authenticated user profile |
| POST | /api/auth/me | Authenticated | Logout and clear cookie |
| GET | /api/events | Public | List all events (supports ?search=... and ?category=...) |
| POST | /api/events | Admin Only | Create new event (Title, Description, Date/Time, Venue, Capacity, Category) |
| GET | /api/events/[id] | Public | Retrieve single event details |
| PUT | /api/events/[id] | Admin Only | Update event details & seat capacity |
| DELETE | /api/events/[id] | Admin Only | Delete event and cascade cancel registrations |
| POST | /api/events/[id]/register | Authenticated | Register for event (prevents duplicates & enforces capacity) |
| POST | /api/events/[id]/unregister | Authenticated | Cancel registration and release reserved seat |
| GET | /api/events/[id]/attendees | Admin Only | View list of registered attendees for an event |
| GET | /api/users/registrations | Authenticated | View all events the current user is registered for with tickets |
| POST | /api/contact | Public | Submit inquiries to chapter leads |
| GET | /api/faqs | Public | Dynamic chapter FAQs |

---

## React Interface Modules

1. **Auth Modal (AuthModal.tsx)**:
   - Tabbed Sign In / Create Account with 1-Click Demo Login buttons for Admin and Student.
2. **Navbar (Navbar.tsx)**:
   - User profile badge with role tag (ADMIN or USER).
   - Admin Console button for admins.
   - My Passes button for students.
   - One-click Sign In / Logout.
3. **Events Explorer (UpcomingEvent.tsx)**:
   - Live search input & 7 domain filter pills.
   - Real-time capacity indicator bar (X / Y spots filled).
   - Visual FULL / SOLD OUT tag when capacity is reached.
   - Contextual buttons: Register Now, Pass Claimed, Cancel, Capacity Full.
4. **My Registrations Dashboard (MyRegistrationsModal.tsx)**:
   - Student dashboard showing active digital pass tickets (e.g. GDG-RBU-XXXXX-1234), event date, venue, and a one-click Cancel Registration button.
5. **Admin Console (AdminEventModal.tsx)**:
   - Create New Event dialog with validation.
   - Edit Event form (modify title, venue, capacity, category).
   - Delete Event with confirmation.
   - Live Attendees Roster showing attendee names, college emails, departments, and ticket IDs.

---

## Running Locally

`ash
cd gdg-rbu-website
npm install
npm run build
npm start
`
Open http://localhost:3000 in your browser.
