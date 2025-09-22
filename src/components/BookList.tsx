'use client';

import React, { useState } from 'react';
import BookCard from './BookCard';
import AddBookForm from './AddBookForm'; // seu formulário de adicionar/editar
import type { Book } from '@/types';
import { initialBooks } from '@/lib/books';

export default function BookList() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (book: Book) => {
    setBookToEdit(book);
    setIsFormOpen(true);  // Abre o formulário
  };

  const handleDelete = (book: Book) => {
    setBooks(prev => prev.filter(b => b.id !== book.id));
  };

  const handleSave = (book: Book) => {
    setBooks(prev => {
      const exists = prev.find(b => b.id === book.id);
      if (exists) {
        return prev.map(b => (b.id === book.id ? book : b));
      } else {
        return [...prev, book];
      }
    });
    setIsFormOpen(false);
    setBookToEdit(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setBookToEdit(null);
  };

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => {
          setBookToEdit(null);
          setIsFormOpen(true);
        }}
      >
        Adicionar Livro
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRate={(book, rating) => {
              setBooks(prev =>
                prev.map(b => (b.id === book.id ? { ...b, rating } : b))
              );
            }}
          />
        ))}
      </div>

      {isFormOpen && (
        <AddBookForm
          bookToEdit={bookToEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
