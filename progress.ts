// Lecture de la progression de l'élève connecté (côté serveur).
import { createClient } from "@/lib/supabase/server";

export type ProgressRow = { lesson_slug: string; completed: boolean; notes: string; updated_at: string };

export async function getMyProgress(): Promise<{ rows: ProgressRow[]; error: string | null }> {
  const supabase = await createClient();
  if (!supabase) return { rows: [], error: "Le site n'est pas configuré." };
  const { data, error } = await supabase
    .from("progress")
    .select("lesson_slug, completed, notes, updated_at");
  if (error) return { rows: [], error: "Impossible de charger ta progression pour le moment." };
  return { rows: (data ?? []) as ProgressRow[], error: null };
}
