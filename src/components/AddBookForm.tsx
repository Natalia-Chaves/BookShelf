'use client';

import { useState, useEffect } from 'react';
import type { Book } from '@/types';
import { supabase } from '@/lib/supabaseClient';

interface AddBookFormProps {
  bookToEdit?: Book | null;
  onSave: () => void;
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

    const newBook: Omit<Book, 'id' | 'rating' | 'pagesRead' | 'imageUrl'> = {
      title: title.trim(),
      author: author.trim(),
      cover: cover.trim() || undefined,
      genre: genre.trim() || undefined,
      year: typeof year === 'number' ? year : undefined,
      pages: typeof pages === 'number' ? pages : undefined,
      synopsis: synopsis.trim() || '',
      status: bookToEdit ? bookToEdit.status : 'quero ler',
    };

    let result;
    if (bookToEdit) {
      result = await supabase
        .from('books')
        .update(newBook)
        .eq('id', bookToEdit.id)
        .select();
    } else {
      result = await supabase
        .from('books')
        .insert([newBook])
        .select();
    }

    if (result.error) {
      console.error('Erro ao salvar:', result.error.message);
      setError('Erro ao salvar o livro. Verifique os dados e tente novamente.');
      setLoading(false);
      return;
    }

    setLoading(false);
    onSave();
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
          onChange={e =>
            setYear(e.target.value === '' ? '' : Number(e.target.value))
          }
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          min={0}
          max={new Date().getFullYear()}
        />

        <input
          type="number"
          placeholder="Número de páginas"
          value={pages}
          onChange={e =>
            setPages(e.target.value === '' ? '' : Number(e.target.value))
          }
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

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {loading && (
          <p className="text-sm text-center text-[var(--primary)]">Salvando...</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-[var(--divider-color)] text-[var(--foreground)] hover:brightness-110 transition"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:brightness-90 text-white font-semibold transition"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
