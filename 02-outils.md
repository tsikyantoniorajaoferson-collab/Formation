## Outils et logiciels

Tu installes 5 logiciels gratuits en semaine 1 et tu crées les autres comptes au moment où tu en as besoin. Rien d'autre n'est nécessaire.

| Outil | À quoi il sert | Quand | Prix |
| --- | --- | --- | --- |
| Navigateur Chrome ou Firefox + outils de développement (touche F12) | Voir et inspecter les pages web, lire les erreurs | Semaine 1 | 0 $ |
| [VS Code](https://code.visualstudio.com/) | Éditeur de code : là où tu lis et modifies les fichiers | Semaine 1 | 0 $ |
| [Git](https://git-scm.com/downloads) (Git for Windows sur PC) | Enregistre l'historique de ton code, comme des points de sauvegarde | Semaine 1 | 0 $ |
| [Node.js](https://nodejs.org/) version LTS | Fait tourner JavaScript sur ton ordinateur ; nécessaire pour Next.js | Semaine 1 | 0 $ |
| Compte [GitHub](https://github.com/) | Stocke ton code en ligne et le relie à l'hébergeur | Semaine 3 | 0 $ |
| Application [Claude](https://claude.com/download) | Professeur particulier (chat), maquettes avec Claude Design | Dès le jour 1 | 0 $ |
| Claude Code (onglet Code de l'app, extension VS Code ou terminal) | Agent qui lit, écrit et teste le code de ton projet | Phase 5 | Inclus dans Pro |
| Comptes Supabase, Vercel ou Netlify | Base de données, comptes utilisateurs, mise en ligne | Phase 5 | 0 $ |
| Cloudflare (registraire de domaine) | Acheter ton nom de domaine | Phase 6 | environ 10 $/an |
| Stripe | Encaisser les paiements | Phase 7 | Frais par vente |

**Installer Claude Code (phase 5)**

Le plus simple pour un débutant : l'application Claude pour ordinateur, onglet **Code**, qui inclut déjà Claude Code. Si tu préfères le terminal, la [documentation officielle](https://code.claude.com/docs/en/overview) donne ces commandes :

```bash
# macOS, Linux
curl -fsSL https://claude.ai/install.sh | bash
```

```powershell
# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

Ensuite, ouvre un nouveau terminal et tape `claude --version`. Si un numéro de version s'affiche, c'est installé. Dans le dossier de ton projet, tape `claude` pour démarrer.

**Ce que tu n'installes pas** : pas de Figma, pas de Docker, pas de logiciel payant, pas d'extension VS Code autre que celle de Claude Code. Chaque outil en plus est une source d'erreurs en plus.
