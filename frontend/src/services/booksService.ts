import api from '../lib/api';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  pagesRead: number;
  status: 'quero ler' | 'lendo' | 'finalizado';
  rating: number;
  synopsis: string;
  cover?: string;
  imageUrl?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const booksService = {
  // Buscar todos os livros
  async getAllBooks(): Promise<Book[]> {
    try {
      const response = await api.get('/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Buscar livro por ID
  async getBookById(id: string): Promise<Book> {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
  },

  // Criar novo livro
  async createBook(book: Omit<Book, 'id' | 'created_at' | 'updated_at'>): Promise<Book> {
    try {
      const response = await api.post('/books', book);
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },

  // Atualizar livro
  async updateBook(id: string, book: Partial<Book>): Promise<Book> {
    try {
      const response = await api.put(`/books/${id}`, book);
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },

  // Deletar livro
  async deleteBook(id: string): Promise<void> {
    try {
      await api.delete(`/books/${id}`);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  },

  // Buscar livros por usuário
  async getUserBooks(userId: string): Promise<Book[]> {
    try {
      const response = await api.get(`/books/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user books:', error);
      throw error;
    }
  },
};