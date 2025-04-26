const getAllRoles = async (): Promise<any[]> => {
    const response = await fetch("http://localhost:5001/role/getAllRoles", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des rôles");
    }
    return await response.json();
  };
  export default getAllRoles;