import { typeUser, StatutReclamationType, RoleType } from "@/types";

export interface ReclamationType {
  _id: string;
  titre: string;
  description: string;
  dateCreation: string;
  dateResolution?: string;
  Commentaireutilisateur?: string;
  fournisseurIntervenu?: string;
  statut: StatutReclamationType;
  utilisateur: typeUser;
  role?: RoleType;
    actionsCorrectives?: string[]; // liste d’IDs d’actions

}

