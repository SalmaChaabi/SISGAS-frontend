// src/services/actionsCorrectives/updateActionCorrective.ts

import { ActionCorrectiveType } from "./types";

const updateActionCorrective = async (id: string, updatedData: ActionCorrectiveType) => {
  try {
    const response = await fetch(`http://localhost:5001/actionCorrective/updateActionCorrective/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la mise à jour");
    }

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
};

export default updateActionCorrective;
