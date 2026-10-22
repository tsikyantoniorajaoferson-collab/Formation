# Formation « De débutant à créateur de SaaS avec Claude »

Application web de la formation : page d'accueil publique, accès protégé par **clé**, comptes élèves (connexion qui reste active), progression et **notes sauvegardées**.

## Comment ça marche

1. Un visiteur arrive sur l'accueil. Il voit la présentation, pas le contenu.
2. Il clique sur **« Créer mon compte avec ma clé »** et entre : sa clé, son e-mail, un mot de passe.
3. Le serveur vérifie la clé. Si elle est valide et jamais utilisée, le compte est créé et la clé est « brûlée » (une clé = un compte).
4. Ensuite, l'élève se reconnecte simplement avec son e-mail et son mot de passe. Il reste connecté sur son appareil.
5. Dans chaque leçon : vidéos intégrées, contenu, **Mes notes** (sauvegarde automatique + bouton Enregistrer) et **Marquer comme terminée**.

**Technologies** : Next.js 16 (TypeScript), Supabase (comptes + base de données), hébergement Vercel. Coût : 0 $ avec les plans gratuits.

**Sécurité** :
- les clés ne sont jamais stockées en clair, seulement leur empreinte SHA-256 ;
- la table des clés n'est lisible par personne depuis le navigateur (RLS sans règle) ;
- chaque élève ne peut lire et modifier que sa propre progression (RLS, une règle par opération) ;
- l'accès est vérifié côté serveur à chaque page (`proxy.ts` + mise en page `/formation`) ;
- la clé secrète Supabase n'est utilisée que sur le serveur.

---

## Mise en ligne pas à pas (environ 30 minutes)

### Étape 1 — Créer la base de données Supabase (gratuit)

1. Va sur [supabase.com](https://supabase.com), crée un compte puis **New project**. Choisis une région proche (par exemple Canada) et note le mot de passe de la base.
2. Dans le menu de gauche, ouvre **SQL Editor** > **New query**.
3. Copie tout le contenu de `supabase/schema.sql`, colle-le, clique sur **Run**. Tu dois voir « Success ».
4. Nouvelle requête : copie le contenu de `supabase/cles-initiales.sql`, colle, **Run**. Tes 10 clés sont actives.
5. **Important** — empêche les inscriptions sans clé : menu **Authentication** > **Sign In / Providers** (ou *Providers*), désactive **« Allow new users to sign up »**. Les comptes ne seront plus créés que par ton site, après vérification d'une clé.
   (Même si tu l'oublies, un compte créé sans clé n'a pas accès à la formation, mais il vaut mieux fermer cette porte.)
6. Récupère tes 3 valeurs dans **Project Settings** > **API Keys** (ou bouton **Connect**) :
   - l'URL du projet (`https://xxxx.supabase.co`) ;
   - la **Publishable key** (`sb_publishable_...`) ;
   - la **Secret key** (`sb_secret_...`) — garde-la secrète.

### Étape 2 — Mettre le code sur GitHub

Dans un terminal, dans le dossier du projet :

```bash
git init
git add .
git commit -m "Première version de la formation"
```

Puis crée un dépôt **privé** sur [github.com/new](https://github.com/new) et suis les 2 commandes que GitHub affiche (`git remote add origin ...` puis `git push -u origin main`).

Le fichier `.gitignore` empêche d'envoyer tes secrets (`.env.local`) et tout fichier `CLES-ACCES*.txt`.

### Étape 3 — Déployer sur Vercel

1. Va sur [vercel.com](https://vercel.com), connecte-toi avec GitHub, **Add New** > **Project**, choisis ton dépôt.
2. Vercel reconnaît Next.js tout seul. Avant de cliquer sur Deploy, ouvre **Environment Variables** et ajoute :

| Nom | Valeur |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | l'URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | la Publishable key |
| `SUPABASE_SECRET_KEY` | la Secret key |

3. Clique sur **Deploy**. Après 1 à 2 minutes, Vercel te donne l'adresse du site (`https://ton-projet.vercel.app`).

> À savoir : le plan gratuit Vercel (Hobby) est réservé aux projets non commerciaux. Si tu **vends** les clés, passe à Vercel Pro (20 $/mois) ou déploie sur Netlify, dont le plan gratuit autorise l'usage commercial.

### Étape 4 — Tester en ligne (5 minutes)

- [ ] L'accueil s'affiche sur ordinateur et téléphone.
- [ ] `/formation` sans être connecté renvoie vers la page de connexion.
- [ ] Une fausse clé affiche « Clé d'accès invalide ou déjà utilisée ».
- [ ] La clé 01 crée ton compte et ouvre le tableau de bord.
- [ ] La même clé 01 ne fonctionne plus pour un 2e compte.
- [ ] Dans une leçon : écris une note, attends « Enregistré », recharge la page : la note est toujours là.
- [ ] « Marquer comme terminée » met à jour la barre de progression.
- [ ] Déconnexion puis reconnexion avec e-mail + mot de passe : tout est conservé.
- [ ] Avec un 2e compte (clé 02), tu ne vois pas les notes du 1er.

---

## Gérer les clés

- **Voir les clés utilisées** : Supabase > **Table Editor** > `access_keys`. La colonne `used_by_email` indique qui a utilisé chaque clé.
- **Créer de nouvelles clés** : sur ton ordinateur, dans le dossier du projet :

  ```bash
  npm run cles -- 10
  ```

  Le terminal affiche les nouvelles clés (à donner aux élèves) et le SQL à coller dans **SQL Editor**. Seule l'empreinte va dans la base.
- **Retirer l'accès à un élève** : Supabase > **Authentication** > **Users** > supprime son compte. Sa progression est supprimée avec.
- **Annuler une clé pas encore utilisée** : supprime sa ligne dans `access_keys` (le libellé « Clé 03 — ... » t'aide à la retrouver).
- **Mot de passe oublié** : supprime le compte de l'élève dans **Authentication** > **Users**, puis libère sa clé pour qu'il se réinscrive :

  ```sql
  update public.access_keys set used_at = null, used_by = null, used_by_email = null
  where used_by_email = 'eleve@exemple.com';
  ```

---

## Lancer le projet sur ton ordinateur

Il faut [Node.js](https://nodejs.org/) 20.9 ou plus.

```bash
npm install
cp .env.example .env.local     # puis remplis les 3 valeurs
npm run dev
```

Ouvre `http://localhost:3000`. Avant chaque mise en ligne, vérifie que `npm run build` réussit.

## Modifier le contenu des leçons

Les leçons sont des fichiers texte dans `content/` (format Markdown). Le nombre au début du nom fixe l'ordre. Modifie un fichier, puis :

```bash
git add . && git commit -m "Mise à jour des leçons" && git push
```

Vercel republie le site automatiquement. Tout lien YouTube `https://www.youtube.com/watch?v=...` dans une leçon devient une vidéo intégrée en haut de la leçon. N'ajoute que des vidéos que tu as vérifiées.

## Les fichiers importants

| Fichier | Rôle |
| --- | --- |
| `app/page.tsx` | Page d'accueil publique |
| `app/inscription/` et `app/connexion/` | Créer un compte avec une clé, se connecter |
| `app/actions/auth.ts` | Vérification de la clé et création du compte (serveur uniquement) |
| `app/actions/progress.ts` | Sauvegarde des notes et de la progression |
| `app/formation/` | Espace élève : tableau de bord et leçons |
| `proxy.ts` et `lib/supabase/proxy.ts` | Garde la session active et protège `/formation` |
| `content/*.md` | Le texte des leçons |
| `supabase/schema.sql` | Tables et règles de sécurité |
| `supabase/cles-initiales.sql` | Empreintes des 10 premières clés |
| `scripts/generer-cles.mjs` | Création de nouvelles clés |
