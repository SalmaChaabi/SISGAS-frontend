// export interface NotificationType {
//     _id: string;
//     message: string;
//     dateNotification: string; // ou Date, selon comment tu l'utilises
//     lu: boolean;
//     utilisateur: string;
//     reclamation?: string;
//     actionCorrective?: string;
//   }
export interface NotificationType {
  _id?: string;
  message: string;
  dateNotification?: string;
  lu: boolean;
  utilisateur: string;
  reclamation?: {
    _id: string;
    titre: string;
  } | string | null;
  actionCorrective?: {
    _id: string;
    description: string;
  } | string | null;
}