import { ReclamationType } from "./types";

const createReclamation = async (
  data: ReclamationType
): Promise<{ success: boolean; message: string; data: ReclamationType }> => {
  const response = await fetch("http://localhost:5001/reclamation/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return {
    success: response.ok,
    message: result.message || "",
    data: result.data,
  };
};

export default createReclamation;


