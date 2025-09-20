// src/app/biblioteca/page.tsx
'use client'; 

import { useState } from "react";
import { Plus } from "lucide-react";
import BookCard from "@/components/BookCard";
import AddBookForm from "@/components/AddBookForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { books as initialBooks } from "@/lib/books"; 

export default function BibliotecaPage() {
  const [allBooks, setAllBooks] = useState(
    initialBooks.map((book, index) => ({ ...book, id: index + 1 }))
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  // === Funções de Adicionar ===
  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleSaveBook = (newBook) => {
    const newBookWithId = { ...newBook, id: Date.now() };
    setAllBooks([newBookWithId, ...allBooks]);
    setShowAddForm(false);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
  };

  // === Funções de Excluir ===
  const handleDeleteBook = (book) => {
    setBookToDelete(book);
  };

  const handleConfirmDelete = () => {
    const updatedBooks = allBooks.filter(book => book.id !== bookToDelete.id);
    setAllBooks(updatedBooks);
    setBookToDelete(null); // Fechar o modal
  };

  const handleCancelDelete = () => {
    setBookToDelete(null); // Fechar o modal
  };

  return (
    <main className="mx-auto px-4 py-8 bg-[#6F4E37] min-h-screen">
      <h2 className="text-3xl font-bold text-[#EFEAE4] text-center mb-12">
        Sua Biblioteca de Livros
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {allBooks.map((book, index) => (
          <BookCard 
            key={book.id} 
            book={book} 
            onDelete={handleDeleteBook} 
          />
        ))}

        <div className="flex items-center justify-center p-4">
          <button 
            onClick={handleShowAddForm}
            className="w-24 h-24 bg-[#A0522D] hover:bg-[#8B4513] text-white rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#A0522D] focus:ring-opacity-50"
            aria-label="Adicionar novo livro"
          >
            <Plus size={40} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {showAddForm && (
        <AddBookForm 
          onSave={handleSaveBook} 
          onCancel={handleCancelForm} 
        />
      )}

      {bookToDelete && (
        <DeleteConfirmationModal 
          bookTitle={bookToDelete.title} 
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </main>
  );
}