import { NextResponse } from 'next/server';

export async function middleware() {
  // Middleware simplificado - sem autenticação de middleware
  // A autenticação será feita no lado do cliente
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
