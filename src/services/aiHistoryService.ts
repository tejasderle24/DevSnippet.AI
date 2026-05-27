import { getAll, runQuery } from "@/lib/db";
import { createId, nowIso } from "@/lib/utils";
import type { AIHistoryEntry, AIHistoryType } from "@/types/models";

export async function createAIHistory(
  snippetId: string,
  type: AIHistoryType,
  response: string
): Promise<AIHistoryEntry> {
  const entry: AIHistoryEntry = {
    id: createId(),
    snippetId,
    type,
    response,
    createdAt: nowIso(),
  };

  await runQuery(
    `INSERT INTO ai_history (id, snippetId, type, response, createdAt)
     VALUES ($id, $snippetId, $type, $response, $createdAt)`,
    {
      $id: entry.id,
      $snippetId: entry.snippetId,
      $type: entry.type,
      $response: entry.response,
      $createdAt: entry.createdAt,
    }
  );

  return entry;
}

export async function getAIHistoryBySnippet(snippetId: string): Promise<AIHistoryEntry[]> {
  return getAll<AIHistoryEntry>(
    "SELECT * FROM ai_history WHERE snippetId = $snippetId ORDER BY createdAt DESC",
    { $snippetId: snippetId }
  );
}
