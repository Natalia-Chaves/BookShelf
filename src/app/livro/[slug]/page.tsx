import { notFound } from 'next/navigation';
import { books } from '@/lib/books';
import type { Book } from '@/types';

interface BookDetailPageProps {
  params: {
    slug: string;
  }
}

const typedBooks: Book[] = books as Book[];

// Helper para converter o título em slug (IGUAL ao do BookCard)
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function BookDetailPage({ params }: BookDetailPageProps) {
  // 1. A busca de dados ocorre no servidor, antes da renderização
  const book = typedBooks.find((b) => createSlug(b.title) === params.slug);

  // 2. Se o livro não for encontrado, usa o 404 do Next.js
  if (!book) {
    notFound();
  }

  // 3. Renderiza os detalhes (Componente de Servidor)
  return (
    <div
      className="container mx-auto px-4 py-12 min-h-screen"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)'
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
          color: 'var(--text-primary)'
        }}
      >
        {/* Imagem */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={book!.imageUrl}
            alt={`Capa do livro ${book!.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          />
        </div>

        {/* Detalhes e Sinopse */}
        <div className="flex-grow">
          <h1
            className="text-4xl font-extrabold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {book!.title}
          </h1>
          <p className="text-lg mb-4">{book!.author}</p>
          <p className="text-base">{book!.description}</p>
        </div>
      </div>
    </div>
  );
}
