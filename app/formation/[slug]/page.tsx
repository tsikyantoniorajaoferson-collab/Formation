// Page d'une leçon : vidéos intégrées, contenu, notes et progression.
import Link from "next/link";
import { notFound } from "next/navigation";
import { lessons } from "@/lib/content.generated";
import { getMyProgress } from "@/lib/progress";
import { Markdown } from "@/components/Markdown";
import { LessonProgress } from "@/components/LessonProgress";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessons.find((l) => l.slug === slug);
  return { title: lesson ? `${lesson.title} — Formation SaaS avec Claude` : "Leçon introuvable" };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = lessons.findIndex((l) => l.slug === slug);
  if (index === -1) notFound();

  const lesson = lessons[index];
  const prev = lessons[index - 1];
  const next = lessons[index + 1];

  const { rows, error } = await getMyProgress();
  const row = rows.find((r) => r.lesson_slug === slug);

  return (
    <article>
      <div className="eyebrow">
        Leçon {lesson.order} sur {lessons.length}
      </div>
      <h1 className="page-title">{lesson.title}</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {lesson.videos.length > 0 && (
        <section className="videos" aria-label="Vidéos de la leçon">
          {lesson.videos.map((v) => (
            <div className="video card" key={v.id}>
              <figure>
                <div className="video-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <figcaption>
                  <span className="badge">Vidéo vérifiée</span>
                  {v.title} ·{" "}
                  <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer">
                    Ouvrir sur YouTube
                  </a>
                </figcaption>
              </figure>
            </div>
          ))}
        </section>
      )}

      <div className="prose">
        <Markdown>{lesson.body}</Markdown>
      </div>

      <LessonProgress
        key={slug}
        slug={slug}
        initialCompleted={row?.completed ?? false}
        initialNotes={row?.notes ?? ""}
        initialSavedAt={row?.updated_at ?? null}
      />

      <nav className="lesson-nav" aria-label="Navigation entre les leçons">
        {prev ? (
          <Link href={`/formation/${prev.slug}`} className="btn btn-secondary">
            ← Leçon précédente
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/formation/${next.slug}`} className="btn">
            Leçon suivante →
          </Link>
        ) : (
          <Link href="/formation" className="btn">
            Retour au tableau de bord
          </Link>
        )}
      </nav>
    </article>
  );
}
