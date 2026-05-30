import { Directory, File, Paths } from "expo-file-system";
import { Platform } from "react-native";
import { getAllSnippets } from "@/lib/snippets-db";

export type StoredFileCategory = "image" | "code" | "doc" | "audio" | "other";

export interface StoredFileItem {
  name: string;
  uri: string;
  size: number;
  modifiedAt: number;
  extension: string;
  category: StoredFileCategory;
}

const ROOT_DIR = new Directory(Paths.document, "snippet-files");
const SCREENSHOTS_DIR = new Directory(ROOT_DIR, "screenshots");
const CODE_DIR = new Directory(ROOT_DIR, "code");
const DOWNLOADS_DIR = new Directory(ROOT_DIR, "downloads");

const TEMPLATE_DOWNLOADS = [
  { label: "JSON Placeholder", url: "https://jsonplaceholder.typicode.com/todos/1", name: "jsonplaceholder-todo.json" },
  { label: "Gitignore Template", url: "https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore", name: "node.gitignore" },
];

function normalizeFilename(name: string) {
  const cleaned = name.trim().replace(/[^a-z0-9._-]/gi, "_");
  return cleaned.length ? cleaned : "file";
}

function getExtension(name: string) {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i + 1).toLowerCase();
}

export function getCategory(name: string): StoredFileCategory {
  const ext = getExtension(name);
  if (["png", "jpg", "jpeg", "gif", "webp", "heic"].includes(ext)) return "image";
  if (["js", "ts", "tsx", "jsx", "json", "py", "go", "java", "rs", "cpp", "c", "txt", "md"].includes(ext)) return "code";
  if (["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "csv"].includes(ext)) return "doc";
  if (["mp3", "wav", "aac", "m4a", "ogg"].includes(ext)) return "audio";
  return "other";
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function ensureStorageDirs() {
  ROOT_DIR.create({ idempotent: true, intermediates: true });
  SCREENSHOTS_DIR.create({ idempotent: true, intermediates: true });
  CODE_DIR.create({ idempotent: true, intermediates: true });
  DOWNLOADS_DIR.create({ idempotent: true, intermediates: true });
}

export function getResourceTemplates() {
  return TEMPLATE_DOWNLOADS;
}

export async function listStoredFiles(): Promise<StoredFileItem[]> {
  await ensureStorageDirs();
  const all: StoredFileItem[] = [];
  const directories = [SCREENSHOTS_DIR, CODE_DIR, DOWNLOADS_DIR];

  for (const dir of directories) {
    const entries = dir.list();
    for (const entry of entries) {
      if (!(entry instanceof File)) continue;
      const info = entry.info();
      if (!info.exists) continue;
      all.push({
        name: entry.name,
        uri: entry.uri,
        size: info.size ?? 0,
        modifiedAt: info.modificationTime ?? Date.now(),
        extension: getExtension(entry.name),
        category: getCategory(entry.name),
      });
    }
  }

  return all.sort((a, b) => b.modifiedAt - a.modifiedAt);
}

export async function attachScreenshotFromPicker() {
  await ensureStorageDirs();
  if (Platform.OS !== "android") {
    throw new Error("Screenshot attachment via picker is currently available on Android only.");
  }

  const picked = await File.pickFileAsync("image/*");
  const source = new File(picked);
  const targetName = `${Date.now()}-${normalizeFilename(source.name)}`;
  const target = new File(SCREENSHOTS_DIR, targetName);
  source.copy(target);
  return target.uri;
}

function extensionFromLanguage(language: string) {
  const key = language.trim().toLowerCase();
  if (key.includes("typescript")) return "ts";
  if (key.includes("javascript")) return "js";
  if (key.includes("python")) return "py";
  if (key.includes("go")) return "go";
  if (key.includes("react")) return "tsx";
  if (key.includes("node")) return "js";
  return "txt";
}

export async function saveSnippetsAsLocalCodeFiles() {
  await ensureStorageDirs();
  const snippets = await getAllSnippets();
  let saved = 0;

  for (const snippet of snippets) {
    const ext = extensionFromLanguage(snippet.language);
    const safeTitle = normalizeFilename(snippet.title.toLowerCase());
    const file = new File(CODE_DIR, `${safeTitle}-${snippet.id}.${ext}`);
    file.create({ idempotent: true, overwrite: true, intermediates: true });
    file.write(snippet.code);
    saved += 1;
  }

  return saved;
}

export async function downloadTemplateResource(url: string, suggestedName?: string) {
  await ensureStorageDirs();
  const name = normalizeFilename(suggestedName || `resource-${Date.now()}.txt`);
  const target = new File(DOWNLOADS_DIR, name);
  await File.downloadFileAsync(url, target, { idempotent: true });
  return target.uri;
}

export async function deleteStoredFile(uri: string) {
  const file = new File(uri);
  file.delete();
}
