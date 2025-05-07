import React, { useEffect, useState } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  Stack,
  Snackbar,
  Alert,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ConfirmationModal from "../../common/ConfirmationModal";
import ReclamationForm from "./ReclamationForm";
import { ReclamationType } from "../../../services/reclamations/types";
import getReclamationById from "../../../services/reclamations/getReclamationById";

type Props = {
  onDelete: (id: string) => void; // Correction ici
  onUpdate: (
    id: string,
    data: ReclamationType

  ) => Promise<{ success: boolean; message: string; data: any }>;
  reclamationId: string;
};

export default function ReclamationItemActions({
  onDelete,
  onUpdate,
  reclamationId,
}: Props) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [reclamationData, setReclamationData] = useState<ReclamationType>(
    {} as ReclamationType
  );
  const [openSnackbar, setOpenSnackbar] = useState(false); // Pour Snackbar success

  useEffect(() => {
    if (!updateModalOpen) return;

    const fetchReclamation = async () => {
      try {
        const data = await getReclamationById(reclamationId);
        setReclamationData(data);
      } catch (error) {
        console.error("Erreur lors du fetch de la réclamation :", error);
      }
    };

    fetchReclamation();
  }, [updateModalOpen, reclamationId]);

  const handleDelete = () => {
    onDelete(reclamationId); // Appel avec id
    setDeleteModalOpen(false);
    setOpenSnackbar(true); // Afficher succès
  };
  console.log(reclamationData);
  return (
    <>
      <Stack direction="row" spacing={1}>
        <IconButton color="warning" onClick={() => setUpdateModalOpen(true)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => setDeleteModalOpen(true)}>
          <Delete />
        </IconButton>
      </Stack>

      <ConfirmationModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message="Supprimer cette réclamation ?"
      />

      <Dialog
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>reclamation</DialogTitle>
        <DialogContent>
          {reclamationData.statut && (
            <ReclamationForm
              onSubmit={async (data) => {
                await onUpdate(reclamationId, data);
                setUpdateModalOpen(false);
              }}
              defaultData={{
                ...reclamationData,
                statut: reclamationData.statut._id,

                role: reclamationData.role?._id,

                utilisateur: reclamationData.utilisateur.firstName,
              }}
              submitLabel="Modifier Réclamation"
            />
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Réclamation supprimée avec succès !
        </Alert>
      </Snackbar>
    </>
  );
}
