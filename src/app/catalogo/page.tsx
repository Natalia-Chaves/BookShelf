'use client';

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useSearchParams } from 'next/navigation';

import BookCard from "@/components/BookCard";
import AddBookForm from "@/components/AddBookForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

import { books as initialBooks } from "@/lib/books";
import type { Book } from "@/types";

export default function CatalogoPage() {
  const [allBooks, setAllBooks] = useState<Book[]>(() => {
    const savedBooks = typeof window !== 'undefined' ? localStorage.getItem('myBooks') : null;
    if (savedBooks) return JSON.parse(savedBooks);
    return initialBooks.map(book => ({
      ...book,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      rating: book.rating ?? 0, // garantir que tenha rating
    }));
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('busca')?.toLowerCase() || '';
  const filterGenre = searchParams.get('genero') || '';
  const filterYear = searchParams.get('ano') || '';

  useEffect(() => {
    localStorage.setItem('myBooks', JSON.stringify(allBooks));
  }, [allBooks]);

  const handleShowAddForm = () => setShowAddForm(true);

  const handleEditBook = (book: Book) => setBookToEdit(book);

  const handleSaveBook = (updatedBook: Book) => {
    if (updatedBook.id && allBooks.some(b => b.id === updatedBook.id)) {
      setAllBooks(allBooks.map(b => b.id === updatedBook.id ? updatedBook : b));
    } else {
      setAllBooks([
        { ...updatedBook, id: Date.now().toString() + Math.random().toString(36).substring(2, 9) },
        ...allBooks
      ]);
    }
    setShowAddForm(false);
    setBookToEdit(null);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setBookToEdit(null);
  };

  const handleDeleteBook = (book: Book) => setBookToDelete(book);
  const handleConfirmDelete = () => {
    if (!bookToDelete) return;
    setAllBooks(allBooks.filter(book => book.id !== bookToDelete.id));
    setBookToDelete(null);
  };
  const handleCancelDelete = () => setBookToDelete(null);

  const handleRateBook = (book: Book, rating: number) => {
    setAllBooks(prevBooks =>
      prevBooks.map(b => b.id === book.id ? { ...b, rating } : b)
    );
  };

  const filteredBooks = allBooks.filter(book => {
    const titleMatch = book.title.toLowerCase().includes(searchTerm);
    const authorMatch = book.author.toLowerCase().includes(searchTerm);
    const genreMatch = book.genre?.toLowerCase().includes(searchTerm) || false;
    const genreFilter = filterGenre ? book.genre === filterGenre : true;
    const yearFilter = filterYear ? book.year?.toString() === filterYear : true;
    return (titleMatch || authorMatch || genreMatch) && genreFilter && yearFilter;
  });

  return (
    <main
      className="mx-auto px-4 py-8 bg-[var(--main-background)] overflow-auto"
      style={{ maxHeight: 'calc(100vh - 64px)', marginTop: '64px' }}
    >
      <h2 className="text-3xl font-bold text-center mb-2">Catálogo de Livros</h2>
      <p className="text-center mb-6" style={{ color: "var(--text-primary)" }}>
        Total de livros: <span className="font-semibold">{allBooks.length}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            onEdit={handleEditBook} 
            onDelete={handleDeleteBook} 
            onRate={handleRateBook}
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

      {showAddForm && <AddBookForm onSave={handleSaveBook} onCancel={handleCancelForm} />}
      {bookToEdit && <AddBookForm bookToEdit={bookToEdit} onSave={handleSaveBook} onCancel={handleCancelForm} />}
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
