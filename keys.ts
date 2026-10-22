// Outils pour les clés d'accès.
// La base de données ne stocke jamais les clés en clair, seulement leur
// empreinte SHA-256 : même si quelqu'un lisait la table, il ne pourrait pas
// retrouver les clés.
import { createHash } from "node:crypto";

// Garde seulement lettres et chiffres, en majuscules :
// "form-ab12 cd34" et "FORM-AB12-CD34" donnent la même chose.
export function normalizeKey(input: string) {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function hashKey(input: string) {
  return createHash("sha256").update(normalizeKey(input)).digest("hex");
}
