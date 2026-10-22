## Phase 6 — Tester, sécuriser, déployer (semaine 10)

Objectif : ton application en ligne sur ton propre nom de domaine, testée et sans faille évidente. C'est la première dépense hors Claude : environ 10 $ pour le domaine.

**Leçons**

1. **Tester avant de publier.** Lance `npm run build` sur ton ordinateur : si cette commande échoue, la mise en ligne échouera aussi. Puis suis la liste ci-dessous à la main.
2. **Faire une revue de sécurité.** Demande à Claude Code : « Fais une revue de sécurité de tout le projet selon mon `CLAUDE.md` : secrets, RLS, vérifications côté serveur, entrées utilisateur. Liste les problèmes du plus grave au moins grave, sans rien modifier. » Corrige-les un par un, avec un commit par correction. Ouvre aussi les *Advisors* de ton tableau de bord Supabase, qui signalent les tables mal protégées.
3. **Déployer.** Sur Netlify, l'adaptateur OpenNext prend en charge Next.js sans configuration : tu importes ton dépôt GitHub depuis le tableau de bord et chaque `git push` met le site à jour. [Source](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) Sur Vercel, c'est le même principe. Recopie tes variables de `.env.local` dans les réglages *Environment variables* de l'hébergeur.
4. **Comprendre le nom de domaine.** Le domaine (`tonsaas.com`) est l'adresse lisible ; le DNS est l'annuaire qui l'associe au serveur de l'hébergeur. Tu l'achètes chez un registraire, puis tu ajoutes chez lui les enregistrements DNS que l'hébergeur t'indique. Le cadenas HTTPS s'active ensuite tout seul.
5. **Les pages légales.** Ajoute une politique de confidentialité (quelles données, pourquoi, combien de temps, comment les supprimer) et des conditions d'utilisation. Si tes clients sont au Québec, informe-toi sur la Loi 25 ; au Canada, la loi fédérale sur la vie privée s'applique aussi. Claude peut rédiger un premier jet, mais ce n'est pas un avis juridique.

**Liste de tests avant la mise en ligne**

- [ ] Parcours complet : inscription, connexion, génération, historique, déconnexion.
- [ ] Deux comptes différents : aucun ne voit les données de l'autre.
- [ ] Le quota bloque la 11e génération du plan gratuit, même en rechargeant la page.
- [ ] Aucune clé secrète visible dans le navigateur (F12, onglets Sources et Réseau).
- [ ] `.env.local` n'apparaît pas dans l'historique GitHub.
- [ ] Chaque page s'affiche correctement sur un vrai téléphone.
- [ ] Une coupure réseau affiche un message d'erreur, pas une page blanche.
- [ ] `npm run build` réussit sans erreur.

**Erreurs fréquentes**

- Le site marche en local mais pas en ligne : une variable d'environnement manque chez l'hébergeur, ou une erreur TypeScript bloque la compilation ; lis le journal de déploiement.
- Un lien de connexion renvoie vers `localhost` : dans Supabase, section Authentification, remplace l'URL du site par ton adresse en ligne et ajoute-la aux URL de redirection autorisées.
- Le domaine ne répond pas : les changements DNS peuvent prendre du temps à se propager ; vérifie que les enregistrements sont exactement ceux indiqués par l'hébergeur.

**Ressources**

| Ressource | Créateur | Langue |
| --- | --- | --- |
| [Next.js sur Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) | Netlify (doc mise à jour le 4 février 2026) | Anglais |
| [Domaines sur Netlify](https://docs.netlify.com/manage/domains/get-started-with-domains) | Netlify | Anglais |
| [HTTP Observatory](https://developer.mozilla.org/en-US/observatory) — analyse gratuite de la sécurité de ton site | MDN | Anglais |
| [La sécurité d'un site Web](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Server-side/First_steps/Website_security) | MDN | Français |

**Point de contrôle**

1. Pourquoi lancer `npm run build` avant de déployer ? *Parce que c'est la même compilation que l'hébergeur ; si elle échoue chez toi, elle échouera en ligne.*
2. Où mets-tu ta clé API Claude en production ? *Dans les variables d'environnement de l'hébergeur, jamais dans le code.*
3. À quoi sert le DNS ? *À relier ton nom de domaine à l'adresse du serveur qui héberge ton site.*

**Livrable** : ton SaaS répond sur `https://tonsaas.com`, toutes les cases de la liste de tests sont cochées.
