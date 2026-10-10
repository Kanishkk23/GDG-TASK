import { User, EventItem, RegistrationRecord } from "@/types";
import { hashPassword } from "./auth";

interface DbUser extends User {
  passwordHash: string;
}

// Seed accounts: Admin and Student
export const usersDb: DbUser[] = [
  {
    id: "admin-lead-kanishk",
    name: "Kanishk Kriplani",
    email: "k3kriplani@gmail.com",
    passwordHash: hashPassword("pass-Kanishk"),
    role: "admin",
    department: "Computer Science & Engineering",
    year: "Chapter Lead",
    createdAt: new Date().toISOString(),
  },
  {
    id: "admin-user-01",
    name: "GDG Lead (Admin)",
    email: "admin@rknec.edu",
    passwordHash: hashPassword("admin123"),
    role: "admin",
    department: "Computer Science & Engineering",
    year: "Faculty / Lead",
    createdAt: new Date().toISOString(),
  },
  {
    id: "student-user-01",
    name: "Aayush Kulkarni",
    email: "student@rknec.edu",
    passwordHash: hashPassword("student123"),
    role: "user",
    department: "Information Technology",
    year: "3rd Year",
    createdAt: new Date().toISOString(),
  },
];

// Seed Events with Capacity & Category
export const eventsDb: EventItem[] = [
  {
    id: "gdg-orientation-2024",
    title: "GDG ORIENTATION 2024",
    description: "Flagship kickoff event: meet domain leads, network with peer developers, and discover workshops across Web Dev, MAC, AI/ML, and Cloud.",
    dateTime: "10th October 2024 • 3:00 PM IST",
    date: "10TH OCTOBER",
    time: "3:00 PM",
    venue: "Main Auditorium, Ramdeobaba University",
    capacity: 250,
    category: "Web dev",
    registeredCount: 168,
    createdAt: new Date().toISOString(),
    isUpcoming: true,
  },
  {
    id: "pixotopia",
    title: "pixotopia",
    description: "Hands-on web development & design workshop exploring modern UI prototyping and creative coding.",
    dateTime: "11 oct 5 pm",
    date: "11TH OCTOBER",
    time: "5:00 PM",
    venue: "DT 906",
    capacity: 100,
    category: "Web dev",
    registeredCount: 0,
    createdAt: new Date().toISOString(),
    isUpcoming: true,
  },
  {
    id: "mac-mobile-bootcamp",
    title: "iOS & Android Mobile Architecture",
    description: "Deep dive into cross-platform development with Flutter, Swift fundamentals, and modern mobile backend integration.",
    dateTime: "18th October 2024 • 2:00 PM IST",
    date: "18TH OCTOBER",
    time: "2:00 PM",
    venue: "Lab 4, Department of CSE",
    capacity: 60,
    category: "MAC",
    registeredCount: 42,
    createdAt: new Date().toISOString(),
    isUpcoming: true,
  },
  {
    id: "cp-speed-codefest",
    title: "Competitive Programming Sprint",
    description: "Fast-paced algorithmic contest covering dynamic programming, graphs, and greedy strategies with Google interview question walkthroughs.",
    dateTime: "24th October 2024 • 4:00 PM IST",
    date: "24TH OCTOBER",
    time: "4:00 PM",
    venue: "CSE Central Computer Center",
    capacity: 100,
    category: "competetive programming",
    registeredCount: 98,
    createdAt: new Date().toISOString(),
    isUpcoming: true,
  },
  {
    id: "design-system-workshop",
    title: "Design Systems & Figma Prototyping",
    description: "Master modern neo-brutalist and iOS glass UI design, component variants, auto-layout, and handoff to front-end engineers.",
    dateTime: "28th October 2024 • 11:00 AM IST",
    date: "28TH OCTOBER",
    time: "11:00 AM",
    venue: "Seminar Hall 2",
    capacity: 50,
    category: "design",
    registeredCount: 50, // Capacity full demo!
    createdAt: new Date().toISOString(),
    isUpcoming: true,
  },
  {
    id: "socials-tech-mixer",
    title: "GDG Community Socials & Networking",
    description: "Informal networking mixer with alumni working at top tech firms, interactive trivia, and project showcases.",
    dateTime: "5th November 2024 • 5:00 PM IST",
    date: "5TH NOVEMBER",
    time: "5:00 PM",
    venue: "Open Amphitheatre, RBU Campus",
    capacity: 150,
    category: "socials",
    registeredCount: 88,
    createdAt: new Date().toISOString(),
    isUpcoming: true,
  }
];

// Registrations database with pre-seeded registration for student-user-01
export const registrationsDb: RegistrationRecord[] = [
  {
    id: "reg-demo-01",
    ticketId: "GDG-RBU-INIT01-1024",
    eventId: "gdg-orientation-2024",
    userId: "student-user-01",
    userName: "Aayush Kulkarni",
    userEmail: "student@rknec.edu",
    department: "Information Technology",
    year: "3rd Year",
    domain: "Web dev",
    createdAt: new Date().toISOString(),
  }
];
