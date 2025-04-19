import { ApprobationType } from "./types";

export const updateApprobation = async (
  id: string,
  updatedData: ApprobationType
): Promise<{ success: boolean; data: ApprobationType; message?: string }> => {
  const response = await fetch(`http://localhost:5001/approbation/updateApprobation/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour de l’approbation");
  }

  const data = await response.json();
  return data;
};
export default updateApprobation;

