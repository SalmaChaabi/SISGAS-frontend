export const verifierFacture = async (id: string) => {
    const response = await fetch(`http://localhost:5001/facture/verifierFacture/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
    });
  
    const data = await response.json();
  console.log(response.status,id)
    return {
      success: response.status === 200,
      message: data.message || "Facture vérifiée avec succès",
    };
  };
  