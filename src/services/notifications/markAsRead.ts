export async function markAsRead(id: string): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:5001/notification/mark-read/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ lu: true })
      });
  
      return response.ok;
    } catch (error) {
      console.error("Erreur markAsRead:", error);
      return false;
    }
  }
  