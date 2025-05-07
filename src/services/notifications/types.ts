export interface NotificationType {
    _id: string;
    message: string;
    dateNotification: string; // ou Date, selon comment tu l'utilises
    lu: boolean;
    utilisateur: string;
    reclamation?: string;
    actionCorrective?: string;
  }