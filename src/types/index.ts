export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  isUpcoming: boolean;
  registrationOpen: boolean;
  maxAttendees?: number;
  registeredCount: number;
}

export interface RegistrationRequest {
  eventId: string;
  fullName: string;
  email: string;
  department: string;
  year: string;
  studentId?: string;
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
  category?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
