import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useState } from "react";
import UserForm from "./UserForm";
import { getUserByID } from "../../../services/users/getUserbyId";
import { User } from "../../../services/users/getAllUsers";

type UserItemActionsProps = {
  onDelete: VoidFunction;
  onUpdate: VoidFunction;
  userId: string;
};
export default function UserItemActions({
  onDelete,
  onUpdate,
  userId,
}: UserItemActionsProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userData, setUserData] = useState<User>({});

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleConfirmDelete = () => {
    onDelete();
    setDeleteModalOpen(false);
    handleClose();
  };
  React.useEffect(() => {
    if (updateModalOpen) {
      // fetch user da
      getUserByID(userId).then((res) => {
        setUserData(res.data);
      });
    }
  }, [updateModalOpen]);
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setUpdateModalOpen(true)}>Update</MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteModalOpen(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <ConfirmationModal
        open={deleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          handleClose();
        }}
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
      />
      <Dialog
        open={updateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
          handleClose();
        }}
      >
        <DialogContent>
          <UserForm onSubmit={() => {}} defaultData={userData} submitLabel="Update Users" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
