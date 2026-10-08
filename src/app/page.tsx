"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UpcomingEvent from "@/components/UpcomingEvent";
import TeamSection from "@/components/TeamSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";

export default function HomePage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Sticky Responsive Navbar with Dark Mode & Color Badges */}
      <Navbar onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* Main Content Sections matching Figma */}
      <div className="flex-1 space-y-4 md:space-y-8">
        <Hero onOpenRegister={() => setIsRegisterOpen(true)} />
        <UpcomingEvent onOpenRegister={() => setIsRegisterOpen(true)} />
        <TeamSection />
        <FaqSection />
      </div>

      {/* Neo-brutalist Footer with Official Branding & Shapes Banner */}
      <Footer />

      {/* Live Event Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </main>
  );
}
