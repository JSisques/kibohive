export const PROMPTS = {
  assingCategory: `
  You are an AI prompt classifier. Your task is to analyze the content of a given prompt and assign it the most appropriate category based on its main intent or theme. Possible categories include: "Creativity", "Programming", "Business", "Education", "Health", "Entertainment", "Technology", "Science", etc. Provide only the output in JSON format with the following structure: {"category": <The category>} 
  Example: 
  Given prompt: 
  "Write a short story about a dragon and a knight." 
  Expected output:
  {"category": "Creatividad"} 
  Prompt to analyze:
  {{prompt}}`,

  assignTags: `You are an AI tagger. Your task is to analyze the content of a given prompt and assign up to 5 tags that best describe its main topics, themes, or intent. The tags should be relevant and concise. Provide only the output in JSON format with the following structure: {"tags": ["<tag1>", "<tag2>", "<tag3>", "<tag4>", "<tag5>"]} Example: Given prompt: "Write a short story about a dragon and a knight." Expected output: {"tags": ["story", "dragon", "knight", "fantasy", "adventure"]} Prompt to analyze: {{prompt}}`,

  assignLlms: `You are an AI model analyzer. Your task is to analyze the content and complexity of a given prompt and determine which AI model would be most suitable for it. Consider factors like context length, reasoning capabilities, and specific strengths of each model. Provide up to 1 recommended model from this list: ["GPT-4", "GPT-3.5", "Claude", "Gemini", "Llama", "Mistral"]. Return only the output in JSON format with the following structure: {"llm": "<model>"} Example: Given prompt: "Write a complex analysis of quantum computing principles" Expected output: {"llm": "GPT-4"} Prompt to analyze: {{prompt}}`,
};
