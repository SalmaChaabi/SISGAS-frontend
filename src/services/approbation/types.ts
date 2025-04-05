export type ApprobationType = {
    date_approbation: string;
    nom_antenne: string;
    puissance_antenne: string;
    couple_frequence: string;
    type_equipement: string;
    position_GPS: string;
    _id?: string; // optionnel si tu récupères un ID depuis la DB
  };
  
  export type GetAllApprobationsType = {
    success: boolean;
    data: ApprobationType[];
  };