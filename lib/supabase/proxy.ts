// Rafraîchit la session à chaque visite (c'est ce qui garde l'élève connecté)
// et protège les pages /formation.
// Basé sur le modèle officiel Supabase « updateSession » pour Next.js.
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabasePublicEnv } from "@/lib/env";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const env = supabasePublicEnv();
  const path = request.nextUrl.pathname;

  if (!env) {
    // Pas encore configuré : on laisse passer, les pages affichent le message d'aide.
    return response;
  }

  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Ne rien mettre entre createServerClient et getClaims (recommandation Supabase).
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const hasAccess =
    (claims?.app_metadata as { access?: boolean } | undefined)?.access === true;

  const redirectTo = (target: string) => {
    const url = request.nextUrl.clone();
    const [pathname, query] = target.split("?");
    url.pathname = pathname;
    url.search = query ? `?${query}` : "";
    const redirect = NextResponse.redirect(url);
    // On recopie les cookies rafraîchis pour ne pas déconnecter l'élève.
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  };

  if (path.startsWith("/formation")) {
    if (!claims) return redirectTo("/connexion");
    if (!hasAccess) return redirectTo("/connexion?erreur=acces");
  }

  if ((path === "/connexion" || path === "/inscription") && claims && hasAccess) {
    return redirectTo("/formation");
  }

  return response;
}
