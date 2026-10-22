## Phase 3 — Architecture d'un SaaS (semaines 4–5)

Objectif : savoir dessiner ton application sur papier avant de la coder : qui affiche, qui calcule, où sont stockées les données, et qui a le droit de voir quoi. C'est la phase qui t'évite 90 % des failles de sécurité.

**Le schéma en une phrase** : le **navigateur** (frontend) envoie ses demandes au **serveur Next.js** (backend), qui garde les clés secrètes et parle à **Supabase** (comptes + base de données), à l'**API Claude** (génération) et à **Stripe** (paiements). Le navigateur lit aussi directement ses propres données dans Supabase, d'où l'importance de la RLS.

**Leçons**

1. **Frontend et backend.** Le *frontend* est ce qui s'affiche dans le navigateur ; tout le monde peut lire son code. Le *backend* tourne sur un serveur ; c'est là que vivent les secrets et les vérifications. Avec Next.js, les deux sont dans le même projet : les pages (frontend) et les *routes API* (backend).
2. **Les API.** Une API est un guichet : on envoie une demande dans un format précis, on reçoit une réponse (souvent en JSON). Ton SaaS appellera l'API Claude pour générer les légendes, et Stripe pour les paiements.
3. **La base de données.** Des tableaux (*tables*) avec des lignes et des colonnes, comme un tableur, mais interrogeables par le code. Supabase fournit une base PostgreSQL.
4. **L'authentification.** Vérifier *qui* est l'utilisateur (connexion par e-mail et mot de passe, ou lien magique). Ne code jamais toi-même la gestion des mots de passe : Supabase Auth le fait.
5. **L'autorisation et la RLS.** Vérifier *ce qu'il a le droit de faire*. La *Row Level Security* (sécurité au niveau des lignes) est une règle dans la base : « chaque utilisateur ne voit que ses lignes ». Selon la documentation Supabase, une table exposée sans RLS est lisible et modifiable par n'importe quel rôle qui y a accès : active-la sur **chaque** table. [Source](https://supabase.com/docs/guides/database/postgres/row-level-security)
6. **Les variables d'environnement.** Les clés secrètes vont dans un fichier `.env.local`, jamais dans le code, jamais sur GitHub (le fichier est listé dans `.gitignore`). Dans Next.js, toute variable qui commence par `NEXT_PUBLIC_` est visible dans le navigateur : n'y mets jamais un secret.

**Le schéma de base de données de ton SaaS (version 1)**

| Table | Colonnes | Qui peut lire | Qui peut écrire |
| --- | --- | --- | --- |
| `profiles` | `id` (= identifiant du compte), `nom_entreprise`, `secteur`, `ton_de_marque`, `created_at` | Le propriétaire seulement | Le propriétaire seulement |
| `generations` | `id`, `user_id`, `type` (idée, légende, script), `plateforme` (Instagram, TikTok), `demande`, `resultat`, `created_at` | Le propriétaire seulement | Le serveur, après vérification du quota |
| `abonnements` (phase 7) | `user_id`, `stripe_customer_id`, `statut`, `fin_periode` | Le propriétaire seulement | Uniquement le serveur, via le webhook Stripe |

La règle RLS type, à appliquer sur chaque table (exemple tiré de la documentation Supabase) :

```sql
alter table public.generations enable row level security;

create policy "Chacun voit ses générations"
on public.generations for select
to authenticated
using ( (select auth.uid()) = user_id );
```

**Liste de sécurité à recopier dans ton `CLAUDE.md`**

- [ ] Aucune clé secrète (API Claude, clé secrète Supabase, clé Stripe) dans le frontend ni sur GitHub.
- [ ] L'API Claude est appelée uniquement depuis une route API côté serveur.
- [ ] La RLS est activée sur chaque table, avec une règle par opération (lecture, ajout, modification, suppression).
- [ ] Le serveur vérifie l'utilisateur connecté et son quota avant chaque génération ; un bouton caché ne protège rien.
- [ ] Les entrées sont limitées en longueur (par exemple 500 caractères) pour éviter les abus et les coûts.
- [ ] Le statut d'abonnement n'est jamais modifiable par l'utilisateur ; seul le webhook Stripe, dont la signature est vérifiée, l'écrit.
- [ ] Le plan gratuit de Supabase n'inclut pas de sauvegardes automatiques : exporte la base chaque semaine. [Source](https://supabase.com/pricing)

**Ressources**

| Leçon | Ressource | Créateur | Publiée | Langue |
| --- | --- | --- | --- | --- |
| 1–2 | [La relation Client-Serveur](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview) | MDN | Doc officielle | Français |
| 3 | [Cours complet débutant supabase (l'alternative open source à firebase)](https://www.youtube.com/watch?v=6X5gAwpTfek) | RAUCHE ACHO | 15 mai 2025 | Français |
| 4–5 | [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) | Supabase | Doc officielle, vue le 20 octobre 2026 | Anglais |
| 5–6 | [La sécurité d'un site Web](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Server-side/First_steps/Website_security) | MDN | Doc officielle | Français |

**Exercice et livrable**

Sur papier ou avec Claude Design (gratuit), dessine les 4 écrans de ton MVP (accueil, connexion, générateur, historique) et le schéma ci-dessus adapté à ton idée. Puis demande à Claude (chat) : « Voici mon schéma et ma liste de sécurité. Joue le rôle d'un pirate : comment pourrais-tu lire les données d'un autre utilisateur ? » Corrige chaque faille trouvée.

**Point de contrôle**

1. Pourquoi l'appel à l'API Claude doit-il partir du serveur ? *Parce qu'il utilise une clé secrète ; dans le navigateur, n'importe qui pourrait la lire et dépenser ton crédit.*
2. Que se passe-t-il si tu oublies la RLS sur une table ? *N'importe qui peut lire ou modifier toutes ses lignes.*
3. Quelle différence entre authentification et autorisation ? *L'une vérifie qui tu es, l'autre ce que tu as le droit de faire.*
