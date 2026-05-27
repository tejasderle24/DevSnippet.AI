import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "dev_snippets_ai.db";

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

const MIGRATIONS = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS snippets (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  code TEXT NOT NULL,
  language TEXT,
  tags TEXT,
  isFavorite INTEGER DEFAULT 0,
  createdAt TEXT,
  updatedAt TEXT
);

CREATE TABLE IF NOT EXISTS ai_history (
  id TEXT PRIMARY KEY NOT NULL,
  snippetId TEXT,
  type TEXT,
  response TEXT,
  createdAt TEXT,
  FOREIGN KEY (snippetId) REFERENCES snippets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS files (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT,
  path TEXT,
  type TEXT,
  createdAt TEXT
);

CREATE INDEX IF NOT EXISTS idx_snippets_language ON snippets(language);
CREATE INDEX IF NOT EXISTS idx_snippets_isFavorite ON snippets(isFavorite);
CREATE INDEX IF NOT EXISTS idx_snippets_createdAt ON snippets(createdAt);
`;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
}

export async function initializeDatabase(): Promise<void> {
  const db = await getDatabase();
  await db.execAsync(MIGRATIONS);
}

export async function runQuery(
  sql: string,
  params?: SQLite.SQLiteBindParams
): Promise<SQLite.SQLiteRunResult> {
  const db = await getDatabase();
  if (params !== undefined) {
    return db.runAsync(sql, params);
  }

  return db.runAsync(sql);
}

export async function getAll<T>(
  sql: string,
  params?: SQLite.SQLiteBindParams
): Promise<T[]> {
  const db = await getDatabase();
  if (params !== undefined) {
    return db.getAllAsync<T>(sql, params);
  }

  return db.getAllAsync<T>(sql);
}

export async function getFirst<T>(
  sql: string,
  params?: SQLite.SQLiteBindParams
): Promise<T | null> {
  const db = await getDatabase();
  if (params !== undefined) {
    return db.getFirstAsync<T>(sql, params);
  }

  return db.getFirstAsync<T>(sql);
}
