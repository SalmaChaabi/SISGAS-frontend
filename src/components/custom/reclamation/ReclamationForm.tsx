import { 
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  Divider,
  Fade,
  useTheme,
  InputAdornment,
  keyframes,
} from "@mui/material";
import { useState, useEffect } from "react";
import { ReclamationType } from "../../../services/reclamations/types";
import getAllStatutsReclamation from "../../../services/reclamations/getAllStatutsReclamation";
import {
  Send,
  Cancel,
  Title,
  Description,
  DateRange,
  Comment,
} from "@mui/icons-material";

// Animation glow pour titre
const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 8px rgba(25, 118, 210, 0.7), 0 0 20px rgba(25, 118, 210, 0.5);
  }
  50% {
    text-shadow: 0 0 15px rgba(25, 118, 210, 1), 0 0 30px rgba(25, 118, 210, 0.7);
  }
`;

// Animation vague pour sous-titre
const wave = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(6px);
  }
`;

type Props = {
  onSubmit: (data: ReclamationType) => void;
  defaultData: ReclamationType;
  submitLabel?: string;
  onCancel?: () => void;
};

export default function ReclamationForm({
  onSubmit,
  defaultData,
  submitLabel = "Valider",
  onCancel,
}: Props) {
  const [formData, setFormData] = useState<Partial<ReclamationType>>({});
  const theme = useTheme();

  const handleChange =
    (field: keyof ReclamationType) =>
    (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSwitchChange =
    (field: keyof ReclamationType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.checked });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = { titre: "Titre", description: "Description" };

    for (const [key, label] of Object.entries(requiredFields)) {
      if (!formData[key as keyof ReclamationType]) {
        alert(`${label} est requis`);
        return;
      }
    }

    await onSubmit(formData as ReclamationType);
  };

  useEffect(() => {
    setFormData(defaultData);
  }, [defaultData]);

  useEffect(() => {
    getAllStatutsReclamation();
  }, []);

  const inputStyle = {
    backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#ffffff",
    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
    borderRadius: 2,
    border: "1px solid",
    borderColor: theme.palette.mode === "dark" ? "#444" : "#ccc",
    boxShadow: theme.palette.mode === "dark"
      ? "0 0 8px rgba(150,150,255,0.2)"
      : "0 0 5px rgba(0,0,0,0.1)",
  };

  return (
    <Fade in>
      <Paper
        elevation={12}
        sx={{
          p: 3,
          borderRadius: 4,
          background: theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #121212, #232323, #2e2e2e)"
            : "linear-gradient(135deg,rgb(150, 191, 221),rgb(210, 114, 114))",
          maxWidth: 800,
          mx: "auto",
          mt: "1",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 8,
            height: "100%",
            bgcolor: "primary.main",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
        />

        {/* TITRE ANIME */}
         <Typography
  variant="h4"
  fontWeight="bold"
  textAlign="center"
  gutterBottom
  sx={{
    color:
      theme.palette.mode === "dark"
        ? "#90caf9" // Couleur claire pour le dark mode (ex: bleu clair)
        : theme.palette.primary.main,
  }}
>
  🛠️ Formulaire de Réclamation
</Typography>


        {/* SOUS-TITRE ANIME */}
        <Typography
          textAlign="center"
          color="text.secondary"
          fontStyle="italic"
          mb={1}
          sx={{
            fontSize: "1.1rem",
            fontWeight: 500,
            letterSpacing: 0.8,
            animation: `${wave} 4s ease-in-out infinite`,
            color:
              theme.palette.mode === "dark"
                ? "rgba(200,200,200,0.8)"
                : "rgba(70,70,70,0.85)",
          }}
        >
          Merci de remplir les informations avec précision
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Titre"
              placeholder="Saisissez le titre ici"
              value={formData.titre || ""}
              onChange={handleChange("titre")}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Title sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
                sx: inputStyle,
              }}
            />

            <TextField
              label="Description"
              placeholder="Saisissez la description ici"
              value={formData.description || ""}
              onChange={handleChange("description")}
              required
              fullWidth
              multiline
              rows={4}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description sx={{ color: theme.palette.text.primary }} />
                  </InputAdornment>
                ),
                sx: inputStyle,
              }}
            />

            <TextField
              label="Date de Résolution"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dateResolution || ""}
              onChange={handleChange("dateResolution")}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRange sx={{ color: theme.palette.text.disabled }} />
                  </InputAdornment>
                ),
                sx: inputStyle,
              }}
            />

            <TextField
              label="Commentaire utilisateur"
              placeholder="Ajoutez un commentaire ici"
              value={formData.Commentaireutilisateur || ""}
              onChange={handleChange("Commentaireutilisateur")}
              fullWidth
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Comment sx={{ color: theme.palette.info.main }} />
                  </InputAdornment>
                ),
                sx: inputStyle,
              }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={!!formData.fournisseurIntervenu}
                  onChange={handleSwitchChange("fournisseurIntervenu")}
                  color="primary"
                />
              }
              label={
                formData.fournisseurIntervenu
                  ? "Fournisseur Intervenu : Oui"
                  : "Fournisseur Intervenu : Non"
              }
            />

            <Box display="flex" justifyContent="flex-end" gap={2}>
              {onCancel && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onCancel}
                  startIcon={<Cancel />}
                >
                  Annuler
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                endIcon={<Send />}
                sx={{
                  background:
                    "linear-gradient(to right,rgb(17, 98, 203),rgb(230, 52, 52))",
                  color: "#fff",
                  fontWeight: "bold",
                  px: 4,
                  py: 1,
                  borderRadius: "50px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  textTransform: "none",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    background: "linear-gradient(to right, #5a00e0,rgb(192, 49, 21))",
                  },
                }}
              >
                {submitLabel}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Fade>
  );
}











