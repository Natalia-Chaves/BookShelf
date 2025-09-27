'use client';

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import BookCard from "@/components/BookCard";
import AddBookForm from "@/components/AddBookForm";
import EditBookForm from "@/components/EditBookForm";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import HeroSection from "@/components/HeroSection"; // Importação mantida

import type { Book } from "@/types";
import { supabase } from "@/lib/supabaseClient";

export default function CatalogoPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  // Função para limpar campos undefined antes de enviar ao Supabase
  function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    const cleaned: Partial<T> = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        cleaned[key] = obj[key];
      }
    }
    return cleaned;
  }

  // Função para carregar livros atualizados
  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAllBooks(data as Book[]);
    setLoading(false);
  };

  // Buscar livros na montagem do componente
  useEffect(() => {
    fetchBooks();
  }, []);

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
  const handleSaveBook = async (book: Book) => {
    if (bookToEdit) {
      // Atualizar no Supabase
      const cleanedBook = cleanObject(book);
      const { error } = await supabase
        .from("books")
        .update(cleanedBook)
        .eq("id", book.id);
      if (!error) {
        await fetchBooks(); // Atualiza lista após edição
      }
    } else {
      // Inserir no Supabase
      const cleanedBook = cleanObject(book);
      const { data, error } = await supabase
        .from("books")
        .insert([cleanedBook])
        .select();
      if (!error && data) {
        await fetchBooks(); // Atualiza lista após inserção
      }
    }

    setShowAddForm(false);
    setBookToEdit(null);
  };

  // Cancelar forms
  const handleCancelForm = () => {
    setShowAddForm(false);
    setBookToEdit(null);
  };

  // Preparar exclusão de livro
  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
  };

  // Confirmar exclusão e atualizar lista
  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;

    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", bookToDelete.id);
    if (!error) {
      await fetchBooks(); // Atualiza lista após exclusão
    }
    setBookToDelete(null);
  };

  const handleCancelDelete = () => {
    setBookToDelete(null);
  };

  // Avaliar livro
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

  if (loading) {
    return (
      <main className="mx-auto flex-1 px-4 bg-[var(--main-background)] min-h-screen pb-32 flex items-center justify-center">
        <p className="text-lg font-medium">Carregando livros...</p>
      </main>
    );
  }

  return (
    <main 
      // Largura do main ajustada: removemos o max-w-7xl e o px-4
      className="mx-auto flex-1 bg-[var(--main-background)] min-h-screen pb-32"
    >
      
      {/* 1. HERO SECTION (Agora full-width, com padding interno) */}
      <HeroSection /> 
      
      {/* 2. CONTEÚDO DO CATÁLOGO: Usa o mesmo padding px-12 para o alinhamento total */}
      <div className="mt-12 px-12"> 
        {/* Títulos e contador */}
        <h2 className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Catálogo de Livros
        </h2>
        <p className="text-center mb-6" style={{ color: 'var(--color-text-primary)' }}>
            Total de livros: <span className="font-semibold">{allBooks.length}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch">
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
              // Adaptação da cor do botão para a paleta Mistletoe (ex: bg-[#6E3D34])
              className="w-24 h-24 bg-[#6E3D34] hover:bg-opacity-80 text-white rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#6E3D34] focus:ring-opacity-50"
              aria-label="Adicionar novo livro"
            >
              <Plus size={40} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {showAddForm && !bookToEdit && (
        <AddBookForm
          onSave={handleSaveBook}
          onCancel={handleCancelForm}
        />
      )}

      {bookToEdit && (
        <EditBookForm
          book={bookToEdit}
          onSave={handleSaveBook}
          onCancel={handleCancelForm}
        />
      )}

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