import { Button, TextField, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ApprobationType } from "../../../services/approbation/types";

type ApprobationFormProps = {
  onSubmit: (data: ApprobationType) => void;
  defaultData: ApprobationType;
  submitLabel?: string;
};

const ApprobationForm = ({
  onSubmit,
  defaultData,
  submitLabel = "Valider",
}: ApprobationFormProps) => {
  const [formData, setFormData] = useState<ApprobationType>({
    date_approbation: defaultData.date_approbation || "",
    nom_antenne: defaultData.nom_antenne || "",
    puissance_antenne: defaultData.puissance_antenne || "",
    couple_frequence: defaultData.couple_frequence || "",
    type_equipement: defaultData.type_equipement || "",
    position_GPS: defaultData.position_GPS || "",
  });

  const handleChange =
    (field: keyof ApprobationType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  useEffect(() => {
    setFormData(defaultData);
  }, [defaultData]);
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Date Approbation"
          type="date"
          value={formData.date_approbation}
          onChange={handleChange("date_approbation")}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Nom Antenne"
          value={formData.nom_antenne}
          onChange={handleChange("nom_antenne")}
          required
        />
        <TextField
          label="Puissance Antenne"
          value={formData.puissance_antenne}
          onChange={handleChange("puissance_antenne")}
          required
        />
        <TextField
          label="Couple Fréquence"
          value={formData.couple_frequence}
          onChange={handleChange("couple_frequence")}
          required
        />
        <TextField
          label="Type Équipement"
          value={formData.type_equipement}
          onChange={handleChange("type_equipement")}
          required
        />
        <TextField
          label="Position GPS"
          value={formData.position_GPS}
          onChange={handleChange("position_GPS")}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          {submitLabel}
        </Button>
      </Stack>
    </form>
  );
};

export default ApprobationForm;
