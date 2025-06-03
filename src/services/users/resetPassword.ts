export async function resetPassword(token: string, newPassword: string): Promise<string> {
  try {
    const response = await fetch(`http://localhost:5001/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword }),
    });

    // Essaie de parser le JSON même en cas d'erreur
    const data = await response.json();

    if (!response.ok) {
      // Affiche dans la console l'erreur reçue
      console.error("Backend error:", data);
      throw new Error(data.message || "Erreur lors de la réinitialisation du mot de passe");
    }

    return data.message; // Par exemple "Mot de passe réinitialisé avec succès."
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur catch:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Erreur inconnue");
      throw new Error("Erreur inconnue");
    }
  }
}



