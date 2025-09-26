// app/components/BookListClient.tsx
"use client";

import { useState } from "react";
import BookCard from "./BookCard";
import AddBookForm from "./AddBookForm";
import EditBookForm from "./EditBookForm";
import type { Book } from "@/types";

type BookListClientProps = {
  initialBooks: Book[];
};

export default function BookListClient({ initialBooks }: BookListClientProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [bookBeingEdited, setBookBeingEdited] = useState<Book | null>(null);

  const handleAddClick = () => {
    setShowAddForm(true);
    setBookBeingEdited(null);
  };

  const handleEdit = (book: Book) => {
    setBookBeingEdited(book);
    setShowAddForm(false);
  };

  const handleDelete = (book: Book) => {
    setBooks(prev => prev.filter(b => b.id !== book.id));
  };

  const handleRate = (book: Book, rating: number) => {
    setBooks(prev =>
      prev.map(b => (b.id === book.id ? { ...b, rating } : b))
    );
  };

  const handleSaveBook = (book: Book) => {
    setBooks(prev => {
      const exists = prev.find(b => b.id === book.id);
      if (exists) {
        return prev.map(b => (b.id === book.id ? book : b));
      } else {
        return [...prev, book];
      }
    });

    setShowAddForm(false);
    setBookBeingEdited(null);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setBookBeingEdited(null);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleAddClick}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
            onRate={handleRate}
          />
        ))}
      </div>

      {showAddForm && !bookBeingEdited && (
        <AddBookForm onSave={handleSaveBook} onCancel={handleCancelForm} />
      )}

      {bookBeingEdited && (
        <EditBookForm
          book={bookBeingEdited}
          onSave={handleSaveBook}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}
