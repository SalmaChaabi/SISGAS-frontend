import { ReclamationType } from "./types";

const updateReclamation = async (id: string, updatedData: Partial<ReclamationType>): Promise<ReclamationType> => {
  const response = await fetch(`http://localhost:5001/reclamation/updateReclamation/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour de la réclamation");
  }
  return await response.json();
};
export default updateReclamation;