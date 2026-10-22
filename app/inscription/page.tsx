import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { SignUpForm } from "@/components/AuthForms";

export const metadata = { title: "Créer mon compte — Formation SaaS avec Claude" };

export default function SignUpPage() {
  return (
    <>
      <TopBar />
      <main className="auth-wrap">
        <div className="card auth-card">
          <h1>Créer mon compte</h1>
          <p>Entre ta clé d&apos;accès, ton e-mail et un mot de passe. Tu resteras connecté sur cet appareil.</p>
          <SignUpForm />
          <p className="auth-switch">
            Déjà un compte ? <Link href="/connexion">Se connecter</Link>
          </p>
        </div>
      </main>
    </>
  );
}
