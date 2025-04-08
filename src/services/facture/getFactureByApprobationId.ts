
export const getFactureByApprobationId = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5001/facture/getFactureByApprobationId/${id}`);
      if (!response.ok) {
        throw new Error("Facture non trouvée");
      }
      const data = await response.json();
      return data.facture;
    } catch (error) {
      console.error("Erreur lors de la récupération de la facture :", error);
      throw error;
    }
  };
  