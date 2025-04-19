// components/ValiderModal.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const statutOptions = ["Payée", "En attente", "Refusée"];

const ValiderModal = ({ open, onClose, onConfirm }: any) => {
  const [statut, setStatut] = useState("Payée");

  const handleConfirm = () => {
    onConfirm(statut);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Valider la Facture</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="statut-label">Statut de paiement</InputLabel>
          <Select
            labelId="statut-label"
            value={statut}
            label="Statut de paiement"
            onChange={(e) => setStatut(e.target.value)}
          >
            {statutOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleConfirm} variant="contained">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ValiderModal;

