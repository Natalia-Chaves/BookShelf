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
  const { title, author, imageUrl, rating } = book;
  const bookSlug = createSlug(title);

  const handleRate = (newRating: number) => {
    onRate(book, newRating);
  };

  return (
    <div className="bg-[#EFEAE4] rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 flex flex-col h-full">

      <Link href={`/livro/${bookSlug}`} className="flex flex-col h-full">
        <div className="relative w-full h-80 p-4 flex items-center justify-center bg-gray-200">
          <img
            src={imageUrl}
            alt={`Capa do livro ${title}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="p-4 flex flex-col items-center text-center flex-grow justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#6F4E37] mb-2">{title}</h3>
            <p className="text-[#8B4513] italic mb-4">{author}</p>
          </div>
        </div>
      </Link>

      {/* Avaliação fora do Link para evitar clique no Link */}
      <div className="p-4 pt-0 flex justify-center">
        <StarRating rating={rating} onRate={handleRate} />
      </div>

      <div className="flex gap-2 p-4 pt-0">
        <button
          onClick={(e) => { e.preventDefault(); onEdit(book); }}
          className="flex-1 bg-[#A0522D] text-white py-1 rounded flex items-center justify-center gap-1 hover:bg-[#8B4513] transition-colors"
          aria-label="Editar livro"
          title="Editar"
        >
          <Pencil size={16} /> <span className="hidden sm:inline">Editar</span>
        </button>
        <button
          onClick={(e) => { e.preventDefault(); onDelete(book); }}
          className="flex-1 bg-red-600 text-white py-1 rounded flex items-center justify-center gap-1 hover:bg-red-700 transition-colors"
          aria-label="Excluir livro"
          title="Excluir"
        >
          <Trash2 size={16} /> <span className="hidden sm:inline">Excluir</span>
        </button>
      </div>
    </div>
  );
}
