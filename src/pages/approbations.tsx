import React, { useEffect, useState } from "react";
import ApprobationListDataGrid from "../components/custom/approbation/ApprobationListDataGrid";
import getAllApprobations from "../services/approbation/getAllApprobations";
import deleteApprobation from "../services/approbation/deleteApprobation";
import updateApprobation from "../services/approbation/updateApprobation";
import createApprobation from "../services/approbation/createApprobation"; 
import {
  Button,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import ApprobationForm from "../components/custom/approbation/ApprobationForm";
import { ApprobationType } from "../services/approbation";

function Approbations() {
  const [approbations, setApprobations] = useState<ApprobationType[]>([]);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Charger toutes les approbations
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

  //  Supprimer une approbation
  const handleDelete = async (id: string) => {
    try {
      await deleteApprobation(id);
      setApprobations((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  //  Mettre à jour une approbation
  const handleUpdate = async (id: string, updatedData: ApprobationType) => {
    try {
      const response = await updateApprobation(id, updatedData);
      if (response.success) {
        setApprobations((prev) =>
          prev.map((item) => (item._id === id ? response.data : item))
        );
      }
      return {
        success: response.success,
        message: response.message || "Update successful",
        data: response.data,
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
      return {
        success: false,
        message: "Update failed",
        data: updatedData,
      };
    }
  };

  //  Ouvrir le modal d'ajout
  const handleCreateClick = () => {
    setOpenFormModal(true);
  };

  const handleCreateApprobation = async (data: ApprobationType) => {
    try {
      console.log("Données envoyées à l'API:", JSON.stringify(data, null, 2)); // Debug détaillé
      
      const response = await createApprobation(data);
      console.log("Réponse de l'API:", response); // Debug réponse
      
      if (!response) {
        throw new Error("Pas de réponse du serveur");
      }
      
      if (response.success) {
        setApprobations(prev => [...prev, response.data]);
        setOpenFormModal(false);
        setOpenSnackbar(true);
      } else {
        // Affiche le message d'erreur spécifique de l'API ou un message par défaut
        const errorMessage = response.message || 
                           response.data?.message || 
                           "Erreur lors de la création";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error("Erreur complète:", error);
      alert(`Erreur: ${error.message || "Problème de connexion au serveur"}`);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Bouton Ajouter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreateClick}
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: 1,
            textTransform: "none",
            fontSize: "0.875rem",
            fontWeight: 600,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            "&:hover": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Create Approbation
        </Button>
      </Box>

      {/*  Liste */}
      <ApprobationListDataGrid
        data={approbations}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      {/*  Modal */}
      <Dialog open={openFormModal} onClose={() => setOpenFormModal(false)}>
        <DialogContent>
          <ApprobationForm
            onSubmit={handleCreateApprobation}
            defaultData={{} as ApprobationType}
            submitLabel="Ajouter Approbation"
          />
        </DialogContent>
      </Dialog>

      {/*  Snackbar de succès */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}
        >
          Approbation ajoutée avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Approbations;


