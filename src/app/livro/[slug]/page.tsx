'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { books as initialBooks } from '@/lib/books';
import type { Book } from '@/types';

// Função para gerar slug do título
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove pontuações
    .replace(/[\s_-]+/g, '-') // Substitui espaços e underlines por hífen
    .replace(/^-+|-+$/g, ''); // Remove hífens extras no começo/fim
};

export default function BookDetailPage() {
  const params = useParams();
  const { slug } = params;

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const storedBooks =
      typeof window !== 'undefined' ? localStorage.getItem('myBooks') : null;

    const parsedBooks: Book[] = storedBooks
      ? JSON.parse(storedBooks)
      : initialBooks;

    const found = parsedBooks.find((b) => createSlug(b.title) === slug);
    setBook(found || null);
  }, [slug]);

  if (!book) {
    return (
      <div
        className="container mx-auto px-4 py-12 min-h-screen text-center"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        <p className="text-xl font-semibold">Livro não encontrado.</p>
        <a
          href="/catalogo"
          className="inline-block mt-6 text-sm hover:underline"
          style={{ color: 'var(--divider-color)' }}
        >
          &larr; Voltar para o Catálogo
        </a>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-12 min-h-screen"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      {/* Link de volta */}
      <a
        href="/catalogo"
        className="flex items-center text-sm font-medium mb-8 hover:underline"
        style={{ color: 'var(--divider-color)' }}
      >
        &larr; Voltar para o Catálogo
      </a>

      {/* Card do Livro */}
      <div
        className="flex flex-col md:flex-row gap-10 p-8 rounded-xl shadow-lg"
        style={{
          backgroundColor: 'var(--form-background)',
          color: 'var(--text-primary)',
        }}
      >
        {/* Capa */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={book.cover || book.imageUrl}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          />
        </div>

        {/* Informações */}
        <div className="flex-grow">
          <h1 className="text-4xl font-extrabold mb-2">{book.title}</h1>
          <p className="text-lg font-medium mb-4">por {book.author}</p>

          <div className="text-sm mb-4">
            {book.genre && (
              <p>
                <strong>Gênero:</strong> {book.genre}
              </p>
            )}
            {book.year && (
              <p>
                <strong>Ano:</strong> {book.year}
              </p>
            )}
            {book.pages && (
              <p>
                <strong>Páginas:</strong> {book.pages}
              </p>
            )}
            {book.rating && (
              <p>
                <strong>Avaliação:</strong> {book.rating} / 5
              </p>
            )}
          </div>

          {book.synopsis && (
            <div className="text-base leading-relaxed mt-4">
              <h2 className="text-lg font-semibold mb-2">Sinopse</h2>
              <p>{book.synopsis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
