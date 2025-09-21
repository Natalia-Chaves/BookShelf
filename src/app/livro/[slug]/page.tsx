import { notFound } from 'next/navigation';
import { books } from '@/lib/books'; 
import type { Book } from '@/types'; 


interface BookDetailPageProps {
    params: {
        slug: string; 
    }
}

const typedBooks: Book[] = books as Book[]; 


// Helper para converter o título em slug (IGUAL ao do BookCard)
const createSlug = (title: string): string => {
    return title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
};

export default function BookDetailPage({ params }: BookDetailPageProps) {
    // 1. A busca de dados ocorre no servidor, antes da renderização
    // A tipagem 'Book' garante que o TypeScript saiba a estrutura.
    const book = typedBooks.find((b) => createSlug(b.title) === params.slug);

    // 2. Se o livro não for encontrado, usa o 404 do Next.js
    if (!book) {
        notFound();
    }

    // 3. Renderiza os detalhes (Componente de Servidor)
    // Usamos o '!' (non-null assertion) nos acessos ao 'book' após a verificação 'if (!book)'
    return (
        <div className="container mx-auto px-4 py-12 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            
            {/* Botão de Voltar */}
            <a href="/biblioteca" className="flex items-center text-sm font-medium mb-8 text-blue-600 hover:underline">
                &larr; Voltar para a Biblioteca
            </a>

            <div className="flex flex-col md:flex-row gap-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                
                {/* Imagem */}
                <div className="flex-shrink-0 w-full md:w-1/3">
                    <img 
                        src={book!.imageUrl} 
                        alt={`Capa do livro ${book!.title}`} 
                        className="w-full h-auto object-cover rounded-lg shadow-2xl" 
                    />
                </div>

                {/* Detalhes e Sinopse */}
                <div className="flex-grow">
                    <h1 className="text-4xl font-extrabold mb-3 text-red-600 dark:text-red-400">
                        {book!.title}
                    </h1>
                    <p className="text-xl italic mb-6 text-gray-600 dark:text-gray-400">
                        Por: {book!.author}
                    </p>

                    <h2 className="text-2xl font-bold mb-3 mt-8">Sinopse</h2>
                    <p className="text-lg leading-relaxed mb-6">
                        {book!.description || "Ainda não há uma sinopse detalhada para este livro."}
                    </p>

                    <h3 className="text-lg font-semibold mb-2">Informações Adicionais</h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            Ano: {book!.year || 'N/A'}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                            Gênero: {book!.genres?.join(', ') || 'Não Classificado'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}