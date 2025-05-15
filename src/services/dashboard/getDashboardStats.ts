
// src/services/dashboardService.ts
export async function getDashboardStats() {
    const res = await fetch("http://localhost:5001/dashboard/getDashboardStats");
    if (!res.ok) {
      throw new Error("Erreur réseau");
    }
    return await res.json();
  }
  