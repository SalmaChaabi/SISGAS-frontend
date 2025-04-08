import React, { useEffect, useState } from "react";
import ApprobationListDataGrid from "../components/custom/approbation/ApprobationListDataGrid";
import {
  getAllApprobations,
  deleteApprobation,
  updateApprobation,
  ApprobationType,
  
} from "../services/approbation";
import { Button, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";


function Approbations() {
  const [approbations, setApprobations] = useState<ApprobationType[]>([]);
  const navigate = useNavigate();

  // Fetch all approbations
  useEffect(() => {
    const fetchApprobations = async () => {
      try {
        const response = await getAllApprobations();
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

  const handleCreateClick = () => {
    navigate("/approbations/create");
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Bouton avec style élégant et espacement */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        mb: 3,
        gap: 2
      }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreateClick}
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: 1,
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              transform: 'translateY(-1px)'
              
            },
            transition: 'all 0.2 s ease'
          }}
        >
          Create Approbation
        </Button>
      </Box>

      <ApprobationListDataGrid
        data={approbations}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </Box>
  );
}

export default Approbations;
