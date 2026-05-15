import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A showcase of my GitHub projects and work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="py-6 text-center text-slate-400 glass mt-auto">
          <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
