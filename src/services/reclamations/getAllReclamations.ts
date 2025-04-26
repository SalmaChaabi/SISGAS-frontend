import { ReclamationType } from "./types";

const getAllReclamations = async (): Promise<ReclamationType[]> => {
  const response = await fetch("http://localhost:5001/reclamation/getAllReclamations", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des réclamations");
  }
  return await response.json();
};
export default getAllReclamations;