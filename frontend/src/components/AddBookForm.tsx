'use client';

import { useState, useEffect } from 'react';
import type { Book } from '@/types';
import { supabase } from '../lib/supabaseClient';

interface AddBookFormProps {
  bookToEdit?: Book | null;
  onSave: (savedBook: Book) => void;
  onCancel: () => void;
}

export default function AddBookForm({
  bookToEdit = null,
  onSave,
  onCancel,
}: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [pages, setPages] = useState<number | ''>('');
  const [synopsis, setSynopsis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || '');
      setAuthor(bookToEdit.author || '');
      setCover(bookToEdit.cover || '');
      setGenre(bookToEdit.genre || '');
      setYear(bookToEdit.year ?? '');
      setPages(bookToEdit.pages ?? '');
      setSynopsis(bookToEdit.synopsis || '');
    }
  }, [bookToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      alert('Título e autor são obrigatórios.');
      return;
    }

    setLoading(true);
    setError('');

    const parsedYear = typeof year === 'number' ? year : parseInt(year, 10);
    const parsedPages = typeof pages === 'number' ? pages : parseInt(pages, 10);

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      cover: cover.trim() || null,
      genre: genre.trim() || null,
      year: isNaN(parsedYear) ? null : parsedYear,
      pages: isNaN(parsedPages) ? null : parsedPages,
      synopsis: synopsis.trim() || null,
      status: bookToEdit?.status || 'Quero ler',
    };

    try {
      let result;

      if (bookToEdit) {
        result = await supabase
          .from('books')
          .update(bookData)
          .eq('id', bookToEdit.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('books')
          .insert([bookData])
          .select()
          .single();
      }

      if (result.error) {
        console.error('Erro ao salvar:', result.error.message);
        setError('Erro ao salvar o livro. Verifique os dados e tente novamente.');
        setLoading(false);
        return;
      }

      onSave(result.data);
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      setError('Erro inesperado ao salvar o livro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--form-background)] text-[var(--foreground)] p-6 rounded-lg shadow-xl w-96 max-w-full space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          {bookToEdit ? 'Editar Livro' : 'Adicionar Livro'}
        </h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <input
          type="text"
          placeholder="URL da capa (imagem)"
          value={cover}
          onChange={e => setCover(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)]"
        />

        <input
          type="text"
          placeholder="Gênero"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)]"
        />

        <input
          type="number"
          placeholder="Ano"
          value={year}
          onChange={e => setYear(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)]"
          min={0}
          max={new Date().getFullYear()}
        />

        <input
          type="number"
          placeholder="Número de páginas"
          value={pages}
          onChange={e => setPages(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)]"
          min={1}
        />

        <textarea
          placeholder="Sinopse"
          value={synopsis}
          onChange={e => setSynopsis(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] resize-none"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {loading && <p className="text-sm text-center text-[var(--primary)]">Salvando...</p>}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:brightness-90 transition"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
