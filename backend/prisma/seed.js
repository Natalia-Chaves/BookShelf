import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário demo
  const hashedPassword = await bcrypt.hash('password', 10);
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@bookshelf.com' },
    update: {},
    create: {
      email: 'demo@bookshelf.com',
      password: hashedPassword,
      fullName: 'Usuário Demo',
    },
  });

  // Criar livros de exemplo
  const books = [
    {
      title: "O Senhor dos Anéis",
      author: "J.R.R. Tolkien",
      genre: "Fantasia",
      year: 1954,
      pages: 1216,
      pagesRead: 300,
      status: "READING",
      rating: 5,
      synopsis: "Uma jornada épica pela Terra Média para destruir o Um Anel.",
      cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
      userId: demoUser.id,
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Ficção Científica",
      year: 1949,
      pages: 328,
      pagesRead: 328,
      status: "FINISHED",
      rating: 5,
      synopsis: "Em um regime totalitário, um homem luta contra a vigilância e o controle absoluto.",
      cover: "https://m.media-amazon.com/images/I/61t0bwt1s3L._UF1000,1000_QL80_.jpg",
      userId: demoUser.id,
    },
    {
      title: "Duna",
      author: "Frank Herbert",
      genre: "Ficção Científica",
      year: 1965,
      pages: 688,
      pagesRead: 100,
      status: "READING",
      rating: 5,
      synopsis: "A luta pelo controle de um planeta desértico rico em especiarias.",
      cover: "https://m.media-amazon.com/images/I/81zN7udGRUL.jpg",
      userId: demoUser.id,
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { 
        title_userId: {
          title: book.title,
          userId: book.userId
        }
      },
      update: {},
      create: book,
    });
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });