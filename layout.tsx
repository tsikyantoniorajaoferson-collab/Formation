import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "De débutant à créateur de SaaS avec Claude",
  description:
    "Formation en français : bases de l'informatique, Claude et Claude Code, idée, MVP, sécurité et mise en ligne d'un SaaS avec 100 $.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
