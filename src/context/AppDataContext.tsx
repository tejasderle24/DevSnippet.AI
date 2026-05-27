import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { initializeDatabase } from "@/lib/db";
import type { AppSettings, ManagedFile, Snippet, SnippetInsertInput, SnippetUpdateInput } from "@/types/models";
import * as snippetService from "@/services/snippetService";
import * as fileMetaService from "@/services/fileMetadataService";
import { getSettings, saveSettings, STORAGE_KEYS, setItem } from "@/services/storageService";

type AppDataContextValue = {
  snippets: Snippet[];
  files: ManagedFile[];
  settings: AppSettings;
  loading: boolean;
  aiLoading: boolean;
  refresh: () => Promise<void>;
  createSnippet: (input: SnippetInsertInput) => Promise<void>;
  updateSnippet: (id: string, updates: SnippetUpdateInput) => Promise<void>;
  deleteSnippet: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  saveManagedFile: (name: string, path: string, type: ManagedFile["type"]) => Promise<void>;
  removeManagedFile: (id: string) => Promise<void>;
  updateSettings: (partial: Partial<AppSettings>) => Promise<void>;
  setAILoading: (loading: boolean) => void;
};

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

const defaultSettings: AppSettings = {
  theme: "dark",
  fontSize: 14,
  preferredLanguage: "ALL LANGUAGES",
  autoBackup: false,
};

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [files, setFiles] = useState<ManagedFile[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAILoading] = useState(false);

  const refresh = useCallback(async () => {
    const [allSnippets, allFiles, storedSettings] = await Promise.all([
      snippetService.getAllSnippets(),
      fileMetaService.getAllManagedFiles(),
      getSettings(),
    ]);
    setSnippets(allSnippets);
    setFiles(allFiles);
    setSettings(storedSettings);
  }, []);

  useEffect(() => {
    (async () => {
      await initializeDatabase();
      await refresh();
      setLoading(false);
    })();
  }, [refresh]);

  const handleCreateSnippet = async (input: SnippetInsertInput) => {
    const created = await snippetService.createSnippet(input);
    setSnippets((prev) => [created, ...prev]);
  };

  const handleUpdateSnippet = async (id: string, updates: SnippetUpdateInput) => {
    const updated = await snippetService.updateSnippet(id, updates);
    if (!updated) return;
    setSnippets((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  const handleDeleteSnippet = async (id: string) => {
    await snippetService.deleteSnippet(id);
    setSnippets((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleFavorite = async (id: string) => {
    const updated = await snippetService.toggleFavorite(id);
    if (!updated) return;
    setSnippets((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  const handleSaveManagedFile = async (name: string, path: string, type: ManagedFile["type"]) => {
    const created = await fileMetaService.saveFileMetadata(name, path, type);
    setFiles((prev) => [created, ...prev]);
  };

  const handleRemoveManagedFile = async (id: string) => {
    await fileMetaService.deleteFileMetadata(id);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpdateSettings = async (partial: Partial<AppSettings>) => {
    const next = { ...settings, ...partial };
    setSettings(next);
    await saveSettings(next);
  };

  const value = useMemo<AppDataContextValue>(
    () => ({
      snippets,
      files,
      settings,
      loading,
      aiLoading,
      refresh,
      createSnippet: handleCreateSnippet,
      updateSnippet: handleUpdateSnippet,
      deleteSnippet: handleDeleteSnippet,
      toggleFavorite: handleToggleFavorite,
      saveManagedFile: handleSaveManagedFile,
      removeManagedFile: handleRemoveManagedFile,
      updateSettings: handleUpdateSettings,
      setAILoading,
    }),
    [snippets, files, settings, loading, aiLoading, refresh]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used inside AppDataProvider");
  return ctx;
}

export async function setLastOpenedSnippet(id: string): Promise<void> {
  await setItem(STORAGE_KEYS.lastOpenedSnippet, id);
}
