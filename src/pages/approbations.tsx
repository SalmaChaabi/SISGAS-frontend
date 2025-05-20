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
import useUserRole from "../hooks/useUserRole";

function Approbations() {
  const [approbations, setApprobations] = useState<ApprobationType[]>([]);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { isTechnicien } = useUserRole();
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
        setApprobations((prev) => [...prev, response.data]);
        setOpenFormModal(false);
        setOpenSnackbar(true);
      } else {
        // Affiche le message d'erreur spécifique de l'API ou un message par défaut
        const errorMessage =
          response.message ||
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
        {isTechnicien && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateClick}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: "30px", // Coins arrondis pour un look plus moderne
              textTransform: "none",
              fontSize: "1rem", // Taille de la police ajustée pour plus de visibilité
              fontWeight: 600,
              background: "linear-gradient(45deg, #FF69B4, #8B4513, #32CD32)", // Dégradé rose, marron et vert
              backgroundSize: "400% 400%",
              animation: "gradientFlow 6s ease infinite", // Animation du dégradé pour plus de dynamisme
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Ombre douce autour du bouton
              border: "2px solid transparent", // Bordure invisible mais espace pour l'effet
              backgroundClip: "padding-box", // Crée une bordure interne visible
              "&:hover": {
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // Ombre plus forte au survol
                transform: "scale(1.05)", // Agrandir un peu au survol pour un effet dynamique
                backgroundPosition: "100% 50%", // Changer la position du dégradé au survol
              },
              transition: "all 0.3s ease",
              "@keyframes gradientFlow": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
              },
            }}
          >
            Create Approbation
          </Button>
        )}
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
