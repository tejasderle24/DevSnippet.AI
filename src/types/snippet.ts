export interface Snippet {
  id: number;
  title: string;
  code: string;
  language: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SnippetInput {
  title: string;
  code: string;
  language: string;
  tags: string[];
  isFavorite?: boolean;
}

