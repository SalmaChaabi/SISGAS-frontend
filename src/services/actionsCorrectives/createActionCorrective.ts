// src/services/actionsCorrectives/createActionCorrective.ts

import { ActionCorrectiveType } from "./types";


const createActionCorrective = async (
  utilisateur: string,
  reclamation: string,
  actionCorrective: ActionCorrectiveType
) => {
  try {
    const response = await fetch(
      "http://localhost:5001/actionCorrective/createActionCorrective",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...actionCorrective, utilisateur, reclamation }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la création");
    }

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
};

export default createActionCorrective;
