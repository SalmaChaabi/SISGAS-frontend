import {
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { ReclamationType } from "../../../services/reclamations/types";
import getAllStatutsReclamation from "../../../services/reclamations/getAllStatutsReclamation";

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

  const handleChange =
    (field: keyof ReclamationType) =>
    (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSelectChange =
    (field: keyof ReclamationType) => (e: SelectChangeEvent<string>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSwitchChange =
    (field: keyof ReclamationType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.checked });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = {
      titre: "Titre",
      description: "Description",
    };

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
    const fetchData = async () => {
      const statutsData = await getAllStatutsReclamation();

    

    };

    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Titre"
              value={formData.titre || ""}
              onChange={handleChange("titre")}
              required
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Description"
              value={formData.description || ""}
              onChange={handleChange("description")}
              required
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          
       
        <Grid size={6}>
          <TextField
            label="Date de Résolution"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dateResolution || ""}
            onChange={handleChange("dateResolution")}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Commentaire de l'utilisateur"
            value={formData.Commentaireutilisateur || ""}
            onChange={handleChange("Commentaireutilisateur")}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        
        <Grid size={6}>
          {/* Rôle */}
         
          {/* Fournisseur Intervenu */}
          <FormControlLabel
            control={
              <Switch
                checked={!!formData.fournisseurIntervenu}
                onChange={handleSwitchChange("fournisseurIntervenu")}
              />
            }
            label={
              formData.fournisseurIntervenu
                ? "Fournisseur Intervenu : Oui"
                : "Fournisseur Intervenu : Non"
            }
          />
        </Grid>
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              Annuler
            </Button>
          )}
 <Button
  type="submit"
  sx={{
    background: "linear-gradient(90deg, #F44336, #E57373)",
    color: "white",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "30px",
    boxShadow: "0 4px 10px rgba(244, 67, 54, 0.4)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    '&:hover': {
      transform: "scale(1.05)",
      boxShadow: "0 6px 15px rgba(244, 67, 54, 0.6)",
      background: "linear-gradient(90deg, #D32F2F, #EF5350)",
    },
  }}
>
  {submitLabel}
</Button>


        </Stack>
      </Stack>
    </form>
  );
}
