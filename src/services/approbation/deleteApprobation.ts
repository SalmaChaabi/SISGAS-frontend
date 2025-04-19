export const deleteApprobation = async (
    id: string
  ): Promise<{ success: boolean; message?: string }> => {
    const response = await fetch(`http://localhost:5001/approbation/deleteApprobation/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l’approbation");
    }
  
    const data = await response.json();
    return data;
  };
  export default deleteApprobation;
  
  
  