
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatbotRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatbotResponse {
  success: boolean;
  reply?: string;
  error?: string;
}
