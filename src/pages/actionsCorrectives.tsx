import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, Snackbar, Alert, Select, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ActionCorrectiveType } from "../services/actionsCorrectives/types";
import getAllActionsCorrectives from "../services/actionsCorrectives/getAllActionsCorrectives";
import createActionCorrective from "../services/actionsCorrectives/createActionCorrective";
import updateActionCorrective from "../services/actionsCorrectives/updateActionCorrective";
import deleteActionCorrective from "../services/actionsCorrectives/deleteActionCorrective";
import ActionCorrectiveListDataGrid from "../components/custom/actionsCorrectives/ActionCorrectiveListDataGrid";
import ActionCorrectiveForm from "../components/custom/actionsCorrectives/ActionCorrectiveForm";
import getAllStatutsReclamation from "../services/reclamations/getAllStatutsReclamation";

function ActionCorrectivesPage() {
  const [actionsCorrectives, setActionsCorrectives] = useState<ActionCorrectiveType[]>([]);
  const [statuts, setStatuts] = useState<any[]>([]); 
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllActionsCorrectives();
      setActionsCorrectives(data);


      try {
        const statutsData = await getAllStatutsReclamation();
        setStatuts(statutsData); 
      } catch (error) {
        console.error("Error fetching statuts:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const success = await deleteActionCorrective(id);
    if (success) {
      setActionsCorrectives((prev) => prev.filter((item) => item._id !== id));
    }
  };

  const handleUpdate = async (id: string, updatedData: ActionCorrectiveType) => {
    const response = await updateActionCorrective(id, updatedData);
    if (response.success && response.data) {
      setActionsCorrectives((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
    }
  };

  const handleCreate = async (newData: ActionCorrectiveType) => {
    const response = await createActionCorrective(newData);
    if (response.success && response.data) {
      setActionsCorrectives((prev) => [...prev, response.data]);
      setOpenFormModal(false);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenFormModal(true)}>
          Créer Action Corrective
        </Button>
      </Box>

      <ActionCorrectiveListDataGrid
        data={actionsCorrectives}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      <Dialog open={openFormModal} onClose={() => setOpenFormModal(false)}>
        <DialogContent>
          <ActionCorrectiveForm
            onSubmit={handleCreate}
            defaultData={{
              description: "",
              statutReclamation: "",
              reclamation: "",
              dateAction: undefined,
            }}
            submitLabel="Ajouter Action Corrective"
            statuts={statuts} 
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Action Corrective ajoutée avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ActionCorrectivesPage;





