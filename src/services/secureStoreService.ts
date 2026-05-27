import * as SecureStore from "expo-secure-store";

const API_KEY = "ai_api_key";

export async function saveApiKey(value: string): Promise<void> {
  await SecureStore.setItemAsync(API_KEY, value);
}

export async function getApiKey(): Promise<string | null> {
  return SecureStore.getItemAsync(API_KEY);
}

export async function deleteApiKey(): Promise<void> {
  await SecureStore.deleteItemAsync(API_KEY);
}
