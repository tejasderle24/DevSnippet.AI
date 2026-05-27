import type { Snippet } from "@/types/models";

export const buildExplainPrompt = (snippet: Snippet) =>
  `Explain this code snippet in clear steps.\nTitle: ${snippet.title}\nLanguage: ${snippet.language}\nCode:\n${snippet.code}`;

export const buildSummaryPrompt = (snippet: Snippet) =>
  `Summarize this code snippet in 5 bullet points.\nTitle: ${snippet.title}\nLanguage: ${snippet.language}\nCode:\n${snippet.code}`;

export const buildImprovePrompt = (snippet: Snippet) =>
  `Suggest practical improvements for this snippet. Include performance, readability, and reliability.\nTitle: ${snippet.title}\nLanguage: ${snippet.language}\nCode:\n${snippet.code}`;
