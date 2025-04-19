export type ApprobationData = {
  date_approbation: string;
  nom_antenne: string;
  puissance_antenne: string;
  couple_frequence: string;
  type_equipement: string;
  position_GPS: string;
};

export type ApprobationType = ApprobationData & {
  _id: string;
};

export type ApprobationResponse = {
  success: boolean;
  message: string;
  data: ApprobationType;
};
