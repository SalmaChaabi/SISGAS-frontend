const getActionsCorrectivesByReclamation = async (reclamationId: string): Promise<any[]> => {
    const response = await fetch(`http://localhost:5001/actionCorrective/getActionsCorrectivesByReclamation/${reclamationId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des actions correctives");
    }
    return await response.json();
  };
  export default getActionsCorrectivesByReclamation;