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

// Statuts disponibles pour vérification
const statutOptions = ["Vérifiée", "En attente", "Refusée"];

const VerifierModal = ({ open, onClose, onConfirm }: any) => {
  const [statut, setStatut] = useState("Vérifiée");

  const handleConfirm = () => {
    onConfirm(statut);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Vérifier la Facture</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="statut-label">Statut de vérification</InputLabel>
          <Select
            labelId="statut-label"
            value={statut}
            label="Statut de vérification"
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
        <Button onClick={handleConfirm} variant="contained" color="info">
          Vérifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerifierModal;
