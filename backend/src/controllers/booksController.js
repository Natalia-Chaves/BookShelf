import { prisma } from '../config/prisma.js';

export const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true
          }
        }
      }
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBook = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Mapear status do frontend para o enum do Prisma
    let status = 'WANT_TO_READ';
    if (req.body.status === 'lendo') status = 'READING';
    else if (req.body.status === 'finalizado') status = 'FINISHED';
    else if (req.body.status === 'quero ler') status = 'WANT_TO_READ';

    const newBook = await prisma.book.create({
      data: {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
        pages: req.body.pages,
        pagesRead: req.body.pagesRead || 0,
        status: status,
        rating: req.body.rating || 0,
        synopsis: req.body.synopsis,
        cover: req.body.cover,
        imageUrl: req.body.imageUrl,
        userId: userId
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true
          }
        }
      }
    });
    
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mapear status do frontend para o enum do Prisma se fornecido
    const updateData = { ...req.body };
    if (updateData.status) {
      if (updateData.status === 'lendo') updateData.status = 'READING';
      else if (updateData.status === 'finalizado') updateData.status = 'FINISHED';
      else if (updateData.status === 'quero ler') updateData.status = 'WANT_TO_READ';
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true
          }
        }
      }
    });

    res.json(updatedBook);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Book not found' });
    }
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.book.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Book not found' });
    }
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    const books = await prisma.book.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(books);
  } catch (error) {
    console.error('Error fetching user books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};