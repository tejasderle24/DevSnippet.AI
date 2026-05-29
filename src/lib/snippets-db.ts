import * as SQLite from "expo-sqlite";
import type { Snippet, SnippetInput } from "@/types/snippet";

const DB_NAME = "dev-snippets.db";
const TABLE_NAME = "snippets";

type SnippetRow = {
  id: number;
  title: string;
  code: string;
  language: string;
  tags: string;
  is_favorite: number;
  created_at: string;
  updated_at: string;
};

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;
let initPromise: Promise<void> | null = null;

async function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME);
  }
  return dbPromise;
}

export async function initSnippetDb() {
  if (!initPromise) {
    initPromise = (async () => {
      const db = await getDb();
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          code TEXT NOT NULL,
          language TEXT NOT NULL,
          tags TEXT NOT NULL DEFAULT '[]',
          is_favorite INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
      `);
    })();
  }
  await initPromise;
}

function mapSnippet(row: SnippetRow): Snippet {
  return {
    id: row.id,
    title: row.title,
    code: row.code,
    language: row.language,
    tags: JSON.parse(row.tags || "[]"),
    isFavorite: Boolean(row.is_favorite),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createSnippet(input: SnippetInput): Promise<Snippet> {
  await initSnippetDb();
  const db = await getDb();
  const now = new Date().toISOString();
  const result = await db.runAsync(
    `INSERT INTO ${TABLE_NAME} (title, code, language, tags, is_favorite, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    input.title.trim(),
    input.code,
    input.language.trim(),
    JSON.stringify(input.tags),
    input.isFavorite ? 1 : 0,
    now,
    now
  );

  const snippet = await getSnippetById(result.lastInsertRowId);
  if (!snippet) {
    throw new Error("Failed to create snippet");
  }
  return snippet;
}

export async function updateSnippet(id: number, input: SnippetInput): Promise<Snippet | null> {
  await initSnippetDb();
  const db = await getDb();
  const now = new Date().toISOString();
  await db.runAsync(
    `UPDATE ${TABLE_NAME}
     SET title = ?, code = ?, language = ?, tags = ?, is_favorite = ?, updated_at = ?
     WHERE id = ?`,
    input.title.trim(),
    input.code,
    input.language.trim(),
    JSON.stringify(input.tags),
    input.isFavorite ? 1 : 0,
    now,
    id
  );
  return getSnippetById(id);
}

export async function deleteSnippet(id: number): Promise<boolean> {
  await initSnippetDb();
  const db = await getDb();
  const result = await db.runAsync(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id);
  return result.changes > 0;
}

export async function getSnippetById(id: number): Promise<Snippet | null> {
  await initSnippetDb();
  const db = await getDb();
  const row = await db.getFirstAsync<SnippetRow>(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, id);
  if (!row) return null;
  return mapSnippet(row);
}

export async function getAllSnippets(): Promise<Snippet[]> {
  await initSnippetDb();
  const db = await getDb();
  const rows = await db.getAllAsync<SnippetRow>(`SELECT * FROM ${TABLE_NAME} ORDER BY updated_at DESC`);
  return rows.map(mapSnippet);
}

export async function searchSnippets(query: string): Promise<Snippet[]> {
  await initSnippetDb();
  const db = await getDb();
  const q = query.trim();
  if (!q) return getAllSnippets();
  const like = `%${q}%`;
  const rows = await db.getAllAsync<SnippetRow>(
    `SELECT * FROM ${TABLE_NAME}
     WHERE title LIKE ? OR code LIKE ? OR language LIKE ? OR tags LIKE ?
     ORDER BY updated_at DESC`,
    like,
    like,
    like,
    like
  );
  return rows.map(mapSnippet);
}

export async function getFavoriteSnippets(): Promise<Snippet[]> {
  await initSnippetDb();
  const db = await getDb();
  const rows = await db.getAllAsync<SnippetRow>(
    `SELECT * FROM ${TABLE_NAME} WHERE is_favorite = 1 ORDER BY updated_at DESC`
  );
  return rows.map(mapSnippet);
}

export async function setSnippetFavorite(id: number, isFavorite: boolean): Promise<boolean> {
  await initSnippetDb();
  const db = await getDb();
  const now = new Date().toISOString();
  const result = await db.runAsync(
    `UPDATE ${TABLE_NAME} SET is_favorite = ?, updated_at = ? WHERE id = ?`,
    isFavorite ? 1 : 0,
    now,
    id
  );
  return result.changes > 0;
}
