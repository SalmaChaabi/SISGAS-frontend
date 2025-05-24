// export async function getChatHistory(userId: string) {
//   const res = await fetch(`http://localhost:5001/chat/getChatHistory/${userId}`);

//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(err.error);
//   }

//   return res.json();
// }
import { ChatMessage } from './type';

export async function fetchChatHistory(userId: string = '1'): Promise<ChatMessage[]> {
  const response = await fetch(`http://localhost:5001/chat/getChatHistory/${userId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors du chargement de l’historique');
  }

  return response.json();
}
