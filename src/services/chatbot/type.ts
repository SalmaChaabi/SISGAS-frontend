export interface ChatMessage {
  id?: string; // utilisé uniquement pour les messages provenant du backend
  sender: 'user' | 'chatbot';
  message: string;
  created_at: string;
}

