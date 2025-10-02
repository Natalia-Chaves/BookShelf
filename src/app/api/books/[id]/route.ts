import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

// GET /api/books/:id
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
    });

    if (!book) {
      return NextResponse.json({ error: "Livro não encontrado." }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("Erro no GET /books/:id", error);
    return NextResponse.json({ error: "Erro ao buscar livro." }, { status: 500 });
  }
}

// PUT /api/books/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const book = await prisma.book.update({
      where: { id: params.id },
      data: {
        title: body.title,
        author: body.author,
        genre: body.genre,
        cover: body.cover,
        year: body.year,
        pages: body.pages,
        synopsis: body.synopsis,
        status: body.status,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error("Erro no PUT /books/:id", error);
    return NextResponse.json({ error: "Erro ao atualizar livro." }, { status: 500 });
  }
}

// DELETE /api/books/:id
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.book.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Livro excluído com sucesso." });
  } catch (error) {
    console.error("Erro no DELETE /books/:id", error);
    return NextResponse.json({ error: "Erro ao excluir livro." }, { status: 500 });
  }
}
