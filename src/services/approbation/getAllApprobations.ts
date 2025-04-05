

import { ApprobationType, GetAllApprobationsType } from "./types";

export const getAllApprobations = async () => {
  const response = await fetch(`http://localhost:5001/approbation/getAllApprobations`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des approbations");
  }

  const data: ApprobationType[] = await response.json();
  return data;
};
