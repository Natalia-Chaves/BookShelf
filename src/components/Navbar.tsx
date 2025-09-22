'use client';
import { BookOpen, Search, User, Sun, Moon, LogOut } from "lucide-react";
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
  const isCatalogPage = pathname === '/catalogo'; // Você pode ajustar ou remover se não for mais necessário

  const getFirstName = () => {
    if (!user || !user.name) return 'Perfil';
    return user.name.split(' ')[0];
  };
  
  // Condição para a página de autenticação
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
          
          {/* O BOTÃO DE TEMA QUE ESTAVA AQUI FOI REMOVIDO */}

        </div>
      </nav>
    );
  }

  // Navbar para as outras páginas da aplicação
  return (
    <nav className="w-full bg-[var(--card-background)] text-[var(--foreground)] shadow-lg relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <a
          href="/catalogo"
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
        >
          <BookOpen size={28} />
          <span className="text-2xl font-bold">CaféBooks</span>
        </a>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="/catalogo" className="hover:text-[var(--primary)] transition">Catálogo</a>
        </div>

        {/* Lógica de busca, se aplicável */}
        {isCatalogPage && (
          <div className="relative flex items-center bg-[var(--form-background)] rounded-lg px-3 py-2 w-48 md:w-64">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent outline-none w-full text-sm"
            />
            <Search size={18} className="ml-2 text-[var(--primary)]" />
          </div>
        )}

        <div className="ml-4 flex items-center gap-3">
          {isAuthenticated && (
            <>
              <a
                href="/perfil"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--form-background)] hover:opacity-80 transition"
              >
                <User size={18} />
                <span>{getFirstName()}</span>
              </a>
              <button
                onClick={logout}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--form-background)] hover:opacity-80 transition"
                aria-label="Sair da conta"
              >
                <LogOut size={18} />
              </button>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--form-background)] text-[var(--primary)] hover:opacity-80 transition"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}