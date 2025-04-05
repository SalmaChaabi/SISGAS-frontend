import React, { useEffect, useState } from "react";
import ApprobationListDataGrid from "../components/custom/approbation/ApprobationListDataGrid";
import {
  getAllApprobations,
  deleteApprobation,
  updateApprobation,
  ApprobationType,
} from "../services/approbation";

function Approbations() {
  const [approbations, setApprobations] = useState<ApprobationType[]>([]);

  // Fetch all approbations
  useEffect(() => {
    const fetchApprobations = async () => {
      try {
        const response = await getAllApprobations();
        console.log(response)
        setApprobations(response);
      } catch (error) {
        console.error("Erreur lors du fetch des approbations", error);
      }
    };

    fetchApprobations();
  }, []);

  // Delete handler
  const handleDelete = async (id: string) => {
    try {
      await deleteApprobation(id);
      setApprobations((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  // Update handler
  const handleUpdate = async (id: string, updatedData: ApprobationType) => {
    try {
      const response = await updateApprobation(id, updatedData);
      if (response.success) {
        setApprobations((prev) =>
          prev.map((item) => (item._id === id ? response.data : item))
        );
      }
      return response;
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
      return { success: false, data: updatedData, message: "Update failed" };
    }
  };

  return (
    <ApprobationListDataGrid
      data={approbations}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
}

export default Approbations;

