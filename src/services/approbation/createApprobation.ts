const createApprobation = async (data: any) => {
  try {
    const response = await fetch("http://localhost:5001/approbation/createApprobation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
      success: response.ok,
      data: result,
      message: result.message || "Approbation créée avec succès", 
    };
  } catch (error) {
    console.error("Erreur dans createApprobation:", error);
    return {
      success: false,
      message: "Erreur lors de la création", 
    };
  }
};

export default createApprobation;


