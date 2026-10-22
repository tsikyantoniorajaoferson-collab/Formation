// Client Supabase pour le serveur (pages, actions), qui lit et écrit
// les cookies de connexion de l'utilisateur.
// Basé sur l'exemple officiel Supabase pour Next.js.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabasePublicEnv } from "@/lib/env";

export async function createClient() {
  const env = supabasePublicEnv();
  if (!env) return null;
  const cookieStore = await cookies();

  return createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Appelé depuis une page (Server Component) : sans effet,
          // le fichier proxy.ts se charge de rafraîchir la session.
        }
      },
    },
  });
}

export type AccessUser = {
  userId: string;
  email: string | null;
  hasAccess: boolean;
};

// Renvoie l'utilisateur connecté (vérifié côté serveur) ou null.
// getClaims() vérifie la signature du jeton : on ne fait pas confiance au cookie seul.
export async function getCurrentUser(): Promise<AccessUser | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) return null;
  const claims = data.claims;
  const appMetadata = claims.app_metadata as { access?: boolean } | undefined;
  return {
    userId: String(claims.sub),
    email: typeof claims.email === "string" ? claims.email : null,
    hasAccess: appMetadata?.access === true,
  };
}
