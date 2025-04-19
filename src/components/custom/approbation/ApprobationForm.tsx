import { Button, TextField, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ApprobationType } from "../../../services/approbation/types";

type ApprobationFormProps = {
  onSubmit: (data: ApprobationType) => void;
  defaultData: ApprobationType;
  submitLabel?: string;
  onCancel?: () => void; // Nouvelle prop optionnelle
};

const ApprobationForm = ({
  onSubmit,
  defaultData,
  submitLabel = "Valider",
  onCancel, // Nouveau prop
}: ApprobationFormProps) => {
  const [formData, setFormData] = useState<Partial<ApprobationType>>({
    date_approbation: defaultData.date_approbation || "",
    nom_antenne: defaultData.nom_antenne || "",
    puissance_antenne: defaultData.puissance_antenne || "",
    couple_frequence: defaultData.couple_frequence || "",
    type_equipement: defaultData.type_equipement || "",
    position_GPS: defaultData.position_GPS || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Nouvel état

  const handleChange =
    (field: keyof ApprobationType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validation améliorée
      const requiredFields = {
        date_approbation: "Date approbation",
        nom_antenne: "Nom antenne",
        puissance_antenne: "Puissance antenne",
        couple_frequence: "Couple fréquence",
        type_equipement: "Type équipement",
        position_GPS: "Position GPS"
      };
    
      for (const [field, label] of Object.entries(requiredFields)) {
        if (!formData[field as keyof ApprobationType]) {
          alert(`${label} est obligatoire !`);
          return;
        }
      }
    
      try {
        await onSubmit(formData as ApprobationType);
      } catch (error) {
        console.error("Erreur dans le formulaire:", error);
      }
    };
  

  useEffect(() => {
    setFormData({
      date_approbation: defaultData.date_approbation || "",
      nom_antenne: defaultData.nom_antenne || "",
      puissance_antenne: defaultData.puissance_antenne || "",
      couple_frequence: defaultData.couple_frequence || "",
      type_equipement: defaultData.type_equipement || "",
      position_GPS: defaultData.position_GPS || "",
    });
  }, [defaultData]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Date Approbation"
          type="date"
          value={formData.date_approbation || ""}
          onChange={handleChange("date_approbation")}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth // Ajouté
        />
        <TextField
          label="Nom Antenne"
          value={formData.nom_antenne || ""}
          onChange={handleChange("nom_antenne")}
          required
          fullWidth // Ajouté
        />
        <TextField
          label="Puissance Antenne"
          value={formData.puissance_antenne || ""}
          onChange={handleChange("puissance_antenne")}
          required
          fullWidth // Ajouté
        />
        <TextField
          label="Couple Fréquence"
          value={formData.couple_frequence || ""}
          onChange={handleChange("couple_frequence")}
          required
          fullWidth // Ajouté
        />
        <TextField
          label="Type Équipement"
          value={formData.type_equipement || ""}
          onChange={handleChange("type_equipement")}
          required
          fullWidth // Ajouté
        />
        <TextField
          label="Position GPS"
          value={formData.position_GPS || ""}
          onChange={handleChange("position_GPS")}
          required
          fullWidth // Ajouté
        />
        
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && ( // Bouton Annuler conditionnel
            <Button 
              variant="outlined" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
          )}
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default ApprobationForm;