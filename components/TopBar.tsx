import Link from "next/link";
import { signOut } from "@/app/actions/auth";

export function TopBar({ email }: { email?: string | null }) {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href={email ? "/formation" : "/"} className="brand">
          Créateur de SaaS <span>avec Claude</span>
        </Link>
        <nav className="topbar-actions" aria-label="Compte">
          {email ? (
            <>
              <span className="topbar-email">{email}</span>
              <form action={signOut}>
                <button type="submit" className="btn btn-secondary btn-small">
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/connexion" className="btn btn-secondary btn-small">
                Se connecter
              </Link>
              <Link href="/inscription" className="btn btn-small">
                J&apos;ai une clé
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
