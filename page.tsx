// Page d'accueil publique : présente la formation.
// Le contenu des leçons n'est visible qu'après connexion avec une clé.
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { lessons } from "@/lib/content.generated";
import { getCurrentUser } from "@/lib/supabase/server";

const phaseSummaries: Record<string, string> = {
  "phase-1": "Internet, fichiers, terminal, HTML, CSS, JavaScript et lecture d'erreurs.",
  "phase-2": "VS Code, Git, GitHub, et comment donner de bonnes instructions à Claude.",
  "phase-3": "Frontend, backend, API, base de données, authentification et sécurité (RLS).",
  "phase-4": "Trouver un SaaS qui gagne déjà de l'argent, puis valider ton idée avec 10 entretiens.",
  "phase-5": "Construire ton MVP avec Claude Code, en 5 sprints testés un par un.",
  "phase-6": "Tester, sécuriser, mettre en ligne et relier ton nom de domaine.",
  "phase-7": "Premiers clients, paiements avec Stripe, coûts et maintenance.",
};

export default async function HomePage() {
  const user = await getCurrentUser();
  const phases = lessons.filter((l) => l.slug.startsWith("phase-"));
  const videoCount = lessons.reduce((n, l) => n + l.videos.length, 0);

  return (
    <>
      <TopBar email={user?.hasAccess ? user.email : null} />
      <main className="container">
        <section className="hero">
          <div className="eyebrow">Formation en français · 12 semaines · budget 100 $</div>
          <h1>De débutant à créateur de SaaS avec Claude</h1>
          <p>
            Apprends les bases de l&apos;informatique pour comprendre ce que Claude fait, trouve une
            idée qui se vend déjà, construis ton MVP avec Claude Code, sécurise-le et mets-le en ligne.
          </p>
          <div className="hero-actions">
            {user?.hasAccess ? (
              <Link href="/formation" className="btn">
                Continuer la formation
              </Link>
            ) : (
              <>
                <Link href="/inscription" className="btn">
                  Créer mon compte avec ma clé
                </Link>
                <Link href="/connexion" className="btn btn-secondary">
                  J&apos;ai déjà un compte
                </Link>
              </>
            )}
          </div>
        </section>

        <section className="section">
          <h2>Le parcours en 7 phases</h2>
          <div className="grid">
            {phases.map((p, i) => (
              <div className="card" key={p.slug}>
                <div className="card-num">Phase {i + 1}</div>
                <h3>{p.title.replace(/^Phase \d+ — /, "")}</h3>
                <p>{phaseSummaries[p.slug] ?? ""}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Ce que contient l&apos;espace élève</h2>
          <div className="grid">
            <div className="card">
              <h3>{lessons.length} leçons pas à pas</h3>
              <p>Explications simples, exercices, erreurs fréquentes et points de contrôle avec réponses.</p>
            </div>
            <div className="card">
              <h3>{videoCount} vidéos intégrées</h3>
              <p>Vidéos en français sélectionnées et vérifiées (titre, créateur, date) le 20 octobre 2026.</p>
            </div>
            <div className="card">
              <h3>Progression sauvegardée</h3>
              <p>Marque tes leçons terminées et écris tes notes : tout est enregistré dans ton compte.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="card">
            <h3>Comment accéder à la formation ?</h3>
            <p>
              L&apos;accès se fait avec une clé personnelle. Clique sur « Créer mon compte avec ma clé »,
              entre ton e-mail, un mot de passe et ta clé. Chaque clé ne sert qu&apos;une seule fois, puis
              tu te connectes avec ton e-mail et ton mot de passe.
            </p>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">Formation « De débutant à créateur de SaaS avec Claude ».</div>
      </footer>
    </>
  );
}
