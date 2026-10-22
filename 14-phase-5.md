## Phase 5 — Construire le MVP avec Claude Code (semaines 7–9)

Objectif : un MVP (*produit minimum viable*, la plus petite version utile) qui tourne sur ton ordinateur : connexion, génération de publications, historique. Une seule fonctionnalité par session avec Claude Code, un commit après chaque fonctionnalité qui marche. C'est le moment d'activer Claude Pro.

**Mise en place (jour 1)**

1. Active Claude Pro et installe Claude Code (voir la leçon *Outils et logiciels*).
2. Vérifie Node.js : `node -v` doit afficher 20.9 ou plus, la version minimale demandée par Next.js. [Source](https://nextjs.org/docs/app/getting-started/installation)
3. Crée le projet. L'option `--yes` active les réglages recommandés : TypeScript, Tailwind CSS, App Router, et un fichier `AGENTS.md` qui aide les agents de code à écrire du Next.js à jour.

```bash
npx create-next-app@latest mon-saas --yes
cd mon-saas
npm run dev
```

4. Ouvre `http://localhost:3000` : tu vois la page par défaut. Fais ton premier commit et pousse sur GitHub.
5. Crée le fichier `CLAUDE.md` à la racine avec ce contenu, puis complète-le :

```markdown
# Règles du projet
- Je suis débutant. Explique chaque changement en français simple.
- Avant de coder, propose un plan et attends mon accord.
- Une seule fonctionnalité à la fois. Dis-moi comment la tester.
- N'ajoute aucune dépendance sans me demander et m'expliquer pourquoi.
- Aucune clé secrète dans le frontend ; secrets dans .env.local uniquement.
- L'API Claude n'est appelée que depuis une route API côté serveur.
- RLS activée sur chaque table Supabase, une règle par opération.
- Ajoute états de chargement, messages d'erreur et états vides.
- Ne dis jamais qu'une fonctionnalité marche sans l'avoir testée.

# Le produit
[Colle ici ta promesse et ton segment de la phase 4]
```

**Les 5 sprints** (un sprint = une ou deux sessions ; active le mode Plan pour chacun)

| Sprint | Ce que tu demandes à Claude Code | Comment tu testes |
| --- | --- | --- |
| 1. Interface | « Crée les pages accueil, connexion, générateur et historique, sans logique, responsive. » | Les 4 pages s'ouvrent sur ordinateur et en mode téléphone (F12, icône téléphone) |
| 2. Supabase | « Connecte Supabase. Crée les tables `profiles` et `generations` avec le SQL de ma phase 3, RLS incluse. Ajoute la connexion. » | Tu crées un compte, tu te connectes, et un 2e compte ne voit pas les données du 1er |
| 3. Génération IA | « Crée une route API côté serveur qui appelle Claude Haiku 5.5 avec ma clé dans `.env.local`, vérifie l'utilisateur et limite à 10 générations par mois en plan gratuit. » | 10 générations passent, la 11e affiche un message clair ; la clé n'apparaît nulle part dans le navigateur (F12, onglet Réseau) |
| 4. Historique | « Affiche les générations de l'utilisateur, les plus récentes en premier, avec un bouton Copier. » | La liste s'affiche, est vide pour un nouveau compte avec un message d'aide |
| 5. Finitions | « Ajoute états de chargement, messages d'erreur en français et vérifie toutes les pages sur mobile. » | Coupe le Wi-Fi pendant une génération : un message d'erreur s'affiche, pas une page blanche |

**Erreurs fréquentes**

- La liste reste vide alors que la table contient des lignes : il manque la règle RLS de lecture (`select`).
- Erreur `42501` dans Supabase : le rôle n'a pas la permission sur la table ; vérifie les *grants* avant de modifier la règle RLS. [Source](https://supabase.com/docs/guides/database/postgres/row-level-security)
- « Variable d'environnement manquante » : tu as modifié `.env.local` sans redémarrer `npm run dev`.
- Claude Code tourne en rond : arrête-le, reviens au dernier commit (`git restore .`), et redonne une demande plus petite.

**Ressources**

| Ressource | Créateur | Publiée | Langue |
| --- | --- | --- | --- |
| [Claude Code in action](https://academy.claude.com/courses/claude-code-in-action) (9 leçons, 1 h, gratuit) | Claude Academy (Anthropic) | Cours officiel | Anglais |
| [Maîtriser CLAUDE CODE en 1 HEURE (l'ESSENTIEL EN 2026)](https://www.youtube.com/watch?v=KtPAAOzn128) — `CLAUDE.md`, règles, compétences | ViDev | 7 juin 2026 | Français |
| [Installation de Next.js](https://nextjs.org/docs/app/getting-started/installation) | Vercel (Next.js) | Doc mise à jour le 2 octobre 2026 | Anglais |
| [Documentation Claude Code](https://code.claude.com/docs/en/overview) | Anthropic | Doc officielle | Anglais |

**Livrable** : le MVP fonctionne sur ton ordinateur, chaque sprint a son commit, et 3 inscrits de ta page d'attente l'ont essayé en partage d'écran. Note leurs blocages : ce sont tes priorités de la phase 6.
