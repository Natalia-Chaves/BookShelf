export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  rating: number; // Ex: 4.5
  excerpt: string;
  status: 'Lido' | 'Lendo' | 'Quero Ler';
}


export const allBooks: Book[] = [
  {
    id: 1,
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin (Uncle Bob)',
    year: 2008,
    genre: 'Desenvolvimento de Software',
    rating: 5.0,
    excerpt: 'Um clássico que ensina a diferença entre um bom código e um código ruim, focado em princípios, padrões e práticas ágeis.',
    status: 'Lido',
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
  },
];