import { BookOpen, Search, Library, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#3e2723] text-[#f5f5dc] shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <BookOpen size={28} className="text-[#d7a86e]" />
          <span className="text-xl font-bold">CaféBooks</span>
        </div>

        {/* Links principais */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-[#d7a86e] transition">Minha Biblioteca</a>
          <a href="#" className="hover:text-[#d7a86e] transition">Explorar</a>
          <a href="#" className="hover:text-[#d7a86e] transition">Categorias</a>
        </div>

        {/* Barra de pesquisa */}
        <div className="flex items-center bg-[#5d4037] rounded-lg px-2 py-1 w-48 md:w-64">
          <Search size={18} className="text-[#d7a86e]" />
          <input
            type="text"
            placeholder="Buscar livros..."
            className="bg-transparent w-full px-2 text-sm focus:outline-none placeholder-[#d7a86e]"
          />
        </div>

        {/* Perfil */}
        <div className="ml-4">
          <button className="flex items-center gap-2 bg-[#d7a86e] text-[#3e2723] px-3 py-1 rounded-lg hover:bg-[#c7925c] transition">
            <User size={18} />
            <span className="hidden md:inline">Perfil</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex justify-around bg-[#5d4037] py-2">
        <a href="#"><Library size={22} className="text-[#d7a86e]" /></a>
        <a href="#"><Search size={22} className="text-[#d7a86e]" /></a>
        <a href="#"><User size={22} className="text-[#d7a86e]" /></a>
      </div>
    </nav>
  );
}
