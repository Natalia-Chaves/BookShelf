<<<<<<< HEAD
'use client';

import { useState } from 'react';
import BookCard from "@/components/BookCard";
import AddBookForm from "../components/AddFormBook";
import { books as initialBooks } from "@/lib/books"; 

export default function BibliotecaPage() {
  const [showForm, setShowForm] = useState(false);
  const [bookList, setBookList] = useState(initialBooks);

  const handleAddBook = (newBook) => {
    // Adiciona o novo livro no início da lista
    setBookList([newBook, ...bookList]); 
    setShowForm(false); // Esconde o formulário
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
=======
import Image from "next/image";

export default function BookCard({ title, author, imageUrl }) {
  return (
    <div className="bg-[#EFEAE4] rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-64">
        <Image
          src={imageUrl}
          alt={`Capa do livro ${title}`}
          fill={true} 
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#6F4E37] mb-2">
          {title}
        </h3>
        <p className="text-[#8B4513] italic">{author}</p>
>>>>>>> 67b003f96eb1365b8f77519108ae559d1e2b9490
      </div>
    </main>
  );
}