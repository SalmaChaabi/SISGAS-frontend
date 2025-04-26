export type ReclamationType = {
  success: any;
  data(data: any): unknown;
  _id?: string;
  titre: string;
  description: string;
  dateCreation?: string;
  dateResolution?: string;
  commentaireAdmin?: string;
  fournisseurIntervenu?: boolean;
  statut: string; // ID du statut
  utilisateur: string; // ID de l'utilisateur
  role?: string; // ID du rôle
  actionsCorrectives?: string[]; // liste d’IDs d’actions
};
