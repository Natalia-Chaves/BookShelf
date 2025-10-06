'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { Book } from '@/types';

export default function BookDetailPage() {
  const { id } = useParams() as { id: string };
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar livro:", error.message);
        setBook(null);
      } else {
        setBook(data as Book);
      }

      setLoading(false);
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  // --- COMPONENTES DE LOADING E NÃO ENCONTRADO (Ajustando a cor do texto) ---

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12" style={{ color: 'var(--text-primary)' }}>
        <p>Carregando livro...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-12 text-center" style={{ color: 'var(--text-primary)' }}>
        <p className="text-xl font-semibold">Livro não encontrado.</p>
        <a href="/catalogo" className="inline-block mt-6 text-sm hover:underline" style={{ color: 'var(--color-accent)' }}>
          &larr; Voltar para o Catálogo
        </a>
      </div>
    );
  }

  // --- VISUALIZAÇÃO PRINCIPAL ---
  return (
    <div className="container mx-auto px-4 py-12">
      <a 
        href="/catalogo" 
        className="text-sm hover:underline mb-4 inline-block" 
        style={{ color: 'var(--text-primary)', opacity: 0.8 }} // Usando text-primary e ajustando opacidade
      >
        &larr; Voltar para o Catálogo
      </a>

      {/* CARTÃO DE DETALHES DO LIVRO: Aplicando as variáveis de tema e sombra */}
      <div 
        className="flex flex-col md:flex-row gap-10 p-6 rounded-xl" 
        style={{
          // Fundo do cartão: Usa a mesma cor de superfície do Hero/Cards
          backgroundColor: 'var(--color-surface-hero)', 
          // Cor do texto: Usa a cor principal de texto
          color: 'var(--text-primary)',
          // Aplica a sombra uniforme e adaptável ao tema
          boxShadow: '0 0 20px 0 var(--color-shadow-hero)',
        }}
      >
        <div className="md:w-1/3">
          <img
            src={book.cover || book.imageurl || "/placeholder.jpg"}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-auto rounded shadow-md"
          />
        </div>

        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg mb-4 opacity-80">por {book.author}</p>

          <div className="text-sm mb-4 space-y-1">
            {book.genre && <p><strong>Gênero:</strong> {book.genre}</p>}
            {book.year && <p><strong>Ano:</strong> {book.year}</p>}
            {book.pages && <p><strong>Páginas:</strong> {book.pages}</p>}
            <p><strong>Avaliação:</strong> {book.rating ?? 0} / 5</p>
          </div>

          {book.synopsis && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
              <p>{book.synopsis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}