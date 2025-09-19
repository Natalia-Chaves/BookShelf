"use client";
import { useEffect, useState } from "react";
import { BookOpen, Search, Library, User, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="w-full bg-[#3b221c] text-[#ededed] shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <BookOpen size={28} className="text-[#d7a86e]" href="/" onClick={() => {}} />
          <span className="text-2xl font-bold">CaféBooks</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="biblioteca" className="hover:text-[#d7a86e] transition">Minha Biblioteca</a>
          <a href="Explorar" className="hover:text-[#d7a86e] transition">Explorar</a>
          <a href="Categorias" className="hover:text-[#d7a86e] transition">Categorias</a>
        </div>

        {/* Search */}
        <div className="flex items-center bg-[#5d4037] rounded-lg px-3 py-2 w-48 md:w-64">
          <Search size={18} className="text-[#d7a86e]" />
          <input
            type="text"
            placeholder="Buscar livros..."
            className="bg-transparent w-full px-2 text-sm focus:outline-none placeholder-[#d7a86e]"
          />
        </div>

        {/* Perfil + Toggle */}
        <div className="ml-4 flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#d7a86e] text-[#3e2723] px-4 py-2 rounded-lg hover:bg-[#c7925c] transition">
            <User size={18} />
            <span className="hidden md:inline">Perfil</span>
          </button>

          {/* Botão Dark/Light */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#5d4037] text-[#d7a86e] hover:opacity-80 transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden flex justify-around bg-[#5d4037] py-2">
        <a href="#"><Library size={22} className="text-[#d7a86e]" /></a>
        <a href="#"><Search size={22} className="text-[#d7a86e]" /></a>
        <a href="#"><User size={22} className="text-[#d7a86e]" /></a>
      </div>
    </nav>
  );
}
