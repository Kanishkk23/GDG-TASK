import fs from "fs";
import path from "path";
import { User, EventItem, RegistrationRecord } from "@/types";
import { hashPassword } from "./auth";

export interface DbUser extends User {
  passwordHash: string;
}

const IS_VERCEL = process.env.VERCEL === "1" || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
const ROOT_DB_FILE = path.join(process.cwd(), "data", "db.json");
const DATA_DIR = IS_VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

// Seed accounts: Admin and Student
const INITIAL_USERS: DbUser[] = [
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

const INITIAL_EVENTS: EventItem[] = [
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
    registeredCount: 50,
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

const INITIAL_REGISTRATIONS: RegistrationRecord[] = [
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

interface GlobalDataStore {
  _usersDb?: DbUser[];
  _eventsDb?: EventItem[];
  _registrationsDb?: RegistrationRecord[];
  _isInitialized?: boolean;
}

const g = globalThis as unknown as GlobalDataStore;

export function saveDb(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const data = {
      users: g._usersDb || [],
      events: g._eventsDb || [],
      registrations: g._registrationsDb || [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save database file:", error);
  }
}

export function syncDbFromDisk(): void {
  try {
    const targetFile = fs.existsSync(DB_FILE) ? DB_FILE : (fs.existsSync(ROOT_DB_FILE) ? ROOT_DB_FILE : null);
    if (targetFile) {
      const content = fs.readFileSync(targetFile, "utf-8");
      const data = JSON.parse(content);

      if (Array.isArray(data.users)) {
        if (!g._usersDb) g._usersDb = [];
        g._usersDb.length = 0;
        g._usersDb.push(...data.users);
      }
      if (Array.isArray(data.events)) {
        if (!g._eventsDb) g._eventsDb = [];
        g._eventsDb.length = 0;
        g._eventsDb.push(...data.events);
      }
      if (Array.isArray(data.registrations)) {
        if (!g._registrationsDb) g._registrationsDb = [];
        g._registrationsDb.length = 0;
        g._registrationsDb.push(...data.registrations);
      }
      return;
    }
  } catch (error) {
    console.error("Failed to sync database from disk:", error);
  }
}

function initDb(): void {
  if (g._isInitialized && g._usersDb && g._eventsDb && g._registrationsDb) {
    return;
  }

  const targetFile = fs.existsSync(DB_FILE) ? DB_FILE : (fs.existsSync(ROOT_DB_FILE) ? ROOT_DB_FILE : null);
  if (targetFile) {
    try {
      const content = fs.readFileSync(targetFile, "utf-8");
      const data = JSON.parse(content);
      g._usersDb = data.users || [...INITIAL_USERS];
      g._eventsDb = data.events || [...INITIAL_EVENTS];
      g._registrationsDb = data.registrations || [...INITIAL_REGISTRATIONS];
      g._isInitialized = true;
      if (IS_VERCEL && !fs.existsSync(DB_FILE)) {
        saveDb();
      }
      return;
    } catch (error) {
      console.error("Failed to load existing db.json, using seed data:", error);
    }
  }

  g._usersDb = [...INITIAL_USERS];
  g._eventsDb = [...INITIAL_EVENTS];
  g._registrationsDb = [...INITIAL_REGISTRATIONS];
  g._isInitialized = true;
  saveDb();
}

initDb();

// Export reactive / shared array instances
export const usersDb: DbUser[] = g._usersDb!;
export const eventsDb: EventItem[] = g._eventsDb!;
export const registrationsDb: RegistrationRecord[] = g._registrationsDb!;
