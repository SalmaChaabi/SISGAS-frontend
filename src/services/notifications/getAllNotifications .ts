import { NotificationType } from './types';

export async function getAllNotifications(): Promise<NotificationType[]> {
    try {
      const response = await fetch("http://localhost:5001/notification/getAllNotifications");
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des notifications");
      }
  
      const data: NotificationType[] = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur getAllNotifications:", error);
      return [];
    }
  }