import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import { User } from "../../../services/users/getAllUsers";
import { getUserByID } from "../../../services/users/getUserbyId";
import {
  AddUserParam,
  AddUserResponse,
} from "../../../services/users/addUser";
import ConfirmationModal from "../../common/ConfirmationModal";
import UserForm from "./UserForm";

type UserItemActionsProps = {
  onDelete: VoidFunction;
  onUpdate: (
    userId: string,
    user: AddUserParam
  ) => Promise<AddUserResponse>;
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
  const [userData, setUserData] = useState<User>({} as User);

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
      {/* when we click delete, it opens a modal with yes or no choices */}
      <ConfirmationModal
        open={deleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          handleClose();
        }}
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
      />
      {/* when we click update, it opens a modal with user form */}
      <Dialog
        open={updateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
          handleClose();
        }}
        slotProps={{
          paper:{
            sx:{
              background:'none'
            }
          }
        }}
      >
        <DialogContent >
          <UserForm
            onSubmit={(user) => onUpdate(userId, user)}
            defaultData={userData}
            submitLabel="Update Users"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
