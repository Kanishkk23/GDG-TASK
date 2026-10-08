import { EventItem, FaqItem } from "@/types";

export const initialEvents: EventItem[] = [
  {
    id: "gdg-orientation-2024",
    title: "GDG ORIENTATION 2024",
    subtitle: "Flagship Kickoff Event",
    category: "ORIENTATION & NETWORKING",
    date: "10TH OCTOBER",
    time: "3:00 PM",
    location: "Main Auditorium, Ramdeobaba University",
    description:
      "Join us to discover what Google Developer Groups RBU has in store for the academic year! Explore domains in Web Development, AI/ML, Cloud Computing, Android, and Open Source. Connect with chapter leads, participate in live demos, and win exclusive GDG merchandise.",
    isUpcoming: true,
    registrationOpen: true,
    maxAttendees: 250,
    registeredCount: 168,
  },
  {
    id: "cloud-study-jam-2024",
    title: "Google Cloud Study Jam",
    category: "WORKSHOP",
    date: "25TH OCTOBER",
    time: "2:00 PM",
    location: "Lab 3, Department of CSE",
    description: "Hands-on lab sessions covering Google Cloud Platform fundamentals, Kubernetes, and generative AI APIs.",
    isUpcoming: false,
    registrationOpen: true,
    maxAttendees: 100,
    registeredCount: 85,
  }
];

export const initialFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is GDG RBU?",
    answer:
      "GDG RBU is the student chapter of Google Developer Groups at Ramdeobaba University. We focus on empowering students through hands-on technical workshops, tech talks, hackathons, open source contributions, and real-world project collaborations.",
  },
  {
    id: "faq-2",
    question: "How to join GDG?",
    answer:
      "Any student of Ramdeobaba University passionate about technology can join! Register through our community portal, attend our orientation event, and join our official Discord & WhatsApp channels to access track resources and announcements.",
  },
  {
    id: "faq-3",
    question: "What does a GDG Lead do?",
    answer:
      "A GDG Lead oversees chapter operations, coordinates technical workshops, organizes hackathons, fosters university-industry partnerships with Google Developer Experts (GDEs), and mentors students across specialized technology domains.",
  },
  {
    id: "faq-4",
    question: "How is GDG related to Google?",
    answer:
      "Google Developer Groups on Campus is an official student program powered by Google Developers. While chapters are student-led, Google provides event support, technical resources, expert access, and cloud credits.",
  },
  {
    id: "faq-5",
    question: "How to reach us?",
    answer:
      "You can reach the core team anytime via our official university email at gdsc@rknec.edu or connect with us on LinkedIn, Instagram, and Twitter. Our physical headquarters are located at the Department of Computer Science & Engineering, RBU, Nagpur.",
  },
];

export interface StoredRegistration {
  id: string;
  ticketId: string;
  eventId: string;
  fullName: string;
  email: string;
  department: string;
  year: string;
  phone?: string;
  createdAt: string;
}

// In-memory persistent registrations during server lifecycle
export const registrationsDb: StoredRegistration[] = [];
