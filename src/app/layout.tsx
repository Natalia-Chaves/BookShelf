import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CafeBooks",
  description: "Sua biblioteca de livros online com um toque de café.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5f5dc] text-[#3e2723] flex flex-col min-h-screen`}
      >
        <header className="sticky top-0 z-50 border-b shadow-sm">
          <Navbar />
        </header>

        {/* flex-1 garante que o conteúdo empurre o footer */}
        <main className="flex-1 bg-[#d7a86e]">{children}</main>

        <footer className="mt-auto">
          <Footer />
        </footer>
      </body>
    </html>
  );
}