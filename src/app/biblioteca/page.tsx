'use client';


import { useState, useEffect } from "react";

import { Plus } from "lucide-react";

import { useSearchParams } from 'next/navigation';

import BookCard from "@/components/BookCard";

import AddBookForm from "@/components/AddBookForm";

import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

import { books as initialBooks } from "@/lib/books";

import type { Book } from "@/types";


interface BibliotecaPageProps {
  theme: { [key: string]: string };
}

export default function BibliotecaPage({ theme }: BibliotecaPageProps) {

  const [allBooks, setAllBooks] = useState(() => {

    const savedBooks = typeof window !== 'undefined' ? localStorage.getItem('myBooks') : null;

    if (savedBooks) {

      return JSON.parse(savedBooks);

    }

    return initialBooks.map((book, index) => ({ ...book, id: index + 1 }));

  });


  const [showAddForm, setShowAddForm] = useState(false);

  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);


  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('busca') || '';

  const filterGenre = searchParams.get('genero') || '';

  const filterYear = searchParams.get('ano') || '';


  useEffect(() => {

    localStorage.setItem('myBooks', JSON.stringify(allBooks));

  }, [allBooks]);


  const handleShowAddForm = () => {

    setShowAddForm(true);

  };


  const handleEditBook = (book: Book) => {

    setBookToEdit(book);

  };


  const handleSaveBook = (updatedBook: Book) => {

    if (updatedBook.id) {

      const updatedBooks = allBooks.map((book: Book) =>

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


  const handleDeleteBook = (book: Book) => {

    setBookToDelete(book);

  };


  const handleConfirmDelete = () => {
    if (!bookToDelete) { 
        return; 
    } 

    const updatedBooks = allBooks.filter((book: Book) => book.id !== bookToDelete.id);

    setAllBooks(updatedBooks);

    setBookToDelete(null);
  };


  const handleCancelDelete = () => {

    setBookToDelete(null);

  };


  const filteredBooks = allBooks.filter((book: Book) => {

    const term = searchTerm.toLowerCase();

    const genreMatch = book.genres?.some((genre: string) =>

      genre.toLowerCase().includes(term)

    ) || false;


    const titleMatch = book.title.toLowerCase().includes(term);

    const authorMatch = book.author.toLowerCase().includes(term);


    const genreFilter = filterGenre ? book.genres?.includes(filterGenre) : true;

    const yearFilter = filterYear ? book.year === filterYear : true;


    return (titleMatch || authorMatch || genreMatch) && genreFilter && yearFilter;

  });


  return (

    <main className="mx-auto px-4 py-8 bg-[var(--main-background)] min-h-screen">

      <h2

        className="text-3xl font-bold text-center mb-6"

      >

        Sua Biblioteca de Livros

      </h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {filteredBooks.map((book: Book) => (

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
          
          bookToEdit={null}

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