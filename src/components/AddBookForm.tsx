'use client';

import { useState, useEffect } from 'react';
import type { Book } from '@/types';

interface AddBookFormProps {
  bookToEdit?: Book | null;
  onSave: (book: Book) => void;
  onCancel: () => void;
}

export default function AddBookForm({ bookToEdit = null, onSave, onCancel }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setImageUrl(bookToEdit.imageUrl);
    }
  }, [bookToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const book: Book = {
      id: bookToEdit?.id || Date.now(),
      title,
      author,
      imageUrl,
      genres: bookToEdit?.genres || [],
      year: bookToEdit?.year || new Date().getFullYear(),
    };
    onSave(book);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--form-background)] text-[var(--foreground)] p-6 rounded-lg shadow-xl w-80 max-w-full"
      >
        <h2 className="text-2xl font-semibold mb-5 text-center">
          {bookToEdit ? 'Editar Livro' : 'Adicionar Livro'}
        </h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          required
        />

        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          required
        />

        <input
          type="text"
          placeholder="URL da imagem"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className="w-full mb-6 px-3 py-2 rounded-lg bg-[var(--input-background)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          required
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
