'use client';

import React, { useState } from 'react';
import BookCard from './BookCard';
import type { Book } from '@/types';

const initialBooks: Book[] = [
    {
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        cover: '/images/dom-casmurro.jpg',
        rating: 3
    },
    {
        title: 'O Pequeno Príncipe',
        author: 'Antoine de Saint-Exupéry',
        cover: '/images/o-pequeno-principe.jpg',
        rating: 4
    },
    // mais livros...
];

export default function BookList() {
    const [books, setBooks] = useState<Book[]>(initialBooks);

    const handleEdit = (book: Book) => {
        console.log('Editar:', book.title);
        // lógica para editar...
    };

    const handleDelete = (book: Book) => {
        setBooks(prev => prev.filter(b => b.title !== book.title));
    };

    const handleRate = (book: Book, rating: number) => {
        setBooks(prev =>
            prev.map(b =>
                b.title === book.title ? { ...b, rating } : b
            )
        );
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map(book => (
                <BookCard
                    key={book.title}
                    book={book}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRate={handleRate}
                />
            ))}
        </div>
    );
}
