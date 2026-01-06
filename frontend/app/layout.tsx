import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/AmbientBackground";
import VinylPlayer from "@/components/VinylPlayer";
import { TransitionProvider } from "@/context/TransitionContext";
import TransitionLink from "@/components/TransitionLink";
import PageWrapper from "@/components/PageWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Senior Product Engineer & Full-Stack Architect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-100 selection:bg-neutral-800 overflow-x-hidden`}
      >
       <TransitionProvider>
        <AmbientBackground />
        <VinylPlayer />
        
        {/* Navbar */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4">
            <div className="flex items-center justify-between px-6 py-3 rounded-full bg-neutral-900/50 backdrop-blur-md border border-white/5 shadow-lg">
                <TransitionLink href="/" className="font-semibold text-sm tracking-tight hover:text-white/80 transition-colors">Tanay Mukker</TransitionLink>
                <div className="flex items-center gap-6 text-sm text-neutral-400">
                    <TransitionLink href="/work" className="hover:text-white transition-colors">Work</TransitionLink>
                    <TransitionLink href="/about" className="hover:text-white transition-colors">About</TransitionLink>
                    <TransitionLink href="/contact" className="hover:text-white transition-colors">Contact</TransitionLink>
                </div>
            </div>
        </nav>

        <main className="relative z-10 min-h-screen flex flex-col pt-32">
          <PageWrapper>
            {children}
          </PageWrapper>
        </main>
       </TransitionProvider>
      </body>
    </html>
  );
}
