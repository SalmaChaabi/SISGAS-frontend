import { NotificationType } from './types';

export async function getNotificationsByUser(userId: string): Promise<NotificationType[]> {
    try {
      const response = await fetch(`http://localhost:5001/notification/getNotificationsByUser/${userId}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des notifications");
      }
      const data: NotificationType[] = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur getNotificationsByUser:", error);
      return [];
    }
  }