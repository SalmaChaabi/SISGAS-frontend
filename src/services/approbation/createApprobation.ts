import { ApprobationType } from "./types";

export const createApprobation = async () => {
  const response = await fetch(`http://localhost:5001/approbation/createApprobation`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
     
    },
});

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la création de l'approbation");
  }

  const data: ApprobationType = await response.json();
  return data;
};