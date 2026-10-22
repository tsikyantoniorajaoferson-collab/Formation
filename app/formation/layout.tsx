// Mise en page de l'espace élève. Vérifie l'accès côté serveur
// (en plus du fichier proxy.ts) : on ne compte jamais sur une seule protection.
import { redirect } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Sidebar } from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/supabase/server";
import { getMyProgress } from "@/lib/progress";
import { lessons } from "@/lib/content.generated";
import { MISSING_CONFIG_MESSAGE, supabasePublicEnv } from "@/lib/env";

export default async function FormationLayout({ children }: { children: React.ReactNode }) {
  if (!supabasePublicEnv()) {
    return (
      <main className="container" style={{ padding: "40px 16px" }}>
        <div className="alert alert-error">{MISSING_CONFIG_MESSAGE}</div>
      </main>
    );
  }

  const user = await getCurrentUser();
  if (!user) redirect("/connexion");
  if (!user.hasAccess) redirect("/connexion?erreur=acces");

  const { rows } = await getMyProgress();
  const done = new Set(rows.filter((r) => r.completed).map((r) => r.lesson_slug));
  // Titres courts dans la barre latérale : on retire « (semaines …) ».
  const items = lessons.map((l) => ({
    slug: l.slug,
    title: l.title.replace(/\s*\([^)]*\)\s*$/, ""),
    done: done.has(l.slug),
  }));

  return (
    <>
      <TopBar email={user.email} />
      <div className="container course">
        <Sidebar items={items} />
        <div className="main-col">{children}</div>
      </div>
    </>
  );
}
