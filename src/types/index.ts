export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  year?: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  dateTime?: string;
  date?: string;
  time?: string;
  venue?: string;
  location?: string;
  capacity: number;
  maxAttendees?: number;
  category: string;
  registeredCount: number;
  createdAt?: string;
  isUpcoming?: boolean;
  registrationOpen?: boolean;
}

export interface RegistrationRecord {
  id: string;
  ticketId: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  department: string;
  year: string;
  domain: string;
  createdAt: string;
}

export interface RegistrationRequest {
  eventId: string;
  fullName: string;
  email: string;
  department: string;
  year: string;
  phone?: string;
  interestTracks?: string[];
}

export interface RegistrationResponse {
  success: boolean;
  ticketId?: string;
  message: string;
  registeredAt?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
