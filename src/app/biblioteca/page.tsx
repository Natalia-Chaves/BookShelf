// src/app/biblioteca/page.tsx
'use client'; 

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import BookCard from "@/components/BookCard";
import AddBookForm from "@/components/AddBookForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { books as initialBooks } from "@/lib/books"; 

export default function BibliotecaPage() {
  const [allBooks, setAllBooks] = useState(() => {
    const savedBooks = localStorage.getItem('myBooks');
    if (savedBooks) {
      return JSON.parse(savedBooks);
    }
    return initialBooks.map((book, index) => ({ ...book, id: index + 1 }));
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('busca') || '';

  useEffect(() => {
    localStorage.setItem('myBooks', JSON.stringify(allBooks));
  }, [allBooks]);

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleEditBook = (book) => {
    setBookToEdit(book);
  };

  const handleSaveBook = (updatedBook) => {
    if (updatedBook.id) {
      const updatedBooks = allBooks.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      );
      setAllBooks(updatedBooks);
    } else {
      const newBookWithId = { ...updatedBook, id: Date.now() };
      setAllBooks([newBookWithId, ...allBooks]);
    }
    setShowAddForm(false);
    setBookToEdit(null);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setBookToEdit(null);
  };

  const handleDeleteBook = (book) => {
    setBookToDelete(book);
  };

  const handleConfirmDelete = () => {
    const updatedBooks = allBooks.filter(book => book.id !== bookToDelete.id);
    setAllBooks(updatedBooks);
    setBookToDelete(null);
  };

  const handleCancelDelete = () => {
    setBookToDelete(null);
  };

  const filteredBooks = allBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="mx-auto px-4 py-8 bg-[#6F4E37] min-h-screen">
      <h2 className="text-3xl font-bold text-[#EFEAE4] text-center mb-6">
        Sua Biblioteca de Livros
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            onEdit={handleEditBook} 
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

      {bookToEdit && (
        <AddBookForm 
          bookToEdit={bookToEdit} 
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