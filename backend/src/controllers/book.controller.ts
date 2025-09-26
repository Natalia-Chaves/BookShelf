import { Request, Response } from 'express';
import { Book } from '../models/book.model';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../data/books.json');

const readBooks = (): Book[] => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

const writeBooks = (books: Book[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));
};

export const getAllBooks = (req: Request, res: Response) => {
  const books = readBooks();
  res.json(books);
};

export const getBookById = (req: Request, res: Response) => {
  const books = readBooks();
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
  res.json(book);
};

export const createBook = (req: Request, res: Response) => {
  const books = readBooks();
  const newBook: Book = {
    ...req.body,
    id: Date.now().toString(),
  };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response) => {
  const books = readBooks();
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Livro não encontrado' });

  books[index] = { ...books[index], ...req.body };
  writeBooks(books);
  res.json(books[index]);
};

export const deleteBook = (req: Request, res: Response) => {
  const books = readBooks();
  const updated = books.filter(b => b.id !== req.params.id);
  writeBooks(updated);
  res.status(204).end();
};
