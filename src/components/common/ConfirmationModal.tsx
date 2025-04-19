import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

type ConfirmationModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  confirmLabel?:string
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onConfirm,
  onCancel,
  message,
  confirmLabel
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Annuler
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {confirmLabel || 'Confirmer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;

