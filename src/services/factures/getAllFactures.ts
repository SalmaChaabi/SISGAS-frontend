export const getAllFactures = async () => {
    const response = await fetch("http://localhost:5001/facture/getAllFactures");
    const data = await response.json();
  
    return {
      success: response.status === 200,
      factures: data.factures, // comme utilisé dans le `setFactures`
    };
  };
  