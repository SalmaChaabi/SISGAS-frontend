import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import ConfirmationModal from "../../common/ConfirmationModal";
import ApprobationForm from "./ApprobationForm"; // Tu dois créer ce formulaire
import { getApprobationById } from "../../../services/approbation/getApprobationById";
import { ApprobationType } from "../../../services/approbation/types";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import useUserRole from "../../../hooks/useUserRole";


type ApprobationItemActionsProps = {
  onDelete: VoidFunction;
  onUpdate: (
    id: string,
    data: ApprobationType
  ) => Promise<{ success: boolean; message: string; data: any }>;
  approbationId: string;
};

export default function ApprobationItemActions({
  onDelete,
  onUpdate,
  approbationId,
}: ApprobationItemActionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [approbationData, setApprobationData] = useState<ApprobationType>(
    {} as ApprobationType
  );
    const { isTechnicien} = useUserRole();


  const handleConfirmDelete = () => {
    onDelete();
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    if (updateModalOpen) {
      getApprobationById(approbationId).then((res) => {
        setApprobationData({
          ...res.data,
          date_approbation: res.data.date_approbation.split("T")[0],
        });
      });
    }
  }, [updateModalOpen]);

  return (
    <div>
      <Stack direction="row" spacing={2}>
         {isTechnicien && (
        <IconButton
          onClick={() => {
            setUpdateModalOpen(true);
          }}
          color="warning"
        >
          <Edit />
        </IconButton>
         )}
          {isTechnicien && (
        <IconButton onClick={() => setDeleteModalOpen(true)} color="error">
          <Delete />
        </IconButton>
          )}
          
      </Stack>

      <ConfirmationModal
        open={deleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
        }}
        message="Êtes-vous sûr de vouloir supprimer cette approbation ?"
      />

      <Dialog
        open={updateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
        }}
      >
        <DialogContent>
          <ApprobationForm
            onSubmit={(data) => {
              onUpdate(approbationId, data);
              setUpdateModalOpen(false);
            }}
            defaultData={approbationData}
            submitLabel="Modifier Approbation"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
