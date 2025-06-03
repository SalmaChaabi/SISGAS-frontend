import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { ActionCorrectiveType } from "../../../services/actionsCorrectives/types";
import { useState } from "react";
import ConfirmationModal from "../../common/ConfirmationModal";
import ActionCorrectiveForm from "./ActionCorrectiveForm";

interface Props {
  actionCorrective: ActionCorrectiveType;
  onDelete: (id: string) => void;
  onUpdate: (updated: ActionCorrectiveType) => void;
}

export default function ActionCorrectiveItemActions({
  actionCorrective,
  onDelete,
  onUpdate,
}: Props) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedAction, setSelectedAction] =
    useState<ActionCorrectiveType | null>(null);
  const handleDeleteClick = () => {
    setDeleteId(actionCorrective._id as string);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
    }
    setOpenConfirm(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setDeleteId(null);
  };
  const handleEditClick = () => {
    setSelectedAction(actionCorrective);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedAction(null);
  };

  const handleUpdateSubmit = (updatedAction: ActionCorrectiveType) => {
    if (selectedAction && selectedAction._id) {
      // Vérifie que _id est défini
      onUpdate(updatedAction);
      handleCloseEditModal();
    } else {
      console.error("ID non défini pour l'action corrective sélectionnée !");
    }
  };

  return (
    <>
      <IconButton onClick={handleEditClick}>
        <Edit />
      </IconButton>
      <IconButton onClick={handleDeleteClick}>
        <Delete />
      </IconButton>

      <ConfirmationModal
        open={openConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Êtes-vous sûr de vouloir supprimer cette action corrective ?"
        confirmLabel="Supprimer"
      />
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Modifier Action Corrective
          </Typography>
          {selectedAction && (
            <ActionCorrectiveForm
              onSubmit={handleUpdateSubmit}
              defaultData={selectedAction}
              submitLabel="Modifier action corrective"
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
