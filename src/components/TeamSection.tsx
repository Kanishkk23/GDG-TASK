"use client";

import { useState } from "react";
import Image from "next/image";
import { Wrench, Network, Award, ChevronDown, Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  domain: string;
  linkedin: string;
  colorClass: string;
}

const coreLeads: TeamMember[] = [
  {
    name: "Rohit Agrawal",
    role: "Web Lead",
    domain: "Web dev",
    linkedin: "https://www.linkedin.com/in/rohit-agrawal-5444ra/",
    colorClass: "btn-blue",
  },
  {
    name: "Vivian Demello",
    role: "MAC Lead",
    domain: "MAC (Mobile, Android & Apple)",
    linkedin: "https://www.linkedin.com/in/viviandemello/",
    colorClass: "btn-red",
  },
  {
    name: "Gayatri Donode",
    role: "Design Lead",
    domain: "design",
    linkedin: "https://www.linkedin.com/in/gayatridonode/",
    colorClass: "btn-purple",
  },
  {
    name: "Jagravi Bisen",
    role: "Marketing Lead",
    domain: "marketing",
    linkedin: "https://www.linkedin.com/in/jagravibisen/",
    colorClass: "btn-yellow",
  },
  {
    name: "Saarth Meshram",
    role: "Management Lead",
    domain: "management",
    linkedin: "https://www.linkedin.com/in/saarthm/",
    colorClass: "btn-cyan",
  },
  {
    name: "Arshpreet Puri",
    role: "Socials Lead",
    domain: "socials",
    linkedin: "https://www.linkedin.com/in/arshpreet-puri-41b9702a8/",
    colorClass: "btn-red",
  },
  {
    name: "Adarsh Jha",
    role: "Competitive Programming Lead",
    domain: "competetive programming",
    linkedin: "https://www.linkedin.com/in/adarsh-jha-3a814a321/",
    colorClass: "btn-green",
  },
];

export default function TeamSection() {
  const [showMemberCards, setShowMemberCards] = useState(true);

  return (
    <section id="team" className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Main brutalist card container */}
        <div className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-500 rounded-sm p-6 sm:p-10 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff]">
          
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
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/80 border-2 border-black dark:border-zinc-700 rounded-sm shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-sm btn-minimal btn-blue text-white">
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
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/80 border-2 border-black dark:border-zinc-700 rounded-sm shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff]">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-sm btn-minimal btn-green text-white">
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

              {/* Rectangular Button to Toggle Lead cards */}
              <button
                onClick={() => setShowMemberCards(!showMemberCards)}
                className="px-4 py-2.5 rounded-sm btn-minimal btn-white inline-flex items-center gap-2 text-xs font-mono font-bold text-black dark:text-white cursor-pointer"
              >
                <span>{showMemberCards ? "Hide Chapter Leads" : "View Chapter Leads Profiles"}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMemberCards ? "rotate-180" : ""}`} />
              </button>

            </div>

            {/* Right Photo (6 cols) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full relative rounded-sm overflow-hidden border-3 border-black shadow-[6px_6px_0px_#000] group">
                <div className="relative aspect-[4/3] w-full bg-zinc-200">
                  <Image
                    src="/assets/team_photo.png"
                    alt="GDG RBU Chapter Team Photograph"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 bg-black text-white text-center font-mono text-xs font-semibold flex items-center justify-between px-4">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-yellow-400" /> GDG RBU Core Community 2024
                  </span>
                  <span className="text-[10px] text-zinc-400">On Campus Chapter</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Core Leads Gallery in rectangular cards */}
          {showMemberCards && (
            <div className="mt-8 pt-6 border-t-2 border-black dark:border-zinc-700 animate-fade-in">
              <h4 className="font-display-pixel text-lg font-bold text-black dark:text-white mb-4">
                Chapter Core Leads & Domains
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {coreLeads.map((member) => (
                  <div
                    key={member.name}
                    className="p-4 bg-white dark:bg-zinc-800 border-2 border-black dark:border-zinc-600 rounded-sm shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] flex flex-col justify-between transition-transform hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-sm btn-minimal ${member.colorClass} flex items-center justify-center font-bold text-sm shadow-sm`}>
                          {member.name.charAt(0)}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 border border-black dark:border-zinc-500 rounded-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold uppercase">
                          {member.role}
                        </span>
                      </div>
                      <div className="font-bold text-base text-black dark:text-white leading-snug">{member.name}</div>
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">{member.role}</div>
                      <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 mt-1">{member.domain}</div>
                    </div>

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn Profile`}
                      className="mt-4 w-full py-2 px-3 rounded-sm btn-minimal btn-blue text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>View LinkedIn</span>
                    </a>
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
