'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { books as initialBooks } from '@/lib/books';
import type { Book } from '@/types';

// Helper para criar o slug a partir do título
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function BookDetailPage() {
  const params = useParams();
  const { slug } = params;

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    // Carrega livros do localStorage ou do arquivo estático
    const storedBooks = typeof window !== 'undefined'
      ? localStorage.getItem('myBooks')
      : null;

    const parsedBooks: Book[] = storedBooks
      ? JSON.parse(storedBooks)
      : initialBooks.map((book, index) => ({ ...book, id: index + 1 }));

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
      {/* Link de Retorno para /catalogo */}
      <a
        href="/catalogo"
        className="flex items-center text-sm font-medium mb-8 hover:underline"
        style={{ color: 'var(--divider-color)' }}
      >
        &larr; Voltar para o Catálogo
      </a>

      <div
        className="flex flex-col md:flex-row gap-10 p-8 rounded-xl shadow-lg"
        style={{
          backgroundColor: 'var(--form-background)',
          color: 'var(--text-primary)',
        }}
      >
        {/* Imagem */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={book.imageUrl}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          />
        </div>

        {/* Detalhes e Sinopse */}
        <div className="flex-grow">
          <h1
            className="text-4xl font-extrabold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {book.title}
          </h1>
          <p className="text-lg mb-4">{book.author}</p>
          <p className="text-base">{book.description}</p>
        </div>
      </div>
    </div>
  );
}
