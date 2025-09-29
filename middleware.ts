// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  // Isso sincroniza o token do cliente para o cookie
  await supabase.auth.getSession();

  return res;
}

// Aplique o middleware apenas onde necessário
export const config = {
  matcher: ["/perfil", "/dashboard"],
};
