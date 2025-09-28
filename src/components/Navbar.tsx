"use client";
import { BookOpen, Search, LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [isSmallLogo, setIsSmallLogo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowPlaceholder(window.innerWidth >= 450);
      setIsSmallLogo(window.innerWidth < 430);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAuthPage = pathname === "/" || pathname === "/cadastro";
  const isCatalogPage = pathname === "/catalogo";

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
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center h-16 w-full">

        {/* LOGO */}
        <a
          href="/catalogo"
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition flex-shrink-0"
        >
          <BookOpen size={isSmallLogo ? 22 : 28} />
          <span className={`font-bold ${isSmallLogo ? 'text-xl' : 'text-2xl'}`}>
            CaféBooks
          </span>
        </a>

        {/* LINKS + BARRA DE PESQUISA */}
        <div className="flex-1 flex items-center gap-4 ml-6">

          {/* Links centralizados */}
          {!menuOpen && (
            <div className="hidden sm:flex flex-1 justify-center items-center gap-6">
              <a href="/catalogo" className="text-base xl:text-lg font-medium hover:text-[var(--primary)] transition">Catálogo</a>
              <a href="/dashboard" className="text-base xl:text-lg font-medium hover:text-[var(--primary)] transition">Dashboard</a>
              <a href="/novidades" className="text-base xl:text-lg font-medium hover:text-[var(--primary)] transition">Novidades</a>
            </div>
          )}

          {/* Menu hambúrguer mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded hover:bg-[var(--form-background)] sm:hidden flex-shrink-0"
            aria-label="Abrir menu"
          >
            <Menu size={28} />
          </button>

          {/* Barra de pesquisa */}
          {isCatalogPage && (
            <div className="relative flex items-center bg-[#f5e6d5] rounded-lg px-3 py-2 flex-1 max-w-[calc(100%-60px)] sm:max-w-[450px]">
              <input
                type="text"
                placeholder={showPlaceholder ? "Buscar..." : ""}
                className="bg-transparent outline-none w-full text-base placeholder:text-gray-600 text-gray-900"
              />
              <Search size={20} className="ml-2 text-gray-900" />
            </div>
          )}

        </div>

        {/* AÇÕES DIREITA */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          {isAuthenticated && (
            <button
              onClick={logout}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--form-background)] hover:opacity-80 transition"
              aria-label="Sair da conta"
            >
              <LogOut size={20} />
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Menu dropdown mobile */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col bg-[var(--card-background)] border-t border-gray-200 px-4 py-2 gap-3">
          <a href="/catalogo" className="hover:text-[var(--primary)]">Catálogo</a>
          <a href="/dashboard" className="hover:text-[var(--primary)]">Dashboard</a>
          <a href="/novidades" className="hover:text-[var(--primary)]">Novidades</a>
        </div>
      )}
    </nav>
  );
}
