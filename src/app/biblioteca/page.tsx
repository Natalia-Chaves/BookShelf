'use client';

import { useState } from 'react';
import BookCard from "../../components/BookCard";
import { books as initialBooks } from "@/lib/books"; 

export default function BibliotecaPage() {
  const [showForm, setShowForm] = useState(false);
  const [bookList, setBookList] = useState(initialBooks);

  interface Book {
    title: string;
    author: string;
    imageUrl: string;
  }

  interface AddBookFormProps {
    onAddBook: (newBook: Book) => void;
    onCancel: () => void;
  }

  const handleAddBook = (newBook: Book) => {
    setBookList([newBook, ...bookList]);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  return (
    <main className="container mx-auto px-4 py-8 bg-[#D2B48C] min-h-screen">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-[#6F4E37] text-center">
          Sua Biblioteca de Livros
        </h2>
        <button 
          onClick={handleShowForm}
          className="bg-[#A0522D] hover:bg-[#8B4513] text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
          Adicionar Livro
        </button>
      </div>
      
      {showForm && (
        <AddBookForm 
          onAddBook={handleAddBook} 
          onCancel={handleCancelForm} 
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {bookList.map((book, index) => (
          <BookCard 
            key={index} 
            title={book.title} 
            author={book.author} 
            imageUrl={book.imageUrl} 
          />
        ))}
      </div>
    </main>
  );
}