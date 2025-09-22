'use client';

import React, { useState, useEffect } from "react";
import type { Book } from '@/types';

interface EditBookFormProps {
  book: Book;
  onSave: (book: Book) => void;
  onCancel: () => void;
}

export default function EditBookForm({ book, onSave, onCancel }: EditBookFormProps) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [cover, setCover] = useState(book.cover || '');
  const [genre, setGenre] = useState(book.genre || '');
  const [year, setYear] = useState<number | ''>(book.year ?? '');
  const [pages, setPages] = useState<number | ''>(book.pages ?? '');
  const [synopsis, setSynopsis] = useState(book.synopsis || '');

  useEffect(() => {
    setTitle(book.title || '');
    setAuthor(book.author || '');
    setCover(book.cover || '');
    setGenre(book.genre || '');
    setYear(book.year ?? '');
    setPages(book.pages ?? '');
    setSynopsis(book.synopsis || '');
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      alert('Título e autor são obrigatórios.');
      return;
    }

    const updatedBook: Book = {
      ...book,
      title: title.trim(),
      author: author.trim(),
      cover: cover.trim(),
      genre: genre.trim() || undefined,
      year: typeof year === 'number' ? year : undefined,
      pages: typeof pages === 'number' ? pages : undefined,
      synopsis: synopsis.trim() || '',
    };

    onSave(updatedBook);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--form-background)] text-[var(--foreground)] p-6 rounded-lg shadow-xl w-96 max-w-full space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Editar Livro</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          required
        />

        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          required
        />

        <input
          type="text"
          placeholder="URL da capa (imagem)"
          value={cover}
          onChange={e => setCover(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <input
          type="text"
          placeholder="Gênero"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <input
          type="number"
          placeholder="Ano"
          value={year}
          onChange={e => setYear(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          min={0}
          max={new Date().getFullYear()}
        />

        <input
          type="number"
          placeholder="Número de páginas"
          value={pages}
          onChange={e => setPages(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          min={1}
        />

        <textarea
          placeholder="Sinopse"
          value={synopsis}
          onChange={e => setSynopsis(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:brightness-90 text-white font-semibold transition"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
