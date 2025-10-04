// lib/supabaseServer.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export function createServerSupabaseClient() {
  return createServerComponentClient({
    cookies,
    headers,
  });
}
