/* eslint-disable @next/next/no-html-link-for-pages */
'use client';
import { BookOpen, Search, User, Sun, Moon, LogOut, Library } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const pathname = usePathname();
  const { isAuthenticated, logout, user } = useAuth();

  const isAuthPage = pathname === '/' || pathname === '/cadastro';
  const isCatalogPage = pathname === '/catalogo';

  const getFirstName = () => {
    if (!user || !user.name) return 'Perfil';
    return user.name.split(' ')[0];
  };
  
  if (isAuthPage) {
    return (
      <nav className="w-full bg-[var(--background)] text-[var(--foreground)] relative">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-center items-center h-16">
          <a
            href="/"
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <BookOpen size={28} />
            <span className="text-2xl font-bold">CaféBooks</span>
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-[var(--card-background)] text-[var(--foreground)] shadow-lg relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center h-16">
        {/* Logo esquerda */}
        <a
          href="/catalogo"
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition flex-shrink-0"
        >
          <BookOpen size={28} />
          <span className="text-2xl font-bold">CaféBooks</span>
        </a>

        {/* Mobile: ícones Library e Search centralizados */}
        <div className="flex flex-1 justify-center gap-6 md:hidden">
          <a href="/catalogo" aria-label="Catálogo">
            <Library size={24} />
          </a>
          <button
            aria-label="Buscar"
            className="p-1"
          >
            <Search size={24} />
          </button>
        </div>

        {/* Desktop: catálogo texto + busca centralizados */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
          <a
            href="/catalogo"
 className="text-sm font-medium hover:text-[var(--primary)] transition"
          >
            Catálogo
          </a>

          {isCatalogPage && (
            <div className="relative items-center bg-[var(--form-background)] rounded-lg px-3 py-2 w-64 flex">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent outline-none w-full text-sm"
              />
              <Search size={18} className="ml-2 text-[var(--primary)]" />
            </div>
          )}
        </div>

        {/* Ações direita */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Perfil e logout */}
          {isAuthenticated && (
            <>
              <a
                href="/perfil"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--form-background)] hover:opacity-80 transition"
              >
                <User size={18} />
                <span>{getFirstName()}</span>
              </a>
              <button
                onClick={logout}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--form-background)] hover:opacity-80 transition"
                aria-label="Sair da conta"
              >
                <LogOut size={18} />
              </button>
</>
          )}

          {/* Toggle tema extrema direita */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--form-background)] text-[var(--primary)] hover:opacity-80 transition"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}