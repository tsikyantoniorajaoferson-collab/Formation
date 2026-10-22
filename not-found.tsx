import Link from "next/link";

export default function NotFound() {
  return (
    <main className="auth-wrap">
      <div className="card auth-card">
        <h1>Page introuvable</h1>
        <p>Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="btn">
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
