// Client Supabase « administrateur » : utilise la clé SECRÈTE.
// Il contourne la RLS, donc il ne doit JAMAIS être importé dans un composant
// navigateur ("use client"). Il sert uniquement à :
//  - vérifier et consommer une clé d'accès,
//  - créer le compte de l'élève.
import { createClient } from "@supabase/supabase-js";
import { supabasePublicEnv, supabaseSecretKey } from "@/lib/env";

export function createAdminClient() {
  const env = supabasePublicEnv();
  const secret = supabaseSecretKey();
  if (!env || !secret) return null;
  return createClient(env.url, secret, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
