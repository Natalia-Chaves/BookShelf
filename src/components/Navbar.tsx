'use client';
import { useState, useEffect } from "react";
import { BookOpen, Search, Library, User, Sun, Moon, Filter } from "lucide-react";

const ALL_GENRES = ["Fantasia", "Fábula", "Sátira", "Distopia", "Ficção Científica", "Aventura", "Clássico", "Política", "Épico", "Infantil", "Filosofia", "Não-Ficção", "História", "Antropologia", "Jovem Adulto"];
const ALL_YEARS = ["1950", "1960", "2000", "2010"];

// Função para obter parâmetros da URL
const getSearchParams = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

export default function Navbar({ theme, toggleTheme }) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useState(getSearchParams());

  // Use useEffect para atualizar os parâmetros de busca quando a URL mudar
  useEffect(() => {
    const handlePopstate = () => {
      setSearchParams(getSearchParams());
    };
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  const currentSearchTerm = searchParams.get('busca') || '';
  const currentGenre = searchParams.get('genero') || '';
  const currentYear = searchParams.get('ano') || '';

  const [searchTerm, setSearchTerm] = useState(currentSearchTerm);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('busca', value);
    } else {
      params.delete('busca');
    }
    window.location.href = `/biblioteca?${params.toString()}`;
  };

  const handleFilter = (type, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchParams.get(type) === value) {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    window.location.href = `/biblioteca?${params.toString()}`;
  };

  return (
    <nav className="w-full bg-[var(--background)] text-[var(--foreground)] shadow-lg relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo - agora um link clicável */}
        <a href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
          <BookOpen size={28} />
          <span className="text-2xl font-bold">CaféBooks</span>
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="/biblioteca" className="hover:text-[#d7a86e] transition">Minha Biblioteca</a>
          <a href="/explorar" className="hover:text-[#d7a86e] transition">Explorar</a>
          <a href="/categorias" className="hover:text-[#d7a86e] transition">Categorias</a>
        </div>

        {/* Search */}
        <div className="relative flex items-center bg-[var(--form-background)] rounded-lg px-3 py-2 w-48 md:w-64">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar livros..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-transparent w-full px-2 text-sm focus:outline-none"
          />
          <button onClick={() => setShowFilters(!showFilters)} className="text-[#d7a86e] hover:text-white ml-2">
            <Filter size={18} />
          </button>

          {showFilters && (
            <div className="absolute top-12 left-0 w-64 bg-[var(--form-background)] rounded-lg p-4 shadow-lg z-50">
              <h4 className="text-sm font-bold mb-2 text-[#d7a86e]">Gêneros</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {ALL_GENRES.map(genre => (
                  <button
                    key={genre}
                    onClick={() => handleFilter('genero', genre)}
                    className={`px-3 py-1 text-xs rounded-full transition ${currentGenre === genre ? 'bg-[#d7a86e] text-[var(--background)]' : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[#8b4513]'}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              <h4 className="text-sm font-bold mb-2 text-[#d7a86e]">Anos</h4>
              <div className="flex flex-wrap gap-2">
                {ALL_YEARS.map(year => (
                  <button
                    key={year}
                    onClick={() => handleFilter('ano', year)}
                    className={`px-3 py-1 text-xs rounded-full transition ${currentYear === year ? 'bg-[#d7a86e] text-[var(--background)]' : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[#8b4513]'}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

              {/* Perfil + Toggle */}
        <div className="ml-4 flex items-center gap-3">
          <a href="/perfil" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition 
              ${theme === 'dark' 
                ? 'bg-[#d7a86e] text-[var(--background)] hover:bg-[#c7925c]' 
                : 'bg-[#c7925c] text-[#ffffff] hover:bg-[#af8154]'
              }`}
          >
            <User size={18} />
            <span className="hidden md:inline">Perfil</span>
          </a>

          {/* Botão Dark/Light */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--form-background)] text-[#d7a86e] hover:opacity-80 transition"
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden flex justify-around bg-[var(--form-background)] py-2">
        <a href="/biblioteca"><Library size={22} className="text-[#d7a86e]" /></a>
        <a href="/explorar"><Search size={22} className="text-[#d7a86e]" /></a>
      </div>
    </nav>
  );
}
