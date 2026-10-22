"use client";
// Barre latérale : liste des leçons, avec l'état terminé / à faire.
// Sur téléphone, elle se replie (clic sur le titre pour l'ouvrir).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = { slug: string; title: string; done: boolean };

export function Sidebar({ items }: { items: Item[] }) {
  const pathname = usePathname();
  // Ouverte sur ordinateur, repliée sur téléphone.
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(window.matchMedia("(min-width: 901px)").matches);
  }, []);
  // Sur téléphone, on replie la liste après avoir choisi une leçon.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 901px)").matches) setOpen(false);
  }, [pathname]);
  const doneCount = items.filter((i) => i.done).length;
  const percent = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  return (
    <aside className="sidebar">
      <details open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
        <summary>
          <span>Leçons</span>
          <span className="hint">
            {doneCount}/{items.length}
          </span>
        </summary>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progression globale"
          >
            <span style={{ width: `${percent}%` }} />
          </div>
          <div className="progress-label">{percent} % terminé</div>
        </div>
        <ul className="lesson-list">
          <li>
            <Link href="/formation" aria-current={pathname === "/formation" ? "page" : undefined}>
              <span className="dot" aria-hidden="true">⌂</span>
              <span>Tableau de bord</span>
            </Link>
          </li>
          {items.map((item) => {
            const href = `/formation/${item.slug}`;
            return (
              <li key={item.slug}>
                <Link href={href} aria-current={pathname === href ? "page" : undefined}>
                  <span className={`dot${item.done ? " done" : ""}`} aria-hidden="true">
                    {item.done ? "✓" : ""}
                  </span>
                  <span>
                    {item.title}
                    <span className="visually-hidden">{item.done ? " (terminée)" : ""}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </details>
    </aside>
  );
}
