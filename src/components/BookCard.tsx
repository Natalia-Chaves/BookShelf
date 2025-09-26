/* eslint-disable @next/next/no-img-element */
'use client';

import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import StarRating from './StarRating';
import type { Book } from '@/types';
import Link from 'next/link';

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onRate: (book: Book, rating: number) => void;
}

export default function BookCard({ book, onEdit, onDelete, onRate }: BookCardProps) {
  const { title, author, cover, imageUrl, rating = 0 } = book;
  const bookSlug = createSlug(title);

  const handleRate = (newRating: number) => {
    onRate(book, newRating);
  };

  const coverSrc = cover || imageUrl || '/images/default-cover.jpg';

  return (
    <div className="bg-[#EFEAE4] rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 flex flex-col h-full">

      {/* Link para detalhes do livro */}
      <Link href={`/livro/${bookSlug}`} className="flex flex-col h-full cursor-pointer">
        <div className="relative w-full aspect-[2/3] p-4 flex items-center justify-center bg-gray-200">
          <img
            src={coverSrc}
            alt={`Capa do livro ${title}`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-4 flex flex-col items-center text-center flex-grow justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#6F4E37] mb-2">{title}</h3>
            <p className="text-[#8B4513] italic mb-4">{author}</p>
          </div>
        </div>
      </Link>

      {/* Avaliação com estrelas */}
      <div className="p-4 pt-0 flex justify-center">
        <StarRating rating={rating} onRate={handleRate} />
      </div>

      {/* Botões Editar e Excluir - fora do Link para clique funcionar */}
      <div className="flex justify-between px-6 pb-4">
        <button
          type="button"
          onClick={() => onEdit(book)}
          className="flex items-center gap-2 text-yellow-700 hover:text-yellow-900"
          aria-label={`Editar ${title}`}
        >
          <Pencil size={20} />
          Editar
        </button>

        <button
          type="button"
          onClick={() => onDelete(book)}
          className="flex items-center gap-2 text-red-700 hover:text-red-900"
          aria-label={`Excluir ${title}`}
        >
          <Trash2 size={20} />
          Excluir
        </button>
      </div>

    </div>
  );
}
