'use client';

import React from 'react';
import type { Book } from '@/types';
import StatusSelector from './StatusSelector';

interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
  onRate?: (book: Book, rating: number) => void;
  onStatusUpdate: () => void;
}

export default function BookCard({ 
  book, 
  onEdit, 
  onDelete, 
  onRate, 
  onStatusUpdate 
}: BookCardProps) {
  return (
    <div className="card-container">
      <img
        src={book.cover || '/placeholder.jpg'}
        alt={`Capa do livro ${book.title}`}
        className="book-cover"
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      
      {/* Adiciona o seletor de status */}
      <StatusSelector book={book} onStatusUpdate={onStatusUpdate} />
    </div>
  );
}