import * as SecureStore from "expo-secure-store";

export const API_KEY_STORAGE_KEY = "openai_api_key";

export const saveApiKey = async (apiKey: string) => {
  await SecureStore.setItemAsync(API_KEY_STORAGE_KEY, apiKey.trim());
};

export const getApiKey = async () => {
  return SecureStore.getItemAsync(API_KEY_STORAGE_KEY);
};

export const deleteApiKey = async () => {
  await SecureStore.deleteItemAsync(API_KEY_STORAGE_KEY);
};
