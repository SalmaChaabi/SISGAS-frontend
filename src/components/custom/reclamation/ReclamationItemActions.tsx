import React, { useEffect, useState } from "react";
import { IconButton, Dialog, DialogContent, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ConfirmationModal from "../../common/ConfirmationModal";
import ReclamationForm from "./ReclamationForm";
import { ReclamationType } from "../../../services/reclamations/types";
import getReclamationById from "../../../services/reclamations/getReclamationById";

type Props = {
  onDelete: VoidFunction;
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

  useEffect(() => {
    if (!updateModalOpen) return;

    const fetchReclamation = async () => {
      try {
        const data = await getReclamationById(reclamationId);
        setReclamationData(data); // correction ici
      } catch (error) {
        console.error("Erreur lors du fetch de la réclamation :", error);
      }
    };

    fetchReclamation();
  }, [updateModalOpen]);

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
        onConfirm={() => {
          onDelete();
          setDeleteModalOpen(false);
        }}
        message="Supprimer cette réclamation ?"
      />

      <Dialog open={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <DialogContent>
          <ReclamationForm
            onSubmit={(data) => {
              onUpdate(reclamationId, data);
              setUpdateModalOpen(false);
            }}
            defaultData={reclamationData}
            submitLabel="Modifier Réclamation"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}


