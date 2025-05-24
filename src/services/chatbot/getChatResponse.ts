
import { ChatMessage } from './type';

export async function sendChatMessage(message: string, userId: string = '1'): Promise<string> {
  const response = await fetch(`http://localhost:5001/chat/getChatResponse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question: message, userId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de l’envoi du message');
  }

  const data = await response.json();
  return data.response;
}

