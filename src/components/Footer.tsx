"use client";

import Image from "next/image";
import { MapPin, Mail, Instagram, Linkedin, Twitter, Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="w-full pt-12 pb-0 mt-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Main Brutalist Footer Card matching Figma */}
        <div className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-500 rounded-sm p-6 sm:p-10 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] text-center">
          
          {/* Top Logo & Title */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-10 relative">
              <Image
                src="/assets/gdg-logo.svg"
                alt="GDG Logo"
                fill
                className="object-contain"
              />
            </div>
            
            <h3 className="font-display-pixel text-xl sm:text-2xl font-bold text-black dark:text-white">
              Google Developer Groups
            </h3>
            
            <p className="font-mono text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-semibold">
              On Campus • Ramdeobaba University
            </p>
          </div>

          {/* Dashed Divider Line matching Figma */}
          <div className="my-8 border-t-2 border-dashed border-zinc-400 dark:border-zinc-600 w-full"></div>

          {/* Bottom Boxes in rectangular format */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-left">
            
            {/* Box 1 (Blue): Address Box (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Location Card */}
              <div className="p-4 rounded-sm border-2 border-black shadow-[3px_3px_0px_#000] bg-[#4285F4] text-white flex items-center gap-3">
                <div className="p-2 bg-white text-[#4285F4] border border-black rounded-sm shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-medium leading-snug">
                  <span className="font-bold block">Ramdeobaba University</span>
                  <span>Katol Road, Gittikhadan, Nagpur - 440013</span>
                </div>
              </div>

              {/* Email Card (Yellow) */}
              <a
                href="mailto:gdsc@rknec.edu"
                className="p-4 rounded-sm btn-minimal btn-yellow text-black flex items-center gap-3 block"
              >
                <div className="p-2 bg-white text-black border border-black rounded-sm shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold truncate">
                  gdsc@rknec.edu
                </div>
              </a>

            </div>

            {/* Box 2 (Purple): Follow Us Box (5 cols) matching Figma */}
            <div className="md:col-span-5 p-4 rounded-sm border-2 border-black shadow-[3px_3px_0px_#000] bg-[#6750A4] text-white flex flex-col justify-between">
              
              <div className="font-mono text-xs font-bold uppercase tracking-wider mb-3">
                Follow Us:
              </div>

              {/* Social Icon Buttons in rectangular format */}
              <div className="flex items-center gap-2.5">
                
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/gdg_rbu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-sm btn-minimal btn-red flex items-center justify-center cursor-pointer"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/gdg-rbu/home/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-sm btn-minimal btn-blue flex items-center justify-center cursor-pointer"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>

                {/* Twitter / X */}
                <a
                  href="https://x.com/gdsc_rcoem"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter X"
                  className="w-10 h-10 rounded-sm btn-minimal btn-green flex items-center justify-center cursor-pointer"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/gdg-rbu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-sm btn-minimal btn-dark flex items-center justify-center cursor-pointer"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>

              </div>

              <div className="text-[10px] font-mono text-purple-200 mt-3">
                @gdg_rbu • Official Chapter
              </div>

            </div>

          </div>

          <div className="mt-8 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> by GDG RBU Web Development Team
          </div>

        </div>

      </div>

      {/* Decorative Bottom Google Shapes Pattern Banner matching Figma */}
      <div className="w-full mt-10 overflow-hidden relative leading-none">
        <div className="w-full h-14 md:h-16 relative">
          <Image
            src="/assets/google-shapes-pattern.svg"
            alt="Google Shapes Banner"
            fill
            className="object-cover"
          />
        </div>
      </div>

    </footer>
  );
}
