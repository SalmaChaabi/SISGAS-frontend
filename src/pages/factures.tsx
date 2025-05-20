import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepIconProps,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { jsPDF } from "jspdf";
import { getAllFactures } from "../services/factures/getAllFactures";
import { verifierFacture } from "../services/factures/verifierFacture";
import { validerFacture } from "../services/factures/validerFacture";
import ValiderModal from "../components/custom/facture/ValiderModal";
import VerifierModal from "../components/custom/facture/VerifierModal";
import ConfirmationModal from "../components/common/ConfirmationModal";
import useUserRole from "../hooks/useUserRole";

// Type de facture
interface Facture {
  _id: string;
  montant: number;
  date_emission: string;
  date_echeance: string;
  verifiee?: boolean;
  statut?: string;
  statutpaiement: {
    _id: string;
    name: string;
  };
}

// Étapes du workflow des factures
const steps = ["Créée", "Vérifiée", "Validée"];

// Icônes personnalisées pour le stepper
const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, icon } = props;
  const icons: { [index: string]: React.ReactElement } = {
    1: <DescriptionIcon color={completed ? "success" : "disabled"} />,
    2: (
      <SearchIcon
        color={completed ? "success" : active ? "info" : "disabled"}
      />
    ),
    3: (
      <CheckCircleIcon
        color={completed ? "success" : active ? "primary" : "disabled"}
      />
    ),
  };
  return icons[String(icon)];
};

const Factures = () => {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
  });
  const { isComptable } = useUserRole();
  const [openModal, setOpenModal] = useState(false);
  const [selectedFactureId, setSelectedFactureId] = useState<string | null>(
    null
  );
  const [selectedStatut, setSelectedStatut] = useState("Payée");
  const [openVerifierModal, setOpenVerifierModal] = useState(false);
  const [factureIdToVerify, setFactureIdToVerify] = useState<string | null>(
    null
  );

  const factureRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const openValiderModal = (id: string) => {
    setSelectedFactureId(id);
    setOpenModal(true);
  };

  const handleValiderConfirm = async () => {
    if (!selectedFactureId) return;
    try {
      const response = await validerFacture(selectedFactureId);
      setSnackbar({
        open: true,
        message: response.message,
        type: response.success ? "success" : "error",
      });
      fetchFactures();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erreur lors de la validation",
        type: "error",
      });
    } finally {
      setOpenModal(false);
    }
  };

  const handleOpenVerifierModal = (id: string) => {
    setFactureIdToVerify(id);
    setOpenVerifierModal(true);
  };

  const handleVerifierConfirm = async () => {
    if (!factureIdToVerify) return;
    try {
      await verifierFacture(factureIdToVerify);
      setSnackbar({
        open: true,
        message: "Facture vérifiée avec succès",
        type: "success",
      });
      fetchFactures();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erreur lors de la vérification",
        type: "error",
      });
    } finally {
      setOpenVerifierModal(false);
    }
  };

  const fetchFactures = async () => {
    setLoading(true);
    try {
      const response = await getAllFactures();
      setFactures(response.factures);
    } catch (error) {
      console.error("Erreur lors du chargement des factures :", error);
      setSnackbar({
        open: true,
        message: "Erreur lors du chargement des factures",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (statut: string) => {
    if (statut === "Validée" || statut === "Payée") return 3;
    if (statut == "Vérifiée") return 2;
    if (statut == "En attente") return 1;
    return 0;
  };

  const handlePrint = (factureId: string) => {
    const factureElement = factureRefs.current[factureId];
    if (factureElement) {
      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Facture ${factureId}</title>
              <style>
                body { font-family: Arial; margin: 20px; }
                .header { text-align: center; margin-bottom: 20px; }
                .details { margin-bottom: 15px; }
                .footer { margin-top: 30px; font-size: 12px; text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Facture</h1>
              </div>
              ${factureElement.innerHTML}
              <div class="footer">
                <p>Merci pour votre confiance</p>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  };

  const handleExportPDF = (factureId: string) => {
    const facture = factures.find((f) => f._id === factureId);
    if (!facture) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("FACTURE", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`N° ${factureId}`, 105, 30, { align: "center" });
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);

    let yPosition = 45;
    doc.text(
      `Date d'émission: ${new Date(facture.date_emission).toLocaleDateString()}`,
      20,
      yPosition
    );
    doc.text(
      `Date d'échéance: ${new Date(facture.date_echeance).toLocaleDateString()}`,
      20,
      yPosition + 10
    );
    doc.text(`Montant: ${facture.montant} TND`, 20, yPosition + 20);
    doc.text(`Statut: ${facture.statut}`, 20, yPosition + 30);
    doc.setFontSize(10);
    doc.text("Merci pour votre confiance", 105, 280, { align: "center" });
    doc.save(`facture_${factureId}.pdf`);
  };

  useEffect(() => {
    fetchFactures();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Liste des factures
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : factures.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          Aucune facture disponible
        </Typography>
      ) : (
        factures.map((facture) => {
          return (
            <Paper
              key={facture._id}
              sx={{
                mb: 3,
                p: 3,
                position: "relative",
                borderLeft: "4px solid",
                borderColor:
                  facture.statut === "Payée"
                    ? "success.main"
                    : facture.verifiee
                      ? "info.main"
                      : "grey.500",
              }}
              ref={(el) => {
                factureRefs.current[facture._id] = el;
              }}
            >
              <Typography variant="h6" gutterBottom>
                Facture #{facture._id.slice(-6).toUpperCase()}
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={4} mb={2}>
                <Box>
                  <Typography>
                    <strong>💵 Montant :</strong> {facture.montant} TND
                  </Typography>
                  <Typography>
                    <strong>🗓️ Date Émission :</strong>{" "}
                    {new Date(facture.date_emission).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    <strong>⏳ Date Échéance :</strong>{" "}
                    {new Date(facture.date_echeance).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>📌 Statut :</strong>{" "}
                    {facture.statutpaiement.name || "En attente"}
                  </Typography>
                </Box>
              </Box>

              <Box my={3}>
                <Stepper
                  activeStep={getStepIndex(facture.statutpaiement.name)}
                  alternativeLabel
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={CustomStepIcon}>
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Box mt={3} display="flex" gap={2} flexWrap="wrap">
                {facture.statutpaiement.name == "En attente" && isComptable && (
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => handleOpenVerifierModal(facture._id)}
                    startIcon={<SearchIcon />}
                  >
                    Vérifier
                  </Button>
                )}

                {facture.statutpaiement.name == "Vérifiée" && isComptable && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => openValiderModal(facture._id)}
                  >
                    Valider
                  </Button>
                )}

                <Button
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  onClick={() => handlePrint(facture._id)}
                  sx={{ ml: "auto" }}
                >
                  Imprimer
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={() => handleExportPDF(facture._id)}
                >
                  Export PDF
                </Button>
              </Box>
            </Paper>
          );
        })
      )}

      {/* <ValiderModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleValiderConfirm}
        selectedStatut={selectedStatut}
        setSelectedStatut={setSelectedStatut}
      /> */}
      <ConfirmationModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onConfirm={handleValiderConfirm}
        message="Êtes-vous sûr de vouloir valider cette facture ?"
      />
      <ConfirmationModal
        open={openVerifierModal}
        onCancel={() => setOpenVerifierModal(false)}
        onConfirm={handleVerifierConfirm}
        message="Êtes-vous sûr de vouloir confirmer cette action ?"
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.type}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Factures;
