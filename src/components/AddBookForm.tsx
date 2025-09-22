'use client';
import React, { useState, useEffect } from 'react';
import type { Book } from '@/types';

interface AddBookFormProps {
  bookToEdit?: Book | null;
  onSave: (book: Book) => void;
  onCancel: () => void;
}

export default function AddBookForm({ bookToEdit = null, onSave, onCancel }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  // outros campos opcionais ...
  const [synopsis, setSynopsis] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setSynopsis(bookToEdit.synopsis || '');
      // set cover, genre, etc, se quiser
    }
  }, [bookToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: bookToEdit?.id ?? Date.now().toString(),
      title: title.trim(),
      author: author.trim(),
      synopsis: synopsis.trim(),
      cover: bookToEdit?.cover ?? "",
      rating: bookToEdit?.rating ?? 0
      // outros campos...
    };
    onSave(newBook);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg space-y-4">
        <h2>{bookToEdit ? 'Editar Livro' : 'Adicionar Livro'}</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder="Sinopse"
          value={synopsis}
          onChange={e => setSynopsis(e.target.value)}
        />
        <div className="flex gap-2">
          <button type="button" onClick={onCancel}>Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
}
