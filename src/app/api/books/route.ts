// src/app/api/books/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { ReadingStatus } from "@prisma/client";

// GET /api/books
export async function GET() {
  try {
    const books = await prisma.books.findMany({
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("Erro no GET /api/books", error);
    return NextResponse.json({ error: "Erro ao buscar livros." }, { status: 500 });
  }
}

// POST /api/books
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validação mínima
    if (!body.title || !body.author) {
      return NextResponse.json(
        { error: "Título e autor são obrigatórios." },
        { status: 400 }
      );
    }

    // Validação do status (se fornecido)
    const status = body.status || ReadingStatus.QUERO_LER;
    if (!Object.values(ReadingStatus).includes(status)) {
      return NextResponse.json(
        { error: "Status de leitura inválido." },
        { status: 400 }
      );
    }

    const newBook = await prisma.books.create({
      data: {
        title: body.title,
        author: body.author,
        genre: body.genre || null,
        cover: body.cover || null,
        imageurl: body.imageurl || null,
        year: typeof body.year === "number" ? body.year : null,
        pages: typeof body.pages === "number" ? body.pages : null,
        synopsis: body.synopsis || null,
        rating: body.rating || null,
        status: status, // Usa o enum válido
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Erro no POST /api/books", error);
    return NextResponse.json(
      { error: "Erro ao criar livro." },
      { status: 500 }
    );
  }
}