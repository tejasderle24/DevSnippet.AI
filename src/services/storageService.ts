import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppSettings } from "@/types/models";

export const STORAGE_KEYS = {
  theme: "app_theme",
  settings: "app_settings",
  onboarding: "app_onboarding_completed",
  lastOpenedSnippet: "app_last_opened_snippet_id",
  preferredLanguage: "app_preferred_language",
} as const;

const DEFAULT_SETTINGS: AppSettings = {
  theme: "dark",
  fontSize: 14,
  preferredLanguage: "ALL LANGUAGES",
  autoBackup: false,
};

export async function setItem<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getItem<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function clearStorage(): Promise<void> {
  await AsyncStorage.clear();
}

export async function getSettings(): Promise<AppSettings> {
  return getItem(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await setItem(STORAGE_KEYS.settings, settings);
  await setItem(STORAGE_KEYS.theme, settings.theme);
  await setItem(STORAGE_KEYS.preferredLanguage, settings.preferredLanguage);
}
