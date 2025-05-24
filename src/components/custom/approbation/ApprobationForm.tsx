import {
  Button,
  TextField,
  Stack,
  Typography,
  Fade,
  Tooltip,
  Box,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useEffect, useState } from "react";
import { ApprobationType } from "../../../services/approbation/types";

type ApprobationFormProps = {
  onSubmit: (data: ApprobationType) => void;
  defaultData: ApprobationType;
  submitLabel?: string;
  onCancel?: () => void;
};

const gpsRegex =
  /^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?((1[0-7]\d|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/;

const ApprobationForm = ({
  onSubmit,
  defaultData,
  submitLabel = "Valider",
  onCancel,
}: ApprobationFormProps) => {
  const [formData, setFormData] = useState<Partial<ApprobationType>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  

  const handleChange =
    (field: keyof ApprobationType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
      setErrors({ ...errors, [field]: "" });
    };

  const validateGPS = (value: string) => gpsRegex.test(value.trim());
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof ApprobationType)[] = [
      "nom_antenne",
      "puissance_antenne",
      "couple_frequence",
      "type_equipement",
      "position_GPS",
    ];

    const newErrors: { [key: string]: string } = {};
    let hasError = false;

    for (const field of requiredFields) {
      const value = formData[field];
      if (!value) {
        newErrors[field] = "Ce champ est obligatoire";
        hasError = true;
      } else if (field === "position_GPS" && !validateGPS(value)) {
        newErrors[field] = "Format invalide (ex: 36.8065, 10.1815)";
        hasError = true;
      }
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData as ApprobationType);
    } catch (error) {
      console.error("Erreur dans le formulaire:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setFormData({
      nom_antenne: defaultData.nom_antenne || "",
      puissance_antenne: defaultData.puissance_antenne || "",
      couple_frequence: defaultData.couple_frequence || "",
      type_equipement: defaultData.type_equipement || "",
      position_GPS: defaultData.position_GPS || "",
    });
  }, [defaultData]);

  return (
    <Fade in timeout={400}>
      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          padding: 4,
          borderRadius: 4,
          boxShadow: 3,
          background: "linear-gradient(300deg, #fdfcfb 0%, #e2d1c3 100%)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} alignItems="center" mb={2}>
            <ChecklistIcon sx={{ fontSize: 50, color: "#32CD32" }} />
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{
                background: "linear-gradient(45deg, #32CD32, #8B4513, #FF69B4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              Formulaire d'approbation
            </Typography>
          </Stack>

          <Stack spacing={3}>
            
            
            <TextField
              label="Nom Antenne"
              value={formData.nom_antenne || ""}
              onChange={handleChange("nom_antenne")}
              error={!!errors.nom_antenne}
              helperText={errors.nom_antenne}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#32CD32",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF69B4",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                },
                "& .MuiInputBase-input": {
                  color: "#000000",
                },
              }}
            />
            <TextField
              label="Puissance Antenne"
              value={formData.puissance_antenne || ""}
              onChange={handleChange("puissance_antenne")}
              error={!!errors.puissance_antenne}
              helperText={errors.puissance_antenne}
              fullWidth
              type="number"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#32CD32",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF69B4",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                },
                "& .MuiInputBase-input": {
                  color: "#000000",
                },
              }}
            />
            <TextField
              label="Couple Fréquence"
              value={formData.couple_frequence || ""}
              onChange={handleChange("couple_frequence")}
              error={!!errors.couple_frequence}
              helperText={errors.couple_frequence}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#32CD32",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF69B4",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                },
                "& .MuiInputBase-input": {
                  color: "#000000",
                },
              }}
            />
            <TextField
              label="Type Équipement"
              value={formData.type_equipement || ""}
              onChange={handleChange("type_equipement")}
              error={!!errors.type_equipement}
              helperText={errors.type_equipement}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#32CD32",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF69B4",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                },
                "& .MuiInputBase-input": {
                  color: "#000000",
                },
              }}
            />
            <TextField
              label="Position GPS"
              placeholder="ex: 36.8065, 10.1815"
              value={formData.position_GPS || ""}
              onChange={handleChange("position_GPS")}
              error={!!errors.position_GPS}
              helperText={errors.position_GPS}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#32CD32",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF69B4",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                },
                "& .MuiInputBase-input": {
                  color: "#000000",
                },
              }}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              {onCancel && (
                <Tooltip title="Annuler et fermer le formulaire">
                  <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    sx={{
                      borderRadius: 20,
                      padding: "10px 20px",
                      textTransform: "none",
                      color: "#d32f2f",
                      borderColor: "#d32f2f",
                      "&:hover": {
                        backgroundColor: "#d32f2f",
                        color: "#fff",
                      },
                    }}
                  >
                    Annuler
                  </Button>
                </Tooltip>
              )}
          <Button
          
  variant="contained"
  type="submit"
  disabled={isSubmitting}
  sx={{
    borderRadius: 20,
    padding: "10px 30px",
    textTransform: "none",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    gap: 1.2,
    fontWeight: "bold",
    background: isSubmitting
      ? "#e0e0e0"
      : "linear-gradient(45deg, #32CD32, #8B4513, #FF69B4)",
    color: isSubmitting ? "#9e9e9e" : "#fff",
    "&:hover": {
      background: "linear-gradient(45deg, #FF69B4, #8B4513, #32CD32)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-75%",
      width: "50%",
      height: "100%",
      background:
        "linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.2) 100%)",
        
      transform: "skewX(-20deg)",
    },
    "@keyframes shine": {
      "0%": { left: "-75%" },
      "100%": { left: "125%" },
    },
  }}
>
  <ChecklistIcon
    sx={{
      fontSize: 24,
      animation: "pop 0.6s ease",
    }}
  />
  {isSubmitting ? "Envoi en cours..." : submitLabel}
</Button>

            </Stack>
          </Stack>
        </form>
      </Box>
    </Fade>
  );
};

export default ApprobationForm;






