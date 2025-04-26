import React from 'react';
import { Typography, Box } from '@mui/material';

const ReclamationDetailsModal = ({ reclamation }) => {
  return (
    <Box>
      <Typography variant="h6">Titre: {reclamation.titre}</Typography>
      <Typography>Description: {reclamation.description}</Typography>
      <Typography>Date de création: {new Date(reclamation.dateCreation).toLocaleDateString()}</Typography>
      <Typography>Commentaire Admin: {reclamation.commentaireAdmin || 'Aucun'}</Typography>
      <Typography>Fournisseur Intervenu: {reclamation.fournisseurIntervenu ? 'Oui' : 'Non'}</Typography>
      <Typography>Statut: {reclamation.statut?.nom}</Typography>
      <Typography>Utilisateur: {reclamation.utilisateur?.nom}</Typography>
      <Typography>Rôle: {reclamation.role?.nom}</Typography>
    </Box>
  );
};

export default ReclamationDetailsModal;
