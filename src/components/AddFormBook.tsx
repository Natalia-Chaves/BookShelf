// src/components/AddBookForm.jsx
import { useState } from "react";

export default function AddBookForm({ onAddBook, onCancel }) {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    imageUrl: "",
  });

interface NewBook {
    title: string;
    author: string;
    imageUrl: string;
}

interface AddBookFormProps {
    onAddBook: (book: NewBook) => void;
    onCancel: () => void;
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newBook.title && newBook.author) {
      onAddBook(newBook);
      setNewBook({ title: "", author: "", imageUrl: "" }); // Limpa o formulário
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-[#EFEAE4] p-8 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-2xl font-bold text-[#6F4E37] mb-4 text-center">
          Adicionar Novo Livro
        </h3>
        <div className="mb-4">
          <label htmlFor="title" className="block text-[#6F4E37] mb-2">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newBook.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-[#6F4E37] mb-2">
            Autor
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={newBook.author}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-[#6F4E37] mb-2">
            URL da Imagem de Capa
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={newBook.imageUrl}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-[#A0522D] text-white font-bold py-2 px-4 rounded-md hover:bg-[#8B4513] transition-colors"
          >
            Adicionar Livro
          </button>
        </div>
      </form>
    </div>
  );
}