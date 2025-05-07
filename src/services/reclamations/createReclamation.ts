import { ReclamationType } from "./types";

const createReclamation = async (
  userId:string,
  data: ReclamationType
): Promise<{ success: boolean; message: string; data: ReclamationType }> => {

  const response = await fetch("http://localhost:5001/reclamation/createReclamation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...data,utilisateur:userId}),
  });

  const result = await response.json();
console.log(result)
  return {
    success: response.ok,
    message: result.message || "",
    data: result.data,
  };
};

export default createReclamation;


