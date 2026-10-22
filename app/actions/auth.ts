"use server";
// Actions serveur : ce code s'exécute uniquement sur le serveur,
// jamais dans le navigateur. C'est ici qu'on vérifie les clés d'accès.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashKey, normalizeKey } from "@/lib/keys";
import { MISSING_CONFIG_MESSAGE } from "@/lib/env";

export type FormState = { error?: string; email?: string } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signUpWithKey(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const accessKey = String(formData.get("accessKey") ?? "");

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { error: "Adresse e-mail invalide.", email };
  }
  if (password.length < 8 || password.length > 72) {
    return { error: "Le mot de passe doit contenir entre 8 et 72 caractères.", email };
  }
  if (normalizeKey(accessKey).length < 12) {
    return { error: "Clé d'accès invalide.", email };
  }

  const admin = createAdminClient();
  const supabase = await createClient();
  if (!admin || !supabase) return { error: MISSING_CONFIG_MESSAGE, email };

  // 1. Réserver la clé : on la marque comme utilisée seulement si elle existe
  //    ET n'a jamais servi. Une même clé ne peut donc créer qu'un seul compte.
  const { data: claimed, error: claimError } = await admin
    .from("access_keys")
    .update({ used_at: new Date().toISOString() })
    .eq("key_hash", hashKey(accessKey))
    .is("used_at", null)
    .select("id");

  if (claimError) {
    return { error: return { error: "Impossible de vérifier la clé. Détail technique : " + claimError.message, email };
  }
  if (!claimed || claimed.length === 0) {
    return { error: "Clé d'accès invalide ou déjà utilisée.", email };
  }
  const keyId = claimed[0].id as string;

  // 2. Créer le compte, avec la mention « accès autorisé » dans app_metadata
  //    (une zone que l'élève ne peut pas modifier lui-même).
  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { access: true },
  });

  if (createError || !created?.user) {
    // On libère la clé pour qu'elle reste utilisable.
    await admin.from("access_keys").update({ used_at: null }).eq("id", keyId);
    const exists =
      createError?.code === "email_exists" ||
      /already|registered|exists/i.test(createError?.message ?? "");
    return {
      error: exists
        ? "Un compte existe déjà avec cet e-mail. Connecte-toi plutôt."
        : "La création du compte a échoué. Réessaie dans un instant.",
      email,
    };
  }

  await admin
    .from("access_keys")
    .update({ used_by: created.user.id, used_by_email: email })
    .eq("id", keyId);

  // 3. Connecter l'élève tout de suite (les cookies gardent la connexion).
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) {
    return { error: "Compte créé. Connecte-toi avec ton e-mail et ton mot de passe.", email };
  }

  redirect("/formation");
}

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!EMAIL_RE.test(email) || !password) {
    return { error: "Entre ton e-mail et ton mot de passe.", email };
  }

  const supabase = await createClient();
  if (!supabase) return { error: MISSING_CONFIG_MESSAGE, email };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "E-mail ou mot de passe incorrect.", email };
  }

  redirect("/formation");
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}
