## Phase 2 — Outils du développeur et Claude (semaine 3)

Objectif : sauvegarder ton code avec Git, le mettre sur GitHub, et savoir donner à Claude des instructions précises. Claude Code se pratique en phase 5 ; ici, tu comprends comment il travaille pour ne pas le subir.

**Leçons**

1. **VS Code.** Ouvre un dossier (pas un fichier seul), repère l'explorateur de fichiers à gauche, ouvre le terminal intégré (menu Terminal > Nouveau terminal). Active la sauvegarde automatique (Fichier > Enregistrement automatique).
2. **Git : des points de sauvegarde.** Un *commit* est une photo de ton projet à un instant donné, avec un message. Le cycle : `git init` (une seule fois), `git add .` (choisir les changements), `git commit -m "message"` (prendre la photo), `git log` (voir l'historique). Si Claude casse quelque chose, tu reviens au dernier commit.
3. **GitHub : la copie en ligne.** Un *dépôt* (repository) est le dossier de ton projet sur GitHub. `git push` envoie tes commits ; l'hébergeur lira ensuite ton code depuis GitHub.
4. **Bien parler à Claude.** Donne le contexte, l'objectif, les contraintes et le format attendu. Demande toujours une explication, puis vérifie en testant. Utilise le modèle ci-dessous.
5. **Comment travaille Claude Code.** C'est un *agent* : il lit les fichiers de ton projet, propose un plan, modifie le code et lance des commandes, en te demandant la permission. Le **mode Plan** lui fait proposer un plan avant d'agir. Le fichier `CLAUDE.md` à la racine du projet lui donne des règles permanentes. Règle d'or : fais un commit **avant** chaque demande à Claude Code, et relis les changements qu'il propose.

**Modèle de demande à Claude**

```text
Contexte : je suis débutant. Mon projet est [description en 2 phrases].
Objectif : [ce que je veux obtenir, un seul résultat].
Contraintes : [technos, budget 0 $, pas de nouvelle dépendance sans me demander].
Avant de coder : explique ton plan en 3 à 5 étapes et attends mon accord.
Après : dis-moi quels fichiers tu as changés, pourquoi, et comment tester.
```

**Ressources**

| Leçon | Ressource | Créateur | Publiée | Langue |
| --- | --- | --- | --- | --- |
| 1 | [Documentation de démarrage de VS Code](https://code.visualstudio.com/docs/getstarted/getting-started) | Microsoft | Doc officielle | Anglais |
| 2–3 | [Apprendre Git & GitHub en 13 minutes - Tutoriel débutant 2026](https://www.youtube.com/watch?v=m3QeXlytsjw) | Comment Coder | 12 juillet 2026 | Français |
| 2–3 | [Contrôle de version](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Version_control) | MDN | Doc officielle | Français |
| 4 | [Claude IA : le tutoriel facile pour débutant](https://www.youtube.com/watch?v=nHXND_R4Jy8) | Ludo Salenne | 24 juin 2026 | Français |
| 4 | [Claude 101](https://academy.claude.com/courses/claude-101) (13 leçons, 2 h 30, gratuit) | Claude Academy (Anthropic) | Cours officiel | Anglais |
| 5 | [Tutoriel Claude Code pour Débutants : Code SANS Savoir Coder](https://www.youtube.com/watch?v=BW-Ue9FQRTI) | EL IBRA TECH | 12 juin 2026 | Français |
| 5 | [Claude Code 101](https://academy.claude.com/courses/claude-code-101) (12 leçons, 1 h 30, gratuit) | Claude Academy (Anthropic) | Cours officiel | Anglais |

Astuce : les cours de Claude Academy sont en anglais ; active les sous-titres ou colle un passage à Claude en lui demandant de l'expliquer en français.

**Exercice et livrable**

Mets `ma-premiere-page` sous Git, fais au moins 3 commits (un par fichier modifié) et pousse le tout sur un dépôt GitHub. Puis colle ton `script.js` dans Claude avec le modèle ci-dessus et demande une explication ligne par ligne.

**Erreurs fréquentes**

- `fatal: not a git repository` : tu n'es pas dans le dossier du projet, ou tu as oublié `git init`.
- `nothing to commit` : tu as oublié `git add .`, ou le fichier n'est pas enregistré.
- `git push` refuse l'authentification : GitHub n'accepte plus le mot de passe ; connecte-toi via la fenêtre de navigateur que Git ouvre, ou suis la vidéo à 11:36.

**Point de contrôle**

1. Qu'est-ce qu'un commit ? *Une sauvegarde nommée de l'état du projet, vers laquelle tu peux revenir.*
2. Pourquoi faire un commit avant de demander quelque chose à Claude Code ? *Pour pouvoir annuler ses changements s'il casse quelque chose.*
3. À quoi sert le fichier `CLAUDE.md` ? *À donner à Claude Code des règles qu'il relit à chaque session.*
