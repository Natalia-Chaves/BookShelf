'use client';

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import BookCard from "@/components/BookCard";
import AddBookForm from "@/components/AddBookForm";
import EditBookForm from "@/components/EditBookForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import HeroSection from "@/components/HeroSection";
import type { Book } from "@/types";
import { supabase } from "@/lib/supabaseClient";

export default function CatalogoPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    const cleaned: Partial<T> = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        cleaned[key] = obj[key];
      }
    }
    return cleaned;
  }

  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setAllBooks(data as Book[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleShowAddForm = () => {
    setBookToEdit(null);
    setShowAddForm(true);
  };

  const handleEditBook = (book: Book) => {
    setBookToEdit(book);
    setShowAddForm(false);
  };

  const handleSaveBook = async (book: Book) => {
    if (bookToEdit) {
      const cleanedBook = cleanObject(book);
      const { error } = await supabase
        .from("books")
        .update(cleanedBook)
        .eq("id", book.id);
      if (!error) await fetchBooks();
    } else {
      const cleanedBook = cleanObject(book);
      const { data, error } = await supabase
        .from("books")
        .insert([cleanedBook])
        .select();
      if (!error && data) await fetchBooks();
    }

    setShowAddForm(false);
    setBookToEdit(null);
  };

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", bookToDelete.id);
    if (!error) await fetchBooks();
    setBookToDelete(null);
  };

  const handleCancelDelete = () => {
    setBookToDelete(null);
  };

  const handleRateBook = async (book: Book, rating: number) => {
    const updatedBook = { ...book, rating };
    const { error } = await supabase
      .from("books")
      .update({ rating })
      .eq("id", book.id);

    if (!error) {
      setAllBooks(prev =>
        prev.map(b => (b.id === book.id ? updatedBook : b))
      );
    }
  };

  const handleUpdateBookStatus = async (book: Book, newStatus: string) => {
    const { error } = await supabase
      .from('books')
      .update({ status: newStatus })
      .eq('id', book.id);

    if (!error) {
      setAllBooks(prev =>
        prev.map(b => (b.id === book.id ? { ...b, status: newStatus } : b))
      );
    } else {
      console.error('Erro ao atualizar status:', error);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto flex-1 px-4 bg-[var(--main-background)] min-h-screen pb-32 flex items-center justify-center">
        <p className="text-lg font-medium">Carregando livros...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex-1 bg-[var(--main-background)] min-h-screen pb-32">
      <div className="px-6 lg:px-20">
        <HeroSection />

        <div className="mt-12">
          <h2
            className="text-3xl font-bold text-center mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Catálogo de Livros
          </h2>

          <p
            className="text-center mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Total de livros: <span className="font-semibold">{allBooks.length}</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-5 items-stretch">
            {allBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
                onRate={handleRateBook}
                onStatusUpdate={handleUpdateBookStatus}
              />
            ))}

            <div className="flex items-center justify-center p-4">
              <button
                onClick={handleShowAddForm}
                className="w-24 h-24 bg-[#6E3D34] hover:bg-opacity-80 text-white rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#6E3D34] focus:ring-opacity-50"
                aria-label="Adicionar novo livro"
              >
                <Plus size={40} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && !bookToEdit && (
        <AddBookForm onSave={handleSaveBook} onCancel={() => setShowAddForm(false)} />
      )}

      {bookToEdit && (
        <EditBookForm
          book={bookToEdit}
          onSave={handleSaveBook}
          onCancel={() => setBookToEdit(null)}
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
