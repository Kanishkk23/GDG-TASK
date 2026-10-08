import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google Developer Groups - RBU Chapter",
  description: "Official student community website for Google Developer Groups (GDG) at Ramdeobaba University. Empowering students with cutting-edge tech skills.",
  keywords: ["GDG", "Google Developer Groups", "RBU", "Ramdeobaba University", "Web Development", "Tech Community", "Nagpur"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-yellow-300 selection:text-black">
        {children}
      </body>
    </html>
  );
}
