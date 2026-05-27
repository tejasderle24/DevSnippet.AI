import { Directory, File, Paths } from "expo-file-system";
import * as FileSystemLegacy from "expo-file-system/legacy";
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import type { Snippet } from "@/types/models";

const EXPORT_FOLDER = new Directory(Paths.document, "snippet-exports");

function ensureExportDir(): void {
  if (!EXPORT_FOLDER.exists) {
    EXPORT_FOLDER.create({ intermediates: true });
  }
}

function sanitizeName(name: string): string {
  return name.replace(/[^a-z0-9-_]/gi, "_").toLowerCase();
}

export async function exportSnippetToTxt(snippet: Snippet): Promise<{ name: string; uri: string }> {
  ensureExportDir();
  const name = `${sanitizeName(snippet.title)}.txt`;
  const file = new File(EXPORT_FOLDER, name);
  file.write(`Title: ${snippet.title}\nLanguage: ${snippet.language}\nTags: ${snippet.tags.join(", ")}\n\n${snippet.code}`);
  return { name, uri: file.uri };
}

export async function exportSnippetToJs(snippet: Snippet): Promise<{ name: string; uri: string }> {
  ensureExportDir();
  const name = `${sanitizeName(snippet.title)}.js`;
  const file = new File(EXPORT_FOLDER, name);
  file.write(snippet.code);
  return { name, uri: file.uri };
}

export async function exportSnippetToJson(snippet: Snippet): Promise<{ name: string; uri: string }> {
  ensureExportDir();
  const name = `${sanitizeName(snippet.title)}.json`;
  const file = new File(EXPORT_FOLDER, name);
  file.write(JSON.stringify(snippet, null, 2));
  return { name, uri: file.uri };
}

export async function shareFile(uri: string): Promise<void> {
  const available = await Sharing.isAvailableAsync();
  if (!available) throw new Error("File sharing is not available on this device.");
  await Sharing.shareAsync(uri);
}

export async function importSnippetFromFile(): Promise<Pick<Snippet, "title" | "code" | "language" | "tags"> | null> {
  const result = await DocumentPicker.getDocumentAsync({
    multiple: false,
    copyToCacheDirectory: true,
    type: ["text/plain", "application/json", "text/javascript", "application/javascript"],
  });

  if (result.canceled) return null;
  const asset = result.assets[0];
  const raw = await FileSystemLegacy.readAsStringAsync(asset.uri);

  if (asset.name.toLowerCase().endsWith(".json")) {
    const parsed = JSON.parse(raw);
    return {
      title: parsed.title ?? asset.name.replace(/\.[^.]+$/, ""),
      code: parsed.code ?? "",
      language: parsed.language ?? "JavaScript",
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    };
  }

  return {
    title: asset.name.replace(/\.[^.]+$/, ""),
    code: raw,
    language: asset.name.toLowerCase().endsWith(".py")
      ? "Python"
      : asset.name.toLowerCase().endsWith(".ts")
      ? "TypeScript"
      : "JavaScript",
    tags: [],
  };
}

export async function deleteExportedFile(uri: string): Promise<void> {
  await FileSystemLegacy.deleteAsync(uri, { idempotent: true });
}
