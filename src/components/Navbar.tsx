/* eslint-disable @next/next/no-html-link-for-pages */
// components/Navbar.tsx
'use client';
import { BookOpen, Search, User, LogOut, Library } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
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
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-center items-center h-16">
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
            <Library size={28} />
          </a>
          <button
            aria-label="Buscar"
            className="p-1"
          >
            <Search size={28} />
          </button>
        </div>

        {/* Desktop: catálogo texto + busca centralizados */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
          <a href="/dashboard" className="text-lg font-medium hover:text-[var(--primary)] transition">
            Dashboard
          </a>
          <a
            href="/catalogo"
            className="text-lg font-medium hover:text-[var(--primary)] transition"
          >
            Catálogo
          </a>
          <a href="/novidades" className="text-lg font-medium hover:text-[var(--primary)] transition">
            Novidades
          </a>
          {isCatalogPage && (
            <div className="relative items-center bg-[var(--form-background)] rounded-lg px-3 py-2 w-64 flex">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent outline-none w-full text-base"
              />
              <Search size={20} className="ml-2 text-[var(--primary)]" />
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
                <User size={20} />
                <span className="text-base">{getFirstName()}</span>
              </a>
              <button
                onClick={logout}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--form-background)] hover:opacity-80 transition"
                aria-label="Sair da conta"
              >
                <LogOut size={20} />
              </button>
            </>
          )}

          {/* Toggle tema extrema direita */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}