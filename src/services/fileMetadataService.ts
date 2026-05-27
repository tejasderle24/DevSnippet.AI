import { getAll, runQuery } from "@/lib/db";
import { createId, nowIso } from "@/lib/utils";
import type { ManagedFile } from "@/types/models";

export async function saveFileMetadata(
  name: string,
  path: string,
  type: ManagedFile["type"]
): Promise<ManagedFile> {
  const file: ManagedFile = {
    id: createId(),
    name,
    path,
    type,
    createdAt: nowIso(),
  };

  await runQuery(
    "INSERT INTO files (id, name, path, type, createdAt) VALUES ($id, $name, $path, $type, $createdAt)",
    {
      $id: file.id,
      $name: file.name,
      $path: file.path,
      $type: file.type,
      $createdAt: file.createdAt,
    }
  );

  return file;
}

export async function getAllManagedFiles(): Promise<ManagedFile[]> {
  return getAll<ManagedFile>("SELECT * FROM files ORDER BY createdAt DESC");
}

export async function deleteFileMetadata(id: string): Promise<void> {
  await runQuery("DELETE FROM files WHERE id = $id", { $id: id });
}
