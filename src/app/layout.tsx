'use client';

import { useState, useEffect, Children, cloneElement } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('dark');

  

  // Recupera o tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Aplica/remove a classe `.light` no <html> e salva o tema
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="flex-grow">
          {Children.map(children, child => {
            // Clona o elemento filho e adiciona a prop 'theme'
            if (child) {
              return cloneElement(child, { theme });
            }
            return child;
          })}
        </div>
        <Footer />
      </body>
    </html>
  );
}