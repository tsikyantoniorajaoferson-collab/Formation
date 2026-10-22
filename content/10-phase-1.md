## Phase 1 — Bases de l'informatique (semaines 1–2)

Objectif : comprendre ce qui se passe quand tu ouvres un site, et savoir lire du HTML, du CSS et du JavaScript. Tu n'as pas besoin de tout savoir écrire : tu dois pouvoir **lire** ce que Claude écrit et repérer où ça casse.

**Leçons**

1. **Internet, le web, un site, une application, un SaaS.** Internet est le réseau de câbles et d'ordinateurs ; le web est l'ensemble des pages qu'on y consulte. Ton navigateur (le *client*) demande une page à un ordinateur distant (le *serveur*) ; le DNS traduit `instagram.com` en adresse IP, comme un annuaire. Un SaaS (*Software as a Service*) est un logiciel qu'on utilise dans le navigateur contre un abonnement : Canva, Notion.
2. **Fichiers, dossiers et terminal.** Un fichier a un nom et une extension (`.html`, `.css`, `.js`) qui dit ce qu'il contient. Le terminal est une fenêtre où tu tapes des commandes au lieu de cliquer. Les 5 à connaître : `pwd` (où suis-je ?), `ls` ou `dir` (que contient ce dossier ?), `cd` (aller dans un dossier), `mkdir` (créer un dossier), `code .` (ouvrir le dossier dans VS Code).
3. **HTML : la structure.** Les balises disent ce qu'est chaque élément : titre `<h1>`, paragraphe `<p>`, lien `<a>`, bouton `<button>`, formulaire `<form>`.
4. **CSS : l'apparence.** Couleurs, tailles, espacements, et la mise en page qui s'adapte au téléphone (*responsive*).
5. **JavaScript : le comportement.** Une *variable* stocke une valeur ; une *condition* (`if`) choisit entre deux chemins ; une *fonction* est une recette réutilisable ; un *événement* réagit à un clic.
6. **Lire une erreur.** Ouvre la console (F12, onglet Console) : un message rouge donne le type d'erreur, le fichier et le numéro de ligne. Copie-le tel quel à Claude : c'est 80 % du débogage.

**Ressources**

| Leçon | Ressource | Créateur | Publiée | Langue |
| --- | --- | --- | --- | --- |
| 1 | [Internet expliqué en 10 min : tu comprendras (enfin) comment ça marche !](https://www.youtube.com/watch?v=Mvd9n1KxSaI) | THEFULKOM_TECH | 25 mai 2025 | Français |
| 2 | [Gérer les fichiers](https://developer.mozilla.org/fr/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files) et [Ligne de commande](https://developer.mozilla.org/fr/docs/Learn_web_development/Getting_started/Environment_setup/Command_line) | MDN | Mis à jour 2025 | Français |
| 3–4 | [Le cours complet : Créer un site web avec HTML5 et CSS3](https://www.youtube.com/watch?v=pzpW-u23VII) | OpenClassrooms en Français | 21 juin 2025 | Français |
| 3–4 | [Votre premier site web](https://developer.mozilla.org/fr/docs/Learn_web_development/Getting_started/Your_first_website) (5 étapes guidées) | MDN | Mis à jour 2025 | Français |
| 5 | [Apprendre JavaScript en 1h : Cours complet débutant 2026](https://www.youtube.com/watch?v=ldxt9FNUc50) | Comment Coder | 2 octobre 2025 | Français |
| 5–6 | [Script dynamique avec JavaScript](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Scripting) (variables, conditions, fonctions, débogage) | MDN | Mis à jour 2025 | Français |

Vidéos vérifiées le 20 octobre 2026 : titre, créateur et date relevés sur la page YouTube.

**Exercice et livrable**

Crée un dossier `ma-premiere-page` avec `index.html`, `style.css` et `script.js`. La page présente ton futur SaaS en 3 phrases, avec un bouton « Donne-moi une idée de publication ». Au clic, JavaScript affiche une idée tirée au hasard dans une liste de 5 idées que tu as écrites. Écris-la toi-même ; Claude (chat gratuit) peut t'expliquer une erreur, pas écrire la page.

**Erreurs fréquentes**

- Le CSS ne s'applique pas : le chemin dans `<link href="style.css">` ne correspond pas au nom du fichier.
- Le bouton ne fait rien : la balise `<script>` est placée avant le bouton, ou il y a une faute de frappe dans le nom de la fonction ; regarde la console.
- `cd` dit « dossier introuvable » : tu n'es pas dans le bon dossier ; tape `pwd` puis `ls`.

**Point de contrôle** (réponds sans regarder, puis vérifie)

1. Quelle est la différence entre le client et le serveur ? *Le client (ton navigateur) demande ; le serveur stocke et répond.*
2. Quel langage changerait la couleur d'un bouton ? *CSS.*
3. À quoi sert une fonction ? *À regrouper des instructions pour les réutiliser en l'appelant par son nom.*
4. Où trouves-tu le numéro de ligne d'une erreur JavaScript ? *Dans la console du navigateur (F12).*
