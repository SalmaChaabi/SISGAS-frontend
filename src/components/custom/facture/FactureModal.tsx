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
  
  type Props = {
    open: boolean;
    onClose: () => void;
    facture: FactureType | null;
  };
  
  const FactureModal = ({ open, onClose, facture }: Props) => {
    // Fonction pour imprimer
    const handlePrint = () => {
      window.print();
    };
  
    // Fonction pour télécharger la facture en PDF
    const handleDownloadPDF = async () => {
      const input = document.getElementById("facture-content");
    
      if (!input) return;
  
      // Capture le contenu HTML en image via html2canvas
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
  
      // Crée un document PDF via jsPDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      // Calculer la hauteur pour conserver les proportions
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("facture.pdf");
    };
  
    // Si la facture n'existe pas, on ne retourne rien
    if (!facture) return null;
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
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
              <strong> 🗓️ Date Émission :</strong> {facture.date_emission}
            </Typography>
            <Typography>
              <strong> ⏳ Date Échéance :</strong> {facture.date_echeance}
            </Typography>
            <Typography>
              <strong> 💼 Statut Paiement :</strong> {facture.statut_paiement}
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default FactureModal;
  
  
