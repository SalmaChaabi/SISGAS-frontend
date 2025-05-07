import { ReclamationType } from "./types";

interface UpdateReclamationResponse {
  success: boolean;
  message: string;
  data: ReclamationType | null;
}

export default async function updateReclamation(
  id: string,
  updated: ReclamationType
): Promise<UpdateReclamationResponse> {
  console.log("updated", updated);
  try {
    const response = await fetch(
      `http://localhost:5001/reclamation/updateReclamation/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }
    );
    const result = await response.json();
    return {
      success: response.ok,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error("Erreur réseau lors de l'update :", error);
    return { success: false, message: "Erreur réseau", data: null };
  }
}
