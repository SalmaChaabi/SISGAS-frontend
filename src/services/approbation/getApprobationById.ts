import { ApprobationType } from "./types";

export const getApprobationById = async (
  id: string
): Promise<{ success: boolean; data: ApprobationType }> => {
  const response = await fetch(
    `http://localhost:5001/approbation/getApprobation/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l’approbation");
  }

  const data = await response.json();
  return { data, success: true } as {
    success: boolean;
    data: ApprobationType;
  };
};
