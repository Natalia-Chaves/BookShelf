'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { Book } from '@/types';

export default function BookDetailPage() {
  const { slug } = useParams() as { slug: string };
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", slug) // 🔧 alterado de ilike("slug", slug)
        .single();

      if (!error && data) setBook(data as Book);
      setLoading(false);
    };
    fetchBook();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Carregando livro...</p>
      </div>
    );
  }

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
        {/* Capa */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={book.cover || book.imageUrl}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Detalhes */}
        <div className="flex-grow">
          <h1 className="text-4xl font-extrabold mb-2">{book.title}</h1>
          <p className="text-lg font-medium mb-4">por {book.author}</p>

          <div className="text-sm mb-4 space-y-1">
            {book.genre && <p><strong>Gênero:</strong> {book.genre}</p>}
            {book.year && <p><strong>Ano:</strong> {book.year}</p>}
            {book.pages && <p><strong>Páginas:</strong> {book.pages}</p>}
            <p><strong>Avaliação:</strong> {book.rating ?? 0} / 5</p>
          </div>

          {book.synopsis && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Sinopse</h2>
              <p>{book.synopsis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
