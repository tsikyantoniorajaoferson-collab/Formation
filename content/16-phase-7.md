## Phase 7 — Premiers clients, paiements et suite (semaines 11–12)

Objectif : 10 utilisateurs actifs, tes premiers paiements, et une routine de maintenance qui te prend moins d'une heure par semaine.

**Leçons**

1. **Trouver les 10 premiers utilisateurs à la main.** Écris personnellement à chaque inscrit de ta page d'attente. Contacte 50 entreprises de ton segment avec un message court qui parle de *leur* problème. Utilise ton propre outil pour tes publications TikTok et Instagram : c'est ta meilleure démonstration.
2. **Écouter.** Un appel de 15 minutes par semaine avec 3 utilisateurs. Demande : « Qu'est-ce qui t'a fait revenir ? Qu'est-ce qui a failli te faire partir ? »
3. **Faire payer.** Fixe un prix testé en entretien (par exemple entre 9 $ et 15 $ par mois, à valider). Demande à Claude Code d'ajouter Stripe Checkout et un webhook dont la signature est vérifiée, qui écrit dans la table `abonnements`. Teste tout en mode test de Stripe avant le mode réel.
4. **Connaître tes coûts par client** (tableau ci-dessous).
5. **Entretenir l'application** chaque semaine (liste ci-dessous).

**Ce que te coûte un client à 12 $ par mois (calcul indicatif)**

| Poste | Calcul | Coût |
| --- | --- | --- |
| Frais Stripe (carte canadienne) | 2,9 % × 12 $ + 0,30 $ | environ 0,65 $ |
| API Claude Haiku 5.5 | 100 générations × environ 0,0007 $ | environ 0,07 $ |
| Supabase et hébergement | Plans gratuits tant que tu restes sous leurs limites | 0 $ |
| **Marge** | | **environ 11,28 $** |

Quand passer à un plan payant : Supabase Pro (25 $/mois) quand ta base approche 500 Mo, que la pause d'inactivité gêne tes clients ou que tu veux des sauvegardes automatiques ; l'hébergeur payant si tu dépasses les limites du plan gratuit ou si tu encaisses de l'argent sur Vercel. Pas avant que tes revenus couvrent la dépense.

**Tes 4 chiffres à suivre chaque semaine**

| Indicateur | Définition | Objectif semaine 12 |
| --- | --- | --- |
| Inscrits | Comptes créés | 30 |
| Activés | Comptes ayant fait au moins une génération | 15 |
| Actifs | Comptes ayant généré cette semaine | 10 |
| Payants | Abonnements Stripe actifs | 3 |

Ces objectifs sont des repères pour te situer, pas des statistiques du marché.

**Routine de maintenance hebdomadaire**

- [ ] Exporter la base Supabase (le plan gratuit n'a pas de sauvegarde automatique).
- [ ] Vérifier la consommation de l'API Claude et la limite de dépenses.
- [ ] Lire les erreurs du journal de l'hébergeur.
- [ ] Mettre à jour Next.js une fois par mois avec `npx next upgrade`, puis refaire la liste de tests de la phase 6. [Source](https://nextjs.org/docs/app/getting-started/installation)
- [ ] Annuler Claude Pro les mois où tu ne développes pas.

**Prochaines améliorations** (seulement si tes utilisateurs les demandent) : calendrier mensuel de publications, ton de marque mémorisé, export vers un outil de planification, plan équipe pour les agences. Quand tu as des revenus, tu peux connecter Stripe à TrustMRR pour afficher des chiffres vérifiés.

**Livrable final** : 10 utilisateurs actifs, au moins un paiement réel, et ton journal de bord des 12 semaines.
