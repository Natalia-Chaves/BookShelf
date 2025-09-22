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
  
  // Navbar para páginas de autenticação (login/cadastro)
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

  // Navbar para as demais páginas da aplicação
  return (
    <nav className="w-full bg-[var(--card-background)] text-[var(--foreground)] shadow-lg relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center h-16">
        {/* Logo */}
        <a
          href="/catalogo"
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
        >
          <BookOpen size={28} />
          <span className="text-2xl font-bold">CaféBooks</span>
        </a>

        {/* Link Catálogo em texto no desktop, ícone no mobile */}
        <div className="flex items-center gap-8">
          {/* Texto no desktop */}
          <div className="hidden md:block text-sm font-medium">
            <a
              href="/catalogo"
              className="hover:text-[var(--primary)] transition"
            >
              Catálogo
            </a>
          </div>

          {/* Ícone no mobile */}
          <div className="md:hidden">
            <a
              href="/catalogo"
              className="p-2 rounded-lg hover:bg-[var(--form-background)] transition"
              aria-label="Ir para o Catálogo"
            >
              <Library size={20} />
            </a>
          </div>
        </div>

        {/* Busca e ações */}
        <div className="flex items-center gap-3">
          {isCatalogPage && (
            <>
              {/* Input de busca no desktop */}
              <div className="hidden md:flex relative items-center bg-[var(--form-background)] rounded-lg px-3 py-2 w-48 md:w-64">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent outline-none w-full text-sm"
                />
                <Search size={18} className="ml-2 text-[var(--primary)]" />
              </div>

              {/* Ícone de busca no mobile */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-[var(--form-background)] transition"
                aria-label="Buscar"
              >
                <Search size={20} />
              </button>
            </>
          )}

          {/* Usuário autenticado: perfil e logout */}
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

          {/* Botão para alternar tema */}
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
