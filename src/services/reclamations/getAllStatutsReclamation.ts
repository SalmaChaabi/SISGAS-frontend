const getAllStatutsReclamation = async (): Promise<any[]> => {
    const response = await fetch("http://localhost:5001/statutReclamation/getAllStatutsReclamation", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des statuts");
    }
    return await response.json();
  };
  export default getAllStatutsReclamation;