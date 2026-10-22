import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { SignInForm } from "@/components/AuthForms";

export const metadata = { title: "Connexion — Formation SaaS avec Claude" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;
  const notice =
    erreur === "acces"
      ? "Ce compte n'a pas accès à la formation. Crée ton compte avec une clé d'accès valide."
      : undefined;

  return (
    <>
      <TopBar />
      <main className="auth-wrap">
        <div className="card auth-card">
          <h1>Se connecter</h1>
          <p>Retrouve ta progression et tes notes.</p>
          <SignInForm notice={notice} />
          <p className="auth-switch">
            Pas encore de compte ? <Link href="/inscription">Créer mon compte avec ma clé</Link>
          </p>
          <p className="auth-switch">
            Mot de passe oublié ? Contacte la personne qui t&apos;a donné ta clé.
          </p>
        </div>
      </main>
    </>
  );
}
