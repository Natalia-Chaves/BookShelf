// app/components/BookList.tsx
import BookListClient from "./BookListClient";
import type { Book } from "@/types";

// Simulação de busca de livros (substitua por fetch de banco de dados ou API)
async function fetchBooks(): Promise<Book[]> {
  return [
    {
      id: "1",
      title: "O Senhor dos Anéis",
      author: "J.R.R. Tolkien",
      imageUrl: "/images/senhor-dos-aneis.jpg",
      cover: "/images/senhor-dos-aneis.jpg",
      genre: "Fantasia",
      year: 1954,
      pages: 1178,
      rating: 5,
      synopsis: "Uma jornada épica pela Terra Média para destruir o Um Anel.",
      status: "lendo",
      pagesRead: 200,
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      imageUrl: "/images/1984.jpg",
      cover: "/images/1984.jpg",
      genre: "Distopia",
      year: 1949,
      pages: 328,
      rating: 4,
      synopsis: "Um regime totalitário controla tudo e todos.",
      status: "quero ler",
    },
  ];
}

export default async function BookList() {
  const books = await fetchBooks();
  return <BookListClient initialBooks={books} />;
}
