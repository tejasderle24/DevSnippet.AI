import { getApiKey } from "@/services/secureStoreService";

const DEFAULT_MODEL = "gpt-4.1-mini";
const API_URL = process.env.EXPO_PUBLIC_AI_API_URL ?? "https://api.openai.com/v1/responses";

export async function sendAIRequest(prompt: string): Promise<string> {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("Missing API key. Add it in SecureStore-backed settings.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.EXPO_PUBLIC_AI_MODEL ?? DEFAULT_MODEL,
      input: prompt,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`AI request failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data?.output_text ?? "No response text returned by AI API.";
}
