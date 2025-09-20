
"use client";

import { useState } from "react";
import { X, Book, Image as ImageIcon, PenTool } from "lucide-react";

export default function AddBookForm({ bookToEdit, onSave, onCancel }) {
  const [title, setTitle] = useState(bookToEdit?.title || "");
  const [author, setAuthor] = useState(bookToEdit?.author || "");
  const [imageUrl, setImageUrl] = useState(bookToEdit?.imageUrl || "");

  const isEditing = !!bookToEdit;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !imageUrl) return;

    onSave({ 
      id: bookToEdit?.id,
      title, 
      author, 
      imageUrl 
    });

    // Limpa os campos do formulário
    setTitle("");
    setAuthor("");
    setImageUrl("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#D9B9A0] p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#6F4E37] hover:text-[#A0522D]"
          aria-label="Fechar formulário"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-[#6F4E37] mb-6 text-center">
          {isEditing ? "Editar Livro" : "Adicionar Novo Livro"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 bg-[#EFEAE4] p-3 rounded-lg">
            <Book size={20} className="text-[#A0522D]" />
            <input
              type="text"
              placeholder="Título do Livro"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-[#6F4E37] placeholder-[#8B4513]"
              required
            />
          </div>
          <div className="flex items-center gap-3 bg-[#EFEAE4] p-3 rounded-lg">
            <PenTool size={20} className="text-[#A0522D]" />
            <input
              type="text"
              placeholder="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-[#6F4E37] placeholder-[#8B4513]"
              required
            />
          </div>
          <div className="flex items-center gap-3 bg-[#EFEAE4] p-3 rounded-lg">
            <ImageIcon size={20} className="text-[#A0522D]" />
            <input
              type="url"
              placeholder="URL da Imagem de Capa"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-[#6F4E37] placeholder-[#8B4513]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#A0522D] text-white font-semibold py-3 rounded-lg mt-4 hover:bg-[#8B4513] transition-colors"
          >
            {isEditing ? "Salvar Alterações" : "Adicionar Livro"}
          </button>
        </form>
      </div>
    </div>
  );
}