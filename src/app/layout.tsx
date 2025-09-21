'use client';

import {
  useState,
  useEffect,
  Children,
  cloneElement,
  ReactNode,
  ReactElement,
} from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Props que o Layout global recebe
interface RootLayoutProps {
  children: ReactNode;
}

// Caso queira tipar as páginas que recebem `theme`:
type PageWithTheme = ReactElement<{ theme: 'dark' | 'light' }>;

export default function RootLayout({ children }: RootLayoutProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Recupera o tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  // Aplica/remove a classe `.light` no <html> e salva o tema
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="flex-grow">
          {Children.map(children, (child) => {
            // Garante que é um elemento React antes de clonar
            if (child && typeof child === 'object' && 'props' in child) {
              return cloneElement(child as PageWithTheme, { theme });
            }
            return child;
          })}
        </div>
        <Footer />
      </body>
    </html>
  );
}
