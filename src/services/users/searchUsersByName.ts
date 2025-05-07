export const searchUsersByName = async (firstName: string) => {
    try {
      const response = await fetch(`http://localhost:5001/auth/searchUsersByName?firstName=${firstName}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.usersListe; // retour d'un tableau d'utilisateurs
    } catch (error) {
      console.error("Erreur lors de la recherche des utilisateurs :", error);
      throw error;
    }
  };
  