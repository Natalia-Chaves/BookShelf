/* eslint-disable @next/next/no-img-element */
'use client';

import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from 'next/link'; 
import type { Book } from '@/types';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

const createSlug = (title: string): string => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
        .replace(/[\s_-]+/g, '-') // Substitui espaços e hífens por um único hífen
        .replace(/^-+|-+$/g, ''); // Remove hífens do início/fim
};

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
    const { title, author, imageUrl } = book;
    

    const bookSlug = createSlug(title); 

    return (
    
        <Link 
            href={`/livro/${bookSlug}`} 
            className="bg-[#EFEAE4] rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 flex flex-col h-full cursor-pointer"
        > 
            <div className="relative w-full h-80 p-4 flex items-center justify-center bg-gray-200"> 
                <img
                    src={imageUrl}
                    alt={`Capa do livro ${title}`}
                    className="max-w-full max-h-full object-contain" 
                />
            </div>
            
            <div className="p-4 flex flex-col items-center text-center flex-grow justify-between">
                
                <div>
                    <h3 className="text-xl font-semibold text-[#6F4E37] mb-2">
                        {title}
                    </h3>
                    <p className="text-[#8B4513] italic mb-4">{author}</p>
                </div>
                
                {/* Botões de Ação (Mantidos fora do Link principal, pois têm funcionalidades separadas) */}
                <div className="flex gap-2 mt-auto"> 
                    {/* Estes botões devem usar e.stopPropagation() se a funcionalidade de edição/exclusão estiver funcionando */}
                    <button
                        onClick={(e) => { e.preventDefault(); /* Adicione a lógica de visualização se necessário */ console.log(`Visualizar livro: ${book.title}`); }}
                        className="p-1.5 rounded-full bg-[#A0522D] text-white hover:bg-[#8B4513] transition-colors"
                        aria-label="Visualizar livro"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); onEdit(book); }}
                        className="p-1.5 rounded-full bg-[#A0522D] text-white hover:bg-[#8B4513] transition-colors"
                        aria-label="Editar livro"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); onDelete(book); }}
                        className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                        aria-label="Excluir livro"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </Link>
    );
}