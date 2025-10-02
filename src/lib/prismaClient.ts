import { prisma } from '@/lib/prismaClient'; // Assumindo que você tenha esse arquivo

export async function fetchBooks(): Promise<Book[]> {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return books;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return [];
  }
}
