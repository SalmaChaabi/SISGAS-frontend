export type ActionCorrectiveType = {
    _id: string;
    description: string;
    dateAction:Date;
    dateFin?: string;
    status?: "terminée" | "en cours" | "annulée";
  };
  