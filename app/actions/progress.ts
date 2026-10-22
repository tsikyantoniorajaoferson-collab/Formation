"use server";
// Sauvegarde de la progression et des notes de l'élève.
// La base de données (RLS) garantit qu'un élève ne peut écrire que ses propres lignes.

import { revalidatePath } from "next/cache";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { lessons } from "@/lib/content.generated";

export type SaveResult = { ok: true; savedAt: string } | { ok: false; error: string };

const MAX_NOTES = 20000;

export async function saveProgress(
  lessonSlug: string,
  completed: boolean,
  notes: string
): Promise<SaveResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Ta session a expiré. Reconnecte-toi." };
  if (!user.hasAccess) return { ok: false, error: "Ton compte n'a pas accès à la formation." };

  if (!lessons.some((l) => l.slug === lessonSlug)) {
    return { ok: false, error: "Leçon inconnue." };
  }
  if (typeof notes !== "string" || notes.length > MAX_NOTES) {
    return { ok: false, error: `Tes notes dépassent ${MAX_NOTES} caractères.` };
  }

  const supabase = await createClient();
  if (!supabase) return { ok: false, error: "Le site n'est pas configuré." };

  const savedAt = new Date().toISOString();
  const { error } = await supabase.from("progress").upsert(
    {
      user_id: user.userId,
      lesson_slug: lessonSlug,
      completed: Boolean(completed),
      notes,
      updated_at: savedAt,
    },
    { onConflict: "user_id,lesson_slug" }
  );

  if (error) {
    return { ok: false, error: "La sauvegarde a échoué. Vérifie ta connexion et réessaie." };
  }

  revalidatePath("/formation", "layout");
  return { ok: true, savedAt };
}
