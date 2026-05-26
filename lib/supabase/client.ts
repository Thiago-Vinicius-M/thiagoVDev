import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// True quando as variáveis de ambiente estão configuradas
export const isSupabaseConfigured = Boolean(url && key);

// Evita lançar erro quando as variáveis não estão configuradas
export const supabase = isSupabaseConfigured
  ? createClient(url, key)
  : (null as unknown as ReturnType<typeof createClient>);
