'use client';

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import BookCard from "@/components/BookCard";
import AddBookForm from "@/components/AddBookForm";
import EditBookForm from "@/components/EditBookForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

import { initialBooks } from "@/lib/books";
import type { Book } from "@/types";

export default function CatalogoPage() {
  const [allBooks, setAllBooks] = useState<Book[]>(() => {
    if (typeof window !== 'undefined') {
      const savedBooks = localStorage.getItem('myBooks');
      if (savedBooks) return JSON.parse(savedBooks);
    }
    return initialBooks.map(book => ({
      ...book,
      id: book.id || Date.now().toString() + Math.random().toString(36).substring(2, 9),
      rating: book.rating ?? 0,
      synopsis: book.synopsis ?? '',
    }));
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  useEffect(() => {
    localStorage.setItem('myBooks', JSON.stringify(allBooks));
  }, [allBooks]);

  // Abrir form de adicionar livro
  const handleShowAddForm = () => {
    setBookToEdit(null);
    setShowAddForm(true);
  };

  // Abrir form de editar livro
  const handleEditBook = (book: Book) => {
    setBookToEdit(book);
    setShowAddForm(false);
  };

  // Salvar livro (novo ou editado)
  const handleSaveBook = (book: Book) => {
    if (bookToEdit) {
      // Atualiza livro existente
      setAllBooks(prev =>
        prev.map(b => (b.id === book.id ? book : b))
      );
    } else {
      // Adiciona novo livro com id único
      const newBook = {
        ...book,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        rating: book.rating ?? 0,
        synopsis: book.synopsis ?? '',
      };
      setAllBooks(prev => [newBook, ...prev]);
    }
    setShowAddForm(false);
    setBookToEdit(null);
  };

  // Cancelar forms
  const handleCancelForm = () => {
    setShowAddForm(false);
    setBookToEdit(null);
  };

  // Excluir livro
  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
  };
  const handleConfirmDelete = () => {
    if (!bookToDelete) return;
    setAllBooks(prev => prev.filter(b => b.id !== bookToDelete.id));
    setBookToDelete(null);
  };
  const handleCancelDelete = () => {
    setBookToDelete(null);
  };

  // Avaliar livro
  const handleRateBook = (book: Book, rating: number) => {
    setAllBooks(prev =>
      prev.map(b => (b.id === book.id ? { ...b, rating } : b))
    );
  };

  return (
    <main className="mx-auto px-4 bg-[var(--main-background)] min-h-screen pb-20">

      <h2 className="text-3xl font-bold text-center mb-2">Catálogo de Livros</h2>
      <p className="text-center mb-6" style={{ color: "var(--text-primary)" }}>
        Total de livros: <span className="font-semibold">{allBooks.length}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {allBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
            onRate={handleRateBook}
          />
        ))}

        {/* Botão + para adicionar livro */}
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

      {/* Formulário de adicionar livro */}
      {showAddForm && !bookToEdit && (
        <AddBookForm
          onSave={handleSaveBook}
          onCancel={handleCancelForm}
        />
      )}

      {/* Formulário de editar livro */}
      {bookToEdit && (
        <EditBookForm
          book={bookToEdit}
          onSave={handleSaveBook}
          onCancel={handleCancelForm}
        />
      )}

      {/* Modal confirmação de exclusão */}
      {bookToDelete && (
        <DeleteConfirmationModal
          book={bookToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </main>
  );
}
