import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { ActionCorrectiveType } from "../../../services/actionsCorrectives/types";

interface Props {
  actionCorrective: ActionCorrectiveType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updated: ActionCorrectiveType) => void;
}

export default function ActionCorrectiveItemActions({ actionCorrective, onDelete, onUpdate }: Props) {
  const handleDelete = () => {
    if (actionCorrective._id) {
      onDelete(actionCorrective._id);
    }
  };

  const handleUpdate = () => {
    const updatedData = {
      ...actionCorrective,
      description: prompt("Modifier description:", actionCorrective.description) || actionCorrective.description,
    };
    if (actionCorrective._id) {
      onUpdate(actionCorrective._id, updatedData);
    }
  };

  return (
    <>
      <IconButton onClick={handleUpdate}>
        <Edit />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
    </>
  );
}
