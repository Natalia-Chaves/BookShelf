import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getUserBooks,
} from '../controllers/booksController.js';
import { optionalAuth, verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/books - Get all books (public)
router.get('/', getAllBooks);

// GET /api/books/:id - Get book by ID (public)
router.get('/:id', getBookById);

// POST /api/books - Create new book (optional auth for demo)
router.post('/', optionalAuth, createBook);

// PUT /api/books/:id - Update book (optional auth for demo)
router.put('/:id', optionalAuth, updateBook);

// DELETE /api/books/:id - Delete book (optional auth for demo)
router.delete('/:id', optionalAuth, deleteBook);

// GET /api/books/user/:userId - Get books by user (public)
router.get('/user/:userId', getUserBooks);

export default router;