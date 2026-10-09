"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UpcomingEvent from "@/components/UpcomingEvent";
import TeamSection from "@/components/TeamSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import AuthModal from "@/components/AuthModal";
import MyRegistrationsModal from "@/components/MyRegistrationsModal";
import AdminEventModal from "@/components/AdminEventModal";
import { AuthProvider } from "@/components/AuthContext";
import { EventItem } from "@/types";

function MainContent() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedEventForReg, setSelectedEventForReg] = useState<EventItem | null>(null);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMyRegsOpen, setIsMyRegsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [eventRefreshKey, setEventRefreshKey] = useState(0);

  const handleOpenRegister = (event?: EventItem) => {
    setSelectedEventForReg(event || null);
    setIsRegisterOpen(true);
  };

  const handleEventDataChanged = () => {
    setEventRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Sticky Responsive Navbar with User Role Badges & Auth */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenMyRegistrations={() => setIsMyRegsOpen(true)}
        onOpenAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Main Sections */}
      <div className="flex-1 space-y-4 md:space-y-8">
        <Hero onOpenRegister={() => handleOpenRegister()} />

        {/* Dynamic Events Section with Search, 7 Domain Filters, and Capacity Checks */}
        <UpcomingEvent
          onOpenRegisterForEvent={(event) => handleOpenRegister(event)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenAdminModal={() => setIsAdminOpen(true)}
          triggerRefresh={eventRefreshKey}
        />

        <TeamSection />
        <FaqSection />
      </div>

      <Footer />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        event={selectedEventForReg}
        onRegisteredSuccess={handleEventDataChanged}
      />

      {/* Authentication Modal (Login & Signup with 1-Click Demo Buttons) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Student Registered Events & Pass Tickets Drawer */}
      <MyRegistrationsModal
        isOpen={isMyRegsOpen}
        onClose={() => setIsMyRegsOpen(false)}
        onRegistrationUpdated={handleEventDataChanged}
      />

      {/* Admin Event Management Console (CRUD & Attendee Lists) */}
      <AdminEventModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onEventChanged={handleEventDataChanged}
      />
    </main>
  );
}

export default function HomePage() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
