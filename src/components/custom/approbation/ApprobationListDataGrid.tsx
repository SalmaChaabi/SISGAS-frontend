import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Stack,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { ApprobationType } from "../../../services/approbation";
import ApprobationItemActions from "./ApprobationItemActions";
import { getFactureByApprobationId } from "../../../services/facture/getFactureByApprobationId";
import { FactureType } from "../../../services/facture/FactureType";
import FactureModal from "../facture/FactureModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

type ApprobationListDataGridProps = {
  data: ApprobationType[];
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    user: ApprobationType
  ) => Promise<{ success: boolean; message: string; data: any }>;
};

const ApprobationListDataGrid = ({
  data,
  onDelete,
  onUpdate,
}: ApprobationListDataGridProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState<FactureType | null>(null);

  const handleOpenFacture = async (approbationId: string) => {
    try {
      const facture = await getFactureByApprobationId(approbationId);
      setSelectedFacture(facture);
      setOpenModal(true);
    } catch (error) {
      console.error("Erreur lors du chargement de la facture", error);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Date Approbation",
      "Antenne",
      "Puissance",
      "Couple Fréquence",
      "Type Équipement",
      "Position GPS",
    ];
    const tableRows = data.map((a) => [
      a.date_approbation,
      a.nom_antenne,
      a.puissance_antenne,
      a.couple_frequence,
      a.type_equipement,
      a.position_GPS,
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });
    doc.save("approbation-list.pdf");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const tableHtml = `
      <html>
        <head><title>Liste des Approbations</title></head>
        <body>
          <h2>Liste des Approbations</h2>
          <table border="1" style="width:100%;border-collapse:collapse">
            <thead>
              <tr>
                <th>Date Approbation</th>
                <th>Antenne</th>
                <th>Puissance</th>
                <th>Couple Fréquence</th>
                <th>Type Équipement</th>
                <th>Position GPS</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (a) => `
                    <tr>
                      <td>${a.date_approbation}</td>
                      <td>${a.nom_antenne}</td>
                      <td>${a.puissance_antenne}</td>
                      <td>${a.couple_frequence}</td>
                      <td>${a.type_equipement}</td>
                      <td>${a.position_GPS}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>`;
    printWindow.document.write(tableHtml);
    printWindow.document.close();
    printWindow.print();
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((a) => ({
      "Date Approbation": a.date_approbation,
      "Antenne": a.nom_antenne,
      "Puissance": a.puissance_antenne,
      "Couple Fréquence": a.couple_frequence,
      "Type Équipement": a.type_equipement,
      "Position GPS": a.position_GPS,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Approbation List");
    XLSX.writeFile(workbook, "approbation-list.xlsx");
  };

  const columns: GridColDef[] = [
    { field: "date_approbation", headerName: "Date Approbation", width: 150 },
    { field: "nom_antenne", headerName: "Antenne", width: 150 },
    { field: "puissance_antenne", headerName: "Puissance", width: 150 },
    { field: "couple_frequence", headerName: "Couple Fréquence", width: 150 },
    { field: "type_equipement", headerName: "Type Équipement", width: 150 },
    { field: "position_GPS", headerName: "Position GPS", width: 150 },
    {
      field: "facture",
      headerName: "Facture",
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleOpenFacture(params.id.toString())}
          color="primary"
        >
          <Visibility />
        </IconButton>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <ApprobationItemActions
          approbationId={params.id.toString()}
          onDelete={() => onDelete(params.id.toString())}
          onUpdate={onUpdate}
        />
      ),
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Liste des Approbations
        </Typography>
        <Stack direction="row" spacing={2}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              sx={{
                background: "linear-gradient(to right, #f48fb1, #ec407a)",
                color: "#fff",
                textTransform: "none",
                borderRadius: 2,
                boxShadow: 2,
                "&:hover": {
                  background: "linear-gradient(to right, #f06292, #d81b60)",
                },
              }}
            >
              Imprimer
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="contained"
              startIcon={<PictureAsPdfIcon />}
              onClick={handleExportPDF}
              sx={{
                background: "linear-gradient(to right, #a1887f, #6d4c41)",
                color: "#fff",
                textTransform: "none",
                borderRadius: 2,
                boxShadow: 2,
                "&:hover": {
                  background: "linear-gradient(to right, #8d6e63, #5d4037)",
                },
              }}
            >
              Export PDF
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportExcel}
              sx={{
                background: "linear-gradient(to right, #81c784, #388e3c)",
                color: "#fff",
                textTransform: "none",
                borderRadius: 2,
                boxShadow: 2,
                "&:hover": {
                  background: "linear-gradient(to right, #66bb6a, #2e7d32)",
                },
              }}
            >
              Export Excel
            </Button>
          </motion.div>
        </Stack>
      </Stack>

      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        autoHeight
      />

      <FactureModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        facture={selectedFacture}
      />
    </Paper>
  );
};

export default ApprobationListDataGrid;







