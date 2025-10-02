// src/app/api/books/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// GET /api/books
export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { created_at: "desc" }, // ordena do mais recente pro mais antigo
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

    // Validação mínima (evita salvar dados quebrados)
    if (!body.title || !body.author) {
      return NextResponse.json({ error: "Título e autor são obrigatórios." }, { status: 400 });
    }

    const newBook = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
        genre: body.genre || null,
        cover: body.cover || null,
        year: typeof body.year === "number" ? body.year : null,
        pages: typeof body.pages === "number" ? body.pages : null,
        synopsis: body.synopsis || "",
        rating: 0,
        status: body.status || "quero ler",
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Erro no POST /api/books", error);
    return NextResponse.json({ error: "Erro ao criar livro."}, {status: 500}) 
  }
}
