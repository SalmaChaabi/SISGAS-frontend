import React, { useEffect, useState } from "react";
import ReclamationListDataGrid from "../components/custom/reclamation/ReclamationListDataGrid";
import { Box, Button, Dialog, DialogContent, Snackbar, Alert } from "@mui/material";
import { Add } from "@mui/icons-material";
import ReclamationForm from "../components/custom/reclamation/ReclamationForm";
import { ReclamationType } from "../services/reclamations/types";
import getAllReclamations from "../services/reclamations/getAllReclamations";
import deleteReclamation from "../services/reclamations/deleteReclamation";
import updateReclamation from "../services/reclamations/updateReclamation";
import createReclamation from "../services/reclamations/createReclamation";

function Reclamations() {
  const [reclamations, setReclamations] = useState<ReclamationType[]>([]);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Récupérer toutes les réclamations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllReclamations();
        setReclamations(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des réclamations :", error);
      }
    };
    fetchData();
  }, []);

  // Supprimer une réclamation
  const handleDelete = async (id: string) => {
    try {
      await deleteReclamation(id);
      setReclamations((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Mettre à jour une réclamation
  
  const handleUpdate = async (id: string, updated: ReclamationType) => {
    try {
      // Appel à la fonction updateReclamation
      const response = await updateReclamation(id, updated);
      
      // Vérifier si la réponse est valide
      if (response.success && response.data) {
        // Assurez-vous que response.data est bien de type ReclamationType
        setReclamations((prev) =>
          prev.map((item) =>
            item._id === id ? (response.data as unknown as ReclamationType) : item // Type assertion explicite
          )
        );
      }
      return response;
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      return { success: false, message: "Erreur serveur", data: null };
    }
  };
  
  

  // Créer une nouvelle réclamation
  const handleCreate = async (data: ReclamationType) => {
    try {
      const response = await createReclamation(data);
      if (response.success) {
        setReclamations((prev) => [...prev, response.data]);
        setOpenFormModal(false);
        setOpenSnackbar(true);
      } else {
        alert("Erreur lors de la création !");
      }
    } catch (error) {
      console.error("Erreur lors de la création :", error); 
      alert("Erreur réseau !");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenFormModal(true)}
        >
          Créer Réclamation
        </Button>
      </Box>

      <ReclamationListDataGrid
        data={reclamations}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      <Dialog open={openFormModal} onClose={() => setOpenFormModal(false)}>
        <DialogContent>
          <ReclamationForm
            onSubmit={handleCreate}
            defaultData={{} as ReclamationType}
            submitLabel="Ajouter Réclamation"
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Réclamation ajoutée avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Reclamations;




