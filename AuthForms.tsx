"use client";
// Formulaires d'inscription et de connexion.
// Ils envoient les données à des actions serveur : la vérification de la clé
// et du mot de passe se fait sur le serveur, jamais dans le navigateur.
import { useActionState } from "react";
import { signIn, signUpWithKey, type FormState } from "@/app/actions/auth";

export function SignUpForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(signUpWithKey, undefined);

  return (
    <form action={formAction} noValidate>
      {state?.error && (
        <div className="alert alert-error" role="alert">
          {state.error}
        </div>
      )}
      <div className="field">
        <label htmlFor="accessKey">Clé d&apos;accès</label>
        <input
          id="accessKey"
          name="accessKey"
          type="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="FORM-XXXX-XXXX-XXXX-XXXX-XXXX"
          required
        />
        <span className="hint">La clé que tu as reçue. Elle ne fonctionne qu&apos;une seule fois.</span>
      </div>
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" defaultValue={state?.email} required />
      </div>
      <div className="field">
        <label htmlFor="password">Mot de passe</label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required />
        <span className="hint">8 caractères minimum. Tu t&apos;en serviras pour te reconnecter.</span>
      </div>
      <button type="submit" className="btn" style={{ width: "100%" }} disabled={pending}>
        {pending ? "Création du compte…" : "Créer mon compte"}
      </button>
    </form>
  );
}

export function SignInForm({ notice }: { notice?: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(signIn, undefined);

  return (
    <form action={formAction} noValidate>
      {notice && !state?.error && <div className="alert alert-info">{notice}</div>}
      {state?.error && (
        <div className="alert alert-error" role="alert">
          {state.error}
        </div>
      )}
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" defaultValue={state?.email} required />
      </div>
      <div className="field">
        <label htmlFor="password">Mot de passe</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <button type="submit" className="btn" style={{ width: "100%" }} disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
