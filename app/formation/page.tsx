// Tableau de bord : progression globale et accès rapide à chaque leçon.
import Link from "next/link";
import { lessons } from "@/lib/content.generated";
import { getMyProgress } from "@/lib/progress";

export const metadata = { title: "Tableau de bord — Formation SaaS avec Claude" };

export default async function DashboardPage() {
  const { rows, error } = await getMyProgress();
  const bySlug = new Map(rows.map((r) => [r.lesson_slug, r]));
  const doneCount = lessons.filter((l) => bySlug.get(l.slug)?.completed).length;
  const percent = Math.round((doneCount / lessons.length) * 100);
  const next = lessons.find((l) => !bySlug.get(l.slug)?.completed);
  const notesCount = rows.filter((r) => r.notes.trim().length > 0).length;

  return (
    <>
      <div className="eyebrow">Tableau de bord</div>
      <h1 className="page-title">
        {doneCount === 0 ? "Bienvenue dans la formation" : "Bon retour !"}
      </h1>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="stats">
        <div className="card stat">
          <strong>{percent} %</strong>
          <span className="hint">de la formation terminée</span>
        </div>
        <div className="card stat">
          <strong>
            {doneCount}/{lessons.length}
          </strong>
          <span className="hint">leçons terminées</span>
        </div>
        <div className="card stat">
          <strong>{notesCount}</strong>
          <span className="hint">leçons avec des notes</span>
        </div>
      </div>

      {next ? (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="card-num">Prochaine étape</div>
          <h3>{next.title}</h3>
          <p style={{ marginBottom: 12 }}>Reprends là où tu t&apos;es arrêté.</p>
          <Link href={`/formation/${next.slug}`} className="btn">
            {doneCount === 0 ? "Commencer" : "Continuer"}
          </Link>
        </div>
      ) : (
        <div className="alert alert-info">Bravo : tu as terminé toutes les leçons !</div>
      )}

      <h2 style={{ fontSize: "1.2rem" }}>Toutes les leçons</h2>
      <div className="grid">
        {lessons.map((l) => {
          const row = bySlug.get(l.slug);
          return (
            <Link key={l.slug} href={`/formation/${l.slug}`} className="card lesson-card">
              <span className={`dot${row?.completed ? " done" : ""}`} aria-hidden="true">
                {row?.completed ? "✓" : ""}
              </span>
              <span>
                <strong style={{ display: "block" }}>{l.title}</strong>
                <span className="hint">
                  {row?.completed ? "Terminée" : "À faire"}
                  {l.videos.length > 0 ? ` · ${l.videos.length} vidéo${l.videos.length > 1 ? "s" : ""}` : ""}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
