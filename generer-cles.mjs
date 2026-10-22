// Génère de nouvelles clés d'accès.
// Utilisation :  npm run cles -- 10        (10 clés, par défaut 10)
//
// Le script affiche :
//  1. les clés en clair, à donner aux élèves (une clé = un compte) ;
//  2. le SQL à coller dans Supabase > SQL Editor pour les activer.
// La base ne reçoit que l'empreinte SHA-256 des clés.

import { createHash, randomInt } from "node:crypto";

// Alphabet sans caractères ambigus (pas de 0/O, 1/I/L).
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const count = Math.max(1, Math.min(500, Number(process.argv[2]) || 10));

function makeKey() {
  const groups = [];
  for (let g = 0; g < 5; g++) {
    let s = "";
    for (let i = 0; i < 4; i++) s += ALPHABET[randomInt(ALPHABET.length)];
    groups.push(s);
  }
  return `FORM-${groups.join("-")}`;
}

// Même normalisation que lib/keys.ts : lettres et chiffres en majuscules.
const normalize = (k) => k.toUpperCase().replace(/[^A-Z0-9]/g, "");
const hash = (k) => createHash("sha256").update(normalize(k)).digest("hex");

const keys = Array.from({ length: count }, makeKey);
const stamp = new Date().toISOString().slice(0, 10);

console.log("=== CLÉS À DONNER AUX ÉLÈVES (garde ce fichier privé) ===");
keys.forEach((k, i) => console.log(`${String(i + 1).padStart(2, "0")}. ${k}`));
console.log("\n=== SQL À COLLER DANS SUPABASE > SQL EDITOR ===");
console.log("insert into public.access_keys (key_hash, label) values");
console.log(
  keys
    .map((k, i) => `  ('${hash(k)}', 'Clé ${String(i + 1).padStart(2, "0")} — ${stamp}')`)
    .join(",\n") + ";"
);
