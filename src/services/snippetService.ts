import { getAll, getFirst, runQuery } from "@/lib/db";
import { createId, nowIso, parseJsonArray } from "@/lib/utils";
import type { Snippet, SnippetInsertInput, SnippetUpdateInput } from "@/types/models";

type SnippetRow = {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string;
  isFavorite: number;
  createdAt: string;
  updatedAt: string;
};

const toSnippet = (row: SnippetRow): Snippet => ({
  id: row.id,
  title: row.title,
  code: row.code,
  language: row.language,
  tags: parseJsonArray(row.tags),
  isFavorite: row.isFavorite === 1,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

export async function createSnippet(input: SnippetInsertInput): Promise<Snippet> {
  const id = createId();
  const createdAt = nowIso();
  const updatedAt = createdAt;
  await runQuery(
    `INSERT INTO snippets (id, title, code, language, tags, isFavorite, createdAt, updatedAt)
     VALUES ($id, $title, $code, $language, $tags, $isFavorite, $createdAt, $updatedAt)`,
    {
      $id: id,
      $title: input.title,
      $code: input.code,
      $language: input.language,
      $tags: JSON.stringify(input.tags),
      $isFavorite: input.isFavorite ? 1 : 0,
      $createdAt: createdAt,
      $updatedAt: updatedAt,
    }
  );
  return (await getSnippetById(id)) as Snippet;
}

export async function updateSnippet(id: string, updates: SnippetUpdateInput): Promise<Snippet | null> {
  const existing = await getSnippetById(id);
  if (!existing) return null;
  const merged: Snippet = {
    ...existing,
    ...updates,
    updatedAt: nowIso(),
    tags: updates.tags ?? existing.tags,
  };
  await runQuery(
    `UPDATE snippets
     SET title=$title, code=$code, language=$language, tags=$tags, isFavorite=$isFavorite, updatedAt=$updatedAt
     WHERE id=$id`,
    {
      $id: id,
      $title: merged.title,
      $code: merged.code,
      $language: merged.language,
      $tags: JSON.stringify(merged.tags),
      $isFavorite: merged.isFavorite ? 1 : 0,
      $updatedAt: merged.updatedAt,
    }
  );
  return getSnippetById(id);
}

export async function deleteSnippet(id: string): Promise<void> {
  await runQuery("DELETE FROM snippets WHERE id = $id", { $id: id });
}

export async function getSnippetById(id: string): Promise<Snippet | null> {
  const row = await getFirst<SnippetRow>("SELECT * FROM snippets WHERE id = $id LIMIT 1", { $id: id });
  return row ? toSnippet(row) : null;
}

export async function getAllSnippets(): Promise<Snippet[]> {
  const rows = await getAll<SnippetRow>("SELECT * FROM snippets ORDER BY updatedAt DESC");
  return rows.map(toSnippet);
}

export async function searchSnippets(query: string): Promise<Snippet[]> {
  const like = `%${query}%`;
  const rows = await getAll<SnippetRow>(
    `SELECT * FROM snippets
     WHERE title LIKE $query OR code LIKE $query OR language LIKE $query OR tags LIKE $query
     ORDER BY updatedAt DESC`,
    { $query: like }
  );
  return rows.map(toSnippet);
}

export async function toggleFavorite(id: string): Promise<Snippet | null> {
  const current = await getSnippetById(id);
  if (!current) return null;
  return updateSnippet(id, { isFavorite: !current.isFavorite });
}

export async function filterByLanguage(language: string): Promise<Snippet[]> {
  if (!language || language.toUpperCase() === "ALL LANGUAGES") {
    return getAllSnippets();
  }
  const rows = await getAll<SnippetRow>(
    "SELECT * FROM snippets WHERE LOWER(language) = LOWER($language) ORDER BY updatedAt DESC",
    { $language: language }
  );
  return rows.map(toSnippet);
}
