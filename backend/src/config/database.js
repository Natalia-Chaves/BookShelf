import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(process.cwd(), 'data');
const BOOKS_FILE = path.join(DATA_DIR, 'books.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Garantir que o diretório de dados existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Dados iniciais
const initialBooks = [
  {
    id: "1",
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    year: 1954,
    pages: 1216,
    pagesRead: 300,
    status: "lendo",
    rating: 5,
    synopsis: "Uma jornada épica pela Terra Média para destruir o Um Anel.",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
    user_id: "demo-user",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Ficção Científica",
    year: 1949,
    pages: 328,
    pagesRead: 328,
    status: "finalizado",
    rating: 5,
    synopsis: "Em um regime totalitário, um homem luta contra a vigilância e o controle absoluto.",
    cover: "https://m.media-amazon.com/images/I/61t0bwt1s3L._UF1000,1000_QL80_.jpg",
    user_id: "demo-user",
    created_at: new Date().toISOString(),
  }
];

const initialUsers = [
  {
    id: "demo-user",
    email: "demo@bookshelf.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    full_name: "Usuário Demo",
    created_at: new Date().toISOString(),
  }
];

class LocalDatabase {
  constructor() {
    this.initializeFiles();
  }

  initializeFiles() {
    if (!fs.existsSync(BOOKS_FILE)) {
      this.saveBooks(initialBooks);
    }
    if (!fs.existsSync(USERS_FILE)) {
      this.saveUsers(initialUsers);
    }
  }

  // Books methods
  getBooks() {
    try {
      const data = fs.readFileSync(BOOKS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveBooks(books) {
    fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));
  }

  getBookById(id) {
    const books = this.getBooks();
    return books.find(book => book.id === id);
  }

  getUserBooks(userId) {
    const books = this.getBooks();
    return books.filter(book => book.user_id === userId);
  }

  createBook(bookData) {
    const books = this.getBooks();
    const newBook = {
      ...bookData,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    books.push(newBook);
    this.saveBooks(books);
    return newBook;
  }

  updateBook(id, updateData) {
    const books = this.getBooks();
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return null;
    
    books[index] = {
      ...books[index],
      ...updateData,
      updated_at: new Date().toISOString(),
    };
    this.saveBooks(books);
    return books[index];
  }

  deleteBook(id) {
    const books = this.getBooks();
    const filteredBooks = books.filter(book => book.id !== id);
    this.saveBooks(filteredBooks);
    return filteredBooks.length < books.length;
  }

  // Users methods
  getUsers() {
    try {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  }

  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(user => user.email === email);
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  createUser(userData) {
    const users = this.getUsers();
    const newUser = {
      ...userData,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }
}

export default new LocalDatabase();