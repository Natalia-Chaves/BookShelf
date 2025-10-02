'use client';

import { Pencil, Trash2 } from "lucide-react";
import StarRating from './StarRating';
import type { Book } from '@/types';
import Link from 'next/link';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onRate: (book: Book, rating: number) => void;
}

export default function BookCard({ book, onEdit, onDelete, onRate }: BookCardProps) {
  const { title, author, cover, imageUrl, rating = 0 } = book;
  const coverSrc = cover || imageUrl || '/images/default-cover.jpg';

  return (
    <div className="bg-[#EFEAE4] rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 flex flex-col h-full min-w-[160px]">
      <Link href={`/livro/${book.id}`} className="flex flex-col h-full cursor-pointer">
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

      <div className="p-4 pt-0 flex justify-center">
        <StarRating rating={rating} onRate={(newRating) => onRate(book, newRating)} />
      </div>

      <div className="flex justify-around px-2 py-4">
        <button
          type="button"
          onClick={() => onEdit(book)}
          className="flex items-center text-yellow-700 hover:text-yellow-900 px-2 py-1 rounded hover:bg-yellow-100 sm:gap-2 sm:px-2"
          aria-label={`Editar ${title}`}
        >
          <Pencil size={20} />
          <span className="hidden md:inline">Editar</span>
        </button>

        <button
          type="button"
          onClick={() => onDelete(book)}
          className="flex items-center text-red-700 hover:text-red-900 px-2 py-1 rounded hover:bg-red-100 sm:gap-2 sm:px-2"
          aria-label={`Excluir ${title}`}
        >
          <Trash2 size={20} />
          <span className="hidden md:inline">Excluir</span>
        </button>
      </div>
    </div>
  );
}
