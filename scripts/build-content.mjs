// Transforme les fichiers Markdown du dossier content/ en un module TypeScript
// (lib/content.generated.ts) que l'application importe.
// Lancé automatiquement avant "next dev" et "next build" (voir package.json).
//
// Pour ajouter ou modifier une leçon : édite un fichier .md dans content/.
// Le nombre au début du nom de fichier fixe l'ordre (00-, 01-, 10-...).
// La première ligne doit être un titre "## ...".

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "content");
const outFile = join(root, "lib", "content.generated.ts");

const files = readdirSync(contentDir)
  .filter((f) => /^\d+-.+\.md$/.test(f))
  .sort();

const youtubeLink =
  /\[([^\]]+)\]\(https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})\)/g;

const lessons = files.map((file, index) => {
  const raw = readFileSync(join(contentDir, file), "utf8").replace(/\r\n/g, "\n");
  const lines = raw.split("\n");
  const first = lines.findIndex((l) => l.trim() !== "");
  if (first === -1 || !lines[first].startsWith("## ")) {
    throw new Error(`${file} : la première ligne doit être un titre "## ..."`);
  }
  const title = lines[first].slice(3).trim();
  const body = lines.slice(first + 1).join("\n").trim() + "\n";
  const slug = file.replace(/^\d+-/, "").replace(/\.md$/, "");

  const videos = [];
  const seen = new Set();
  for (const match of body.matchAll(youtubeLink)) {
    const [, videoTitle, id] = match;
    if (!seen.has(id)) {
      seen.add(id);
      videos.push({ id, title: videoTitle });
    }
  }

  return { slug, order: index + 1, title, body, videos };
});

const slugs = new Set();
for (const l of lessons) {
  if (slugs.has(l.slug)) throw new Error(`Slug en double : ${l.slug}`);
  slugs.add(l.slug);
}

const output = `// Fichier généré par scripts/build-content.mjs — ne pas modifier à la main.
// Modifie plutôt les fichiers du dossier content/.

export type Video = { id: string; title: string };
export type Lesson = {
  slug: string;
  order: number;
  title: string;
  body: string;
  videos: Video[];
};

export const lessons: Lesson[] = ${JSON.stringify(lessons, null, 2)};
`;

writeFileSync(outFile, output);
console.log(`Contenu généré : ${lessons.length} leçons, ${lessons.reduce((n, l) => n + l.videos.length, 0)} vidéos.`);
