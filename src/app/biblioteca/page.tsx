// src/app/BibliotecaPage.jsx
'use client'; 

import { Plus } from "lucide-react"; // Importe o ícone Plus
import BookCard from "@/components/BookCard";
import { books } from "@/lib/books"; 

export default function BibliotecaPage() {
  return (
    <main className=" mx-auto px-4 py-8 bg-[#6F4E37] min-h-screen">
      <h2 className="text-3xl font-bold text-[#EFEAE4] text-center mb-12">
        Sua Biblioteca de Livros
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book, index) => (
          <BookCard 
            key={index} 
            title={book.title} 
            author={book.author} 
            imageUrl={book.imageUrl} 
          />
        ))}

        {/* Botão de Adicionar Livro como um "card" no grid */}
        <div className="flex items-center justify-center p-4">
          <button 
            // onClick={handleShowForm} // Ative este onClick se você tiver o formulário
            className="w-24 h-24 bg-[#A0522D] hover:bg-[#8B4513] text-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#A0522D] focus:ring-opacity-50"
            aria-label="Adicionar novo livro"
          >
            {/* Use o componente de ícone <Plus /> */}
            <Plus size={40} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </main>
  );
}