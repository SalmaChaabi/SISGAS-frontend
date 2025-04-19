import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { ArrowBack, Print } from "@mui/icons-material";
import { FactureType } from "../../../services/facture/FactureType";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";

type StatutPaiement = {
  _id: string;
  nomStatut: string;
  montant: number;
  datePaiement: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  facture: FactureType | null;
};

const FactureModal = ({ open, onClose, facture }: Props) => {
  const [statuts, setStatuts] = useState<StatutPaiement[]>([]);

  useEffect(() => {
    const fetchStatutsPaiement = async () => {
      if (!facture?._id) return;

      try {
        const response = await fetch(`/api/statut-paiement/by-facture/${facture._id}`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des statuts");
        }
        const data = await response.json();
        setStatuts(data);
      } catch (err) {
        console.error("Erreur fetch statuts paiement :", err);
      }
    };

    fetchStatutsPaiement();
  }, [facture]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById("facture-content");

    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("facture.pdf");
  };

  if (!facture) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={onClose}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6">Détails de la Facture</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={handlePrint} color="primary">
              <Print />
            </IconButton>
            <Button variant="outlined" onClick={handleDownloadPDF}>
              📥 Télécharger PDF
            </Button>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent id="facture-content">
        <Stack spacing={2}>
          <Typography>
            <strong>💵 Montant :</strong> {facture.montant} TND
          </Typography>
          <Typography>
            <strong>🗓️ Date Émission :</strong> {facture.date_emission}
          </Typography>
          <Typography>
            <strong>⏳ Date Échéance :</strong> {facture.date_echeance}
          </Typography>

          <Typography  sx={{ mt: 2 }}>
            📄 Statuts de Paiement : {facture.statutpaiement}
          </Typography>
         
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default FactureModal;

  
