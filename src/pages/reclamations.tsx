import React, { useEffect, useState } from "react";
import ReclamationListDataGrid from "../components/custom/reclamation/ReclamationListDataGrid";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
  Card,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Circle } from "@mui/icons-material";
import ReclamationForm from "../components/custom/reclamation/ReclamationForm";
import { ReclamationType } from "../services/reclamations/types";
import getAllReclamations from "../services/reclamations/getAllReclamations";
import deleteReclamation from "../services/reclamations/deleteReclamation";
import updateReclamation from "../services/reclamations/updateReclamation";
import createReclamation from "../services/reclamations/createReclamation";
import { useSession } from "../SessionContext";
import { motion } from "framer-motion";
import { SelectChangeEvent } from "@mui/material";
import useUserRole from "../hooks/useUserRole";

// 🎯 Couleurs de statut
const statusColors: Record<string, string> = {
  "en cours": "#ff9800",
  résolu: "#4caf50",
  escaladée: "#e53935",
  nouveau: "#2196f3",
  rejeté: "#9e9e9e",
};

const getStatusIcon = (status: string) => {
  const color = statusColors[status.toLowerCase()] || "lightgray";
  return <Circle sx={{ color, mr: 1 }} />;
};

function Reclamations() {
  const [reclamations, setReclamations] = useState<ReclamationType[]>([]);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { session } = useSession();
    const { isAdmin, isTechnicien, isComptable } = useUserRole();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllReclamations();
        setReclamations(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des réclamations :", error);
      }
    };
    fetchData();
  }, []);
  

  const filteredReclamations = statusFilter
    ? reclamations.filter((r) =>
      r.statut?.nom?.toLowerCase().includes(statusFilter.toLowerCase())
      )
    : reclamations;

  const handleDelete = async (id: string) => {
    try {
      await deleteReclamation(id);
      setReclamations((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleUpdate = async (
    id: string,

    updated: ReclamationType
  ): Promise<{ success: boolean; message: string; data: any }> => {
    const userId = session?.user?.id;
    if (!userId) {
      return { success: false, message: "Utilisateur non connecté", data: null };
    }

    try {
      const response = await updateReclamation(id, {
        ...updated,
        utilisateur: userId,
      });

      if (response?.success && response.data) {
        const updatedReclamation = response.data as ReclamationType;
        setReclamations((prev) =>
          prev.map((item) => (item._id === id ? updatedReclamation : item))
        );
      }

      return (
        response ?? {
          success: false,
          message: "Réponse indéfinie",
          data: null,
        }
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      return {
        success: false,
        message: "Erreur serveur",
        data: null,
      };
    }
  };

  const handleCreate = async (data: ReclamationType) => {
    try {
      const userId = session?.user?.id;
      if (!userId) {
        alert("Utilisateur non connecté !");
        return;
      }

      const response = await createReclamation(userId, data);
      if (response.success) {
        setReclamations((prev) => [...prev, response.data]);
        setOpenFormModal(false);
        setOpenSnackbar(true);
      } else {
        alert("Erreur lors de la création !");
      }
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      alert("Erreur réseau !");
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  const statusCount = (status: string) =>
    reclamations.filter((r) => r.statut?.nom?.toLowerCase() === status).length;

  return (
    <Box sx={{ p: 3 }}>
      {/* 🎨 Statistiques */}
      <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
        {[
          { label: "Total Réclamations", count: reclamations.length, color: "#6a1b9a" },
          { label: "Réclamations Résolues", count: statusCount("résolu"), color: "#4caf50" },
          { label: "Réclamations Escaladée", count: statusCount("escaladée"), color: "#e53935" },
          { label: "Réclamations Envoyée", count: statusCount("envoyée"), color: "#2196f3" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              sx={{
                p: 2,
                m: 1,
                minWidth: 220,
                background: item.color,
                color: "white",
                borderRadius: "16px",
              }}
            >
              <Typography variant="subtitle1">{item.label}</Typography>
              <Typography variant="h4">{item.count}</Typography>
            </Card>
          </motion.div>
        ))}
      </Stack>

      {/* 🔘 Filtre par statut */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Filtrer par statut</InputLabel>
          <Select value={statusFilter} label="Filtrer par statut" onChange={handleFilterChange}>
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="résolu">Résolu</MenuItem>
            <MenuItem value="escaladée">Escaladée</MenuItem>
            <MenuItem value="envoyée">Envoyée</MenuItem>

          </Select>
        </FormControl>
      </Box>

      {/* 🔘 Bouton Créer Réclamation */}

{(isAdmin || isTechnicien || isComptable) && (
  <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
    <Button
      variant="contained"
      onClick={() => setOpenFormModal(true)}
      startIcon={
        <ReportProblemIcon
          sx={{
            fontSize: "24px",
            animation: "bounce 1.5s infinite",
            "@keyframes bounce": {
              "0%, 100%": {
                transform: "translateY(0)",
                animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
              },
              "50%": {
                transform: "translateY(-5px)",
                animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
              },
            },
          }}
        />
      }
      sx={{
        background: "linear-gradient(45deg, #e53935 0%, #d32f2f 50%, #c2185b 100%)",
        color: "white",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "600",
        borderRadius: "50px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          background: "linear-gradient(45deg, #f44336 0%, #1976d2 50%, #388e3c 100%)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          transform: "scale(1.05)",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      Créer Réclamation
    </Button>
  </Box>
)}


      {/* 📋 Liste des réclamations */}
      <ReclamationListDataGrid
        data={filteredReclamations}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        getStatusIcon={getStatusIcon}
      />

      {/* 📝 Modal création réclamation */}
      <Dialog open={openFormModal} onClose={() => setOpenFormModal(false)}>
        <DialogContent>
          <ReclamationForm
            onSubmit={handleCreate}
            defaultData={{} as ReclamationType}
            submitLabel="Ajouter Réclamation"
          />
        </DialogContent>
      </Dialog>

      {/* ✅ Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Réclamation ajoutée avec succès !
        </Alert>
      </Snackbar>

      {/* 🧾 Légende des statuts */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Légende des statuts :
        </Typography>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          {Object.entries(statusColors).map(([status, color]) => (
            <Box key={status} display="flex" alignItems="center">
              <Circle sx={{ color, mr: 1 }} />
              <Typography>{status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default Reclamations;















