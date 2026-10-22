"use client";
// Bloc « Ma progression » d'une leçon : notes personnelles + bouton Terminer.
// Les notes sont sauvegardées avec le bouton Enregistrer, et aussi
// automatiquement 2 secondes après la dernière frappe.
import { useEffect, useRef, useState, useTransition } from "react";
import { saveProgress } from "@/app/actions/progress";

type Props = {
  slug: string;
  initialCompleted: boolean;
  initialNotes: string;
  initialSavedAt: string | null;
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("fr-CA", { dateStyle: "short", timeStyle: "short" });
}

export function LessonProgress({ slug, initialCompleted, initialNotes, initialSavedAt }: Props) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [notes, setNotes] = useState(initialNotes);
  const [savedNotes, setSavedNotes] = useState(initialNotes);
  const [status, setStatus] = useState<{ text: string; error?: boolean }>(
    initialSavedAt ? { text: `Enregistré le ${formatTime(initialSavedAt)}` } : { text: "" }
  );
  const [pending, startTransition] = useTransition();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dirty = notes !== savedNotes;

  function save(nextCompleted: boolean, nextNotes: string) {
    setStatus({ text: "Enregistrement…" });
    startTransition(async () => {
      try {
        const result = await saveProgress(slug, nextCompleted, nextNotes);
        if (result.ok) {
          setSavedNotes(nextNotes);
          setStatus({ text: `Enregistré le ${formatTime(result.savedAt)}` });
        } else {
          setStatus({ text: result.error, error: true });
        }
      } catch {
        setStatus({ text: "Pas de connexion : tes changements ne sont pas encore enregistrés.", error: true });
      }
    });
  }

  // Sauvegarde automatique des notes 2 secondes après la dernière frappe.
  useEffect(() => {
    if (!dirty) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => save(completed, notes), 2000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  // Avertit avant de quitter la page si des notes ne sont pas enregistrées.
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  function toggleCompleted() {
    const next = !completed;
    setCompleted(next);
    if (timer.current) clearTimeout(timer.current);
    save(next, notes);
  }

  return (
    <section className="panel" aria-labelledby="progress-title">
      <h2 id="progress-title">Ma progression</h2>
      <div className="field">
        <label htmlFor="notes">Mes notes (journal de bord)</label>
        <textarea
          id="notes"
          value={notes}
          maxLength={20000}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ce que j'ai appris, ce qui a bloqué, mes réponses au point de contrôle…"
        />
      </div>
      <div className="panel-row">
        <span className={`save-status${status.error ? " error" : ""}`} aria-live="polite">
          {dirty && !pending && !status.error ? "Modifications non enregistrées" : status.text}
        </span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (timer.current) clearTimeout(timer.current);
              save(completed, notes);
            }}
            disabled={pending || !dirty}
          >
            Enregistrer
          </button>
          <button type="button" className="btn" onClick={toggleCompleted} disabled={pending}>
            {completed ? "✓ Terminée — annuler" : "Marquer comme terminée"}
          </button>
        </div>
      </div>
    </section>
  );
}
