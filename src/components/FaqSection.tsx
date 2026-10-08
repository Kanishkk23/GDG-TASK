"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/types";
import { initialFaqs } from "@/lib/store";

export default function FaqSection() {
  // First item open by default matching Figma design
  const [openIds, setOpenIds] = useState<string[]>(["faq-1"]);

  const toggleFaq = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <section id="faqs" className="w-full py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Section Heading matching Figma */}
        <div className="text-center mb-10">
          <h2 className="font-display-pixel text-2xl sm:text-3xl md:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            FAQs
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            Everything you need to know about GDG RBU
          </p>
        </div>

        {/* Accordion List matching Figma neo-brutalist cards */}
        <div className="space-y-4">
          {initialFaqs.map((faq: FaqItem) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-zinc-900 border-2.5 border-black dark:border-zinc-500 rounded-xl shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-mono font-bold text-sm sm:text-base text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-lg border-2 border-black dark:border-white flex items-center justify-center transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-yellow-300 text-black" : "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 font-medium bg-zinc-50/50 dark:bg-zinc-900/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
