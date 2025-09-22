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
      genres: bookToEdit?.genres,
      year: bookToEdit?.year,
    };
    onSave(book);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-80">
        <h2 className="text-xl font-bold mb-4">{bookToEdit ? 'Editar Livro' : 'Adicionar Livro'}</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="URL da imagem"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded">
            Cancelar
          </button>
          <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
