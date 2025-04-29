// src/services/actionsCorrectives/deleteActionCorrective.ts

const deleteActionCorrective = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5001/actionCorrective/deleteActionCorrective/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }
  
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  export default deleteActionCorrective;
  