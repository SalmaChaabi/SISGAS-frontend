export async function forgotPassword(email: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:5001/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de l'envoi de l'email");
    }

    const data = await response.json();
    return data.message;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Erreur inconnue");
    }
  }
}
