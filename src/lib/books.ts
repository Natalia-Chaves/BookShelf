// Define o tipo de dado para um livro
export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  rating: number;
  excerpt: string;
  status: 'Lendo' | 'Lido' | 'Na fila';
  imageUrl: string;
}

// Array de livros para a sua biblioteca
export const books: Book[] = [
  {
    id: 1,
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    year: 1954,
    genre: "Fantasia",
    rating: 4.9,
    excerpt: "Um dos maiores clássicos da literatura de fantasia, segue a jornada de Frodo Bolseiro para destruir o Um Anel e derrotar o Senhor do Escuro, Sauron.",
    status: 'Lido',
    imageUrl: "/images/senhor-dos-aneis.jpg"
  },
  {
    id: 2,
    title: 'A Startup Enxuta (The Lean Startup)',
    author: 'Eric Ries',
    year: 2011,
    genre: 'Negócios / Inovação',
    rating: 4.5,
    excerpt: 'Oferece uma abordagem científica para a criação e gestão de startups, ensinando como inovar continuamente e construir negócios sustentáveis.',
    status: 'Lendo',
    imageUrl: "/images/startup-enxuta.jpg"
  },
  {
    id: 3,
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    year: 1945,
    genre: "Fábula / Sátira Política",
    rating: 4.7,
    excerpt: "Uma fábula satírica sobre um grupo de animais de fazenda que se rebelam contra seus donos humanos para criar uma sociedade de igualdade, apenas para descobrir que o poder corrompe.",
    status: 'Lido',
    imageUrl: "/images/revolucao-bichos.jpg"
  },
  {
    id: 4,
    title: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    year: 1967,
    genre: "Realismo Mágico",
    rating: 4.8,
    excerpt: "Narra a história da família Buendía na cidade fictícia de Macondo, misturando realidade e fantasia de forma inesquecível.",
    status: 'Lendo',
    imageUrl: "/images/cem-anos.jpg"
  },
  // Adicione mais livros aqui, seguindo o mesmo formato
];