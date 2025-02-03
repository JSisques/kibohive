export interface IAPromptAnalysis {
  category: string;
  tags: string[];
  llm: string;
}

export interface IAResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
