export const validerFacture = async (id: string ) => {
    const response = await fetch(`http://localhost:5001/facture/validerFacture/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
    const data = await response.json();
  
    return {
      success: response.status === 200,
      message: data.message || "Facture payée avec succès",
    };
  };
  