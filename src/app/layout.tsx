'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`} suppressHydrationWarning>
        <AuthProvider>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          {/* A tag 'main' aqui não precisa de classes, pois o CSS global já cuida dela */}
          <main>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}