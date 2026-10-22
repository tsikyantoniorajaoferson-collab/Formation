// Lit les variables d'environnement et explique clairement ce qui manque.

export function supabasePublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function supabaseSecretKey() {
  return process.env.SUPABASE_SECRET_KEY ?? null;
}

export const MISSING_CONFIG_MESSAGE =
  "Le site n'est pas encore relié à Supabase : ajoute NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY et SUPABASE_SECRET_KEY dans les variables d'environnement (voir README).";
