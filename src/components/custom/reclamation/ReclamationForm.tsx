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
import { getAllRoles } from "../../../services/users/getAllRoles";

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
  const [statuts, setStatuts] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);

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
      statut: "Statut",
      utilisateur: "Utilisateur",
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
      const rolesData = await getAllRoles();

      // Vérifie si rolesData contient bien un tableau sous la propriété 'data'
      if (rolesData.success && Array.isArray(rolesData.data)) {
        setRoles(rolesData.data); // Utilise les données retournées dans 'data'
      } else {
        console.error("Erreur: rolesData n'est pas un tableau valide.");
      }

      setStatuts(statutsData);
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
          <Grid size={12}>
            <TextField
              label="Utilisateur"
              value={formData.utilisateur || ""}
              onChange={handleChange("utilisateur")}
              required
              fullWidth
            />
          </Grid>
        <Grid size={6}>
          <TextField
            label="Date de Création"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dateCreation || ""}
            onChange={handleChange("dateCreation")}
            fullWidth
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
          {/* Statut */}
          <FormControl fullWidth required>
            <InputLabel>Statut</InputLabel>
            <Select
              value={formData.statut || ""}
              onChange={handleSelectChange("statut")}
              label="Statut"
            >
              {statuts.map((statut) => (
                <MenuItem key={statut._id} value={statut._id}>
                  {statut.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={6}>
          {/* Rôle */}
          <FormControl fullWidth>
            <InputLabel>Rôle</InputLabel>
            <Select
              value={formData.role || ""}
              onChange={handleSelectChange("role")}
              label="Rôle"
            >
              {roles.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.name}{" "}
                  {/* Assure-toi d'utiliser 'name' au lieu de 'nom' si c'est bien le champ */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
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
