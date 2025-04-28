const deleteReclamation = async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`http://localhost:5001/reclamation/deleteReclamation/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de la réclamation");
    }
    return await response.json();
  };
  export default deleteReclamation;