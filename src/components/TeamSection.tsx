"use client";

import { useState } from "react";
import Image from "next/image";
import { Wrench, Network, Award, Github, Linkedin, Twitter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  domain: string;
  avatarColor: string;
}

const coreLeads: TeamMember[] = [
  { name: "Aarav Sharma", role: "GDG Campus Lead", domain: "Lead Organizer", avatarColor: "bg-[#4285F4]" },
  { name: "Priya Patel", role: "Web Dev Lead", domain: "Full Stack & Next.js", avatarColor: "bg-[#EA4335]" },
  { name: "Rohan Deshmukh", role: "AI / ML Lead", domain: "TensorFlow & Gemini", avatarColor: "bg-[#FBBC04]" },
  { name: "Sneha Kulkarni", role: "Cloud & DevOps Lead", domain: "GCP & Kubernetes", avatarColor: "bg-[#34A853]" },
];

export default function TeamSection() {
  const [showMemberCards, setShowMemberCards] = useState(false);

  return (
    <section id="team" className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Main brutalist card container */}
        <div className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-500 rounded-2xl p-6 sm:p-10 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              <h2 className="font-display-pixel text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white leading-tight">
                Meet the Google Developer Group Team
              </h2>

              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                Google Developer Groups (GDG) are university-based community groups for students interested in Google developer technologies. Students grow their knowledge in a peer-to-peer learning environment and build solutions for local businesses and their community.
              </p>

              {/* Feature Cards matching Figma */}
              <div className="space-y-4 pt-2">
                
                {/* Feature 1 */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/80 border-2 border-black dark:border-zinc-700 rounded-xl shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 text-[#4285F4] border-2 border-black rounded-lg">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-xs sm:text-sm text-black dark:text-white uppercase tracking-wider">
                        HANDS-ON WORKSHOPS & CODING
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-normal">
                        Our organized activities provide direct experience with real developer tools, cloud environments, and modern frameworks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/80 border-2 border-black dark:border-zinc-700 rounded-xl shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 text-[#34A853] border-2 border-black rounded-lg">
                      <Network className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-xs sm:text-sm text-black dark:text-white uppercase tracking-wider">
                        COLLABORATION & NETWORKING
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-normal">
                        Join tech mentors and students to share ideas, build impactful open-source applications, and prepare for industry roles.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Toggle lead cards */}
              <button
                onClick={() => setShowMemberCards(!showMemberCards)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <span>{showMemberCards ? "Hide Chapter Leads" : "View Chapter Leads Profiles →"}</span>
              </button>

            </div>

            {/* Right Photo (6 cols) - EXACT team photo from Figma */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full relative rounded-xl overflow-hidden border-3 border-black shadow-[6px_6px_0px_#000] group">
                <div className="relative aspect-[4/3] w-full bg-zinc-200">
                  <Image
                    src="/assets/team_photo.png"
                    alt="GDG RBU Chapter Team Photograph"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-2.5 bg-black text-white text-center font-mono text-xs font-semibold flex items-center justify-between px-4">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-yellow-400" /> GDG RBU Core Community 2024
                  </span>
                  <span className="text-[10px] text-zinc-400">On Campus Chapter</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Core Leads Gallery when toggled */}
          {showMemberCards && (
            <div className="mt-8 pt-6 border-t-2 border-black dark:border-zinc-700">
              <h4 className="font-display-pixel text-lg font-bold text-black dark:text-white mb-4">
                Chapter Core Leads
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {coreLeads.map((member) => (
                  <div
                    key={member.name}
                    className="p-4 bg-white dark:bg-zinc-800 border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]"
                  >
                    <div className={`w-10 h-10 rounded-full ${member.avatarColor} border-2 border-black flex items-center justify-center font-bold text-white mb-3`}>
                      {member.name.charAt(0)}
                    </div>
                    <div className="font-bold text-sm text-black dark:text-white">{member.name}</div>
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">{member.role}</div>
                    <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1">{member.domain}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
