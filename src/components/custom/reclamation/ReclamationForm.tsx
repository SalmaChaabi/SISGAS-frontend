import { Button, TextField, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { ReclamationType } from "../../../services/reclamations/types";

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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
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

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Titre" value={formData.titre || ""} onChange={handleChange("titre")} required fullWidth />
        <TextField label="Description" value={formData.description || ""} onChange={handleChange("description")} required fullWidth />
        <TextField label="Statut" value={formData.statut || ""} onChange={handleChange("statut")} required fullWidth />
        <TextField label="Utilisateur" value={formData.utilisateur || ""} onChange={handleChange("utilisateur")} required fullWidth />
        <TextField label="Commentaire Admin" value={formData.commentaireAdmin || ""} onChange={handleChange("commentaireAdmin")} fullWidth />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              Annuler
            </Button>
          )}
          <Button variant="contained" type="submit">
            {submitLabel}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
