import { ReclamationType } from "./types";

// Récupérer la réclamation par ID
const getReclamationById = async (id: string): Promise<ReclamationType> => {
  const response = await fetch(`http://localhost:5001/reclamation/getReclamationById/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de la réclamation");
  }

  const data: ReclamationType = await response.json();
  return data;
};

export default getReclamationById;
