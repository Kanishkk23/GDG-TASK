import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: "#4285F4",
          red: "#EA4335",
          yellow: "#FBBC04",
          green: "#34A853",
          purple: "#6750A4",
        },
        brutal: {
          bg: "#FBFBF9",
          card: "#FFFFFF",
          darkBg: "#121214",
          darkCard: "#1E1E24",
          border: "#000000",
          darkBorder: "#E4E4E7",
        }
      },
      boxShadow: {
        brutal: "4px 4px 0px #000000",
        "brutal-sm": "2px 2px 0px #000000",
        "brutal-lg": "6px 6px 0px #000000",
        "brutal-dark": "4px 4px 0px #FFFFFF",
        "brutal-dark-sm": "2px 2px 0px #FFFFFF",
      },
      fontFamily: {
        pixel: ["var(--font-silkscreen)", "monospace"],
        tech: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
