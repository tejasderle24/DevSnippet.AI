import type { Snippet } from "@/types/models";
import { createAIHistory } from "@/services/aiHistoryService";
import { sendAIRequest } from "@/services/apiClient";
import { buildExplainPrompt, buildImprovePrompt, buildSummaryPrompt } from "@/services/promptBuilders";

export async function explainCode(snippet: Snippet): Promise<string> {
  const response = await sendAIRequest(buildExplainPrompt(snippet));
  await createAIHistory(snippet.id, "explain", response);
  return response;
}

export async function summarizeCode(snippet: Snippet): Promise<string> {
  const response = await sendAIRequest(buildSummaryPrompt(snippet));
  await createAIHistory(snippet.id, "summarize", response);
  return response;
}

export async function improveCode(snippet: Snippet): Promise<string> {
  const response = await sendAIRequest(buildImprovePrompt(snippet));
  await createAIHistory(snippet.id, "improve", response);
  return response;
}
