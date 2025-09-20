// src/components/BookCard.tsx
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function BookCard({ book, onEdit, onDelete }) {
  const { title, author, imageUrl } = book;

  return (
    <div className="bg-[#EFEAE4] rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105">
      <div className="relative w-full h-64">
        <img
          src={imageUrl}
          alt={`Capa do livro ${title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold text-[#6F4E37] mb-2">
          {title}
        </h3>
        <p className="text-[#8B4513] italic mb-4">{author}</p>
        
        <div className="flex gap-2">
          <button
            onClick={() => alert(`Visualizar livro: ${title}`)}
            className="p-1.5 rounded-full bg-[#A0522D] text-white hover:bg-[#8B4513] transition-colors"
            aria-label="Visualizar livro"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(book)}
            className="p-1.5 rounded-full bg-[#A0522D] text-white hover:bg-[#8B4513] transition-colors"
            aria-label="Editar livro"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(book)}
            className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
            aria-label="Excluir livro"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}