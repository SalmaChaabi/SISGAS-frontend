// src/services/actionsCorrectives/getAllActionsCorrectives.ts

import { ActionCorrectiveType } from "./types";

const getAllActionsCorrectives = async (): Promise<ActionCorrectiveType[]> => {
  try {
    const response = await fetch("http://localhost:5001/actionCorrective/getAllActionsCorrectives"); // route backend
    if (!response.ok) {
      throw new Error("Erreur serveur lors de la récupération des actions correctives");
    }
    const data = await response.json();
    return data; // normalement tableau d'actions correctives
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getAllActionsCorrectives;
