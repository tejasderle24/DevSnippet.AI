export type Snippet = {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SnippetInsertInput = {
  title: string;
  code: string;
  language: string;
  tags: string[];
  isFavorite?: boolean;
};

export type SnippetUpdateInput = Partial<Omit<SnippetInsertInput, "isFavorite">> & {
  isFavorite?: boolean;
};

export type AIHistoryType = "explain" | "summarize" | "improve";

export type AIHistoryEntry = {
  id: string;
  snippetId: string;
  type: AIHistoryType;
  response: string;
  createdAt: string;
};

export type ManagedFile = {
  id: string;
  name: string;
  path: string;
  type: "txt" | "js" | "json";
  createdAt: string;
};

export type AppSettings = {
  theme: "light" | "dark";
  fontSize: number;
  preferredLanguage: string;
  autoBackup: boolean;
};
