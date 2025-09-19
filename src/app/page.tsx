import BookCard from "@/components/BookCard";
import { books } from "@/lib/books"; // Importando o array de livros

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-12">
        Sua Biblioteca de Livros
      </h2>
      
      {/* Container de Grid para os cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book, index) => (
          <BookCard 
            key={index} 
            title={book.title} 
            author={book.author} 
            imageUrl={book.imageUrl} 
          />
        ))}
      </div>
    </main>
  );
}