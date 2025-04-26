const getAllUsers = async (): Promise<any[]> => {
    const response = await fetch("http://localhost:5001/auth/getAllUsers", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }
    return await response.json();
  };
  export default getAllUsers;