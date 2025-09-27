import BookListClient from "./BookListClient";
import type { Book } from "@/types";
import { supabase } from "@/lib/supabaseClient";

async function fetchBooks(): Promise<Book[]> {
  const { data, error } = await supabase.from("books").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("Erro ao buscar livros:", error.message);
    return [];
  }
  return data || [];
}

export default async function BookList() {
  const books = await fetchBooks();
  return <BookListClient initialBooks={books} />;
}
