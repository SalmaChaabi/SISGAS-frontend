import React, { useState } from "react";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import { Edit, Delete, PictureAsPdf } from "@mui/icons-material";
import { ActionCorrectiveType } from "../../../services/actionsCorrectives/types";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ConfirmationModal from "../../common/ConfirmationModal";
import { motion } from "framer-motion"; // 🚀 Animation importée

interface Props {
  data: ActionCorrectiveType[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updated: ActionCorrectiveType) => void;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ActionCorrectiveListDataGrid({ data, onDelete, onUpdate }: Props) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
    }
    setOpenConfirm(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setDeleteId(null);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm"
    });

    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text("Liste des Actions Correctives", 105, 15, { align: "center" });

    const pdfData = data.map(item => [
      String(item.description || "-"),
      String(item.dateAction || "-"),
      String(item.reclamation || "-"),
      String(item.statutReclamation || "-")
    ]);

    autoTable(doc, {
      head: [["Description", "Date Action", "Réclamation", "Statut Réclamation"]],
      body: pdfData,
      startY: 25,
      margin: { top: 20 },
      headStyles: {
        fillColor: [41, 118, 210],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 10
      },
      styles: {
        fontSize: 9,
        cellPadding: 2,
        overflow: 'linebreak',
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 30 },
        2: { cellWidth: 50 },
        3: { cellWidth: 40 }
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      }
    });

    doc.save(`actions_correctives_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const columns: GridColDef[] = [
    { field: "description", headerName: "Description", flex: 1 },
    { field: "dateAction", headerName: "Date Action", flex: 1 },
    { field: "reclamation", headerName: "Réclamation", flex: 1,valueGetter: (reclamation:{titre:string}) => reclamation.titre },
    { field: "statutReclamation", headerName: "Statut Réclamation", flex: 1,valueGetter: (StatutReclamation:{nom:string}) => StatutReclamation.nom },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<Edit />}
              onClick={() => onUpdate(params.row._id, params.row)}
              sx={{
                textTransform: "none",
                backgroundColor: "#1976d2",
                fontWeight: "bold",
                borderRadius: 2,
                paddingX: 2,
                "&:hover": { backgroundColor: "#1565c0" }
              }}
            >
              Modifier
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<Delete />}
              onClick={() => handleDeleteClick(params.row._id)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 2,
                paddingX: 2,
                borderColor: "#f44336",
                color: "#f44336",
                "&:hover": { backgroundColor: "#ffe6e6" }
              }}
            >
              Supprimer
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PictureAsPdf />}
            onClick={handleExportPDF}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              paddingX: 2,
            }}
          >
            Exporter en PDF
          </Button>
        </Box>

        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
          slots={{ toolbar: CustomToolbar }}
        />
      </motion.div>

      <ConfirmationModal
        open={openConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Êtes-vous sûr de vouloir supprimer cette action corrective ?"
        confirmLabel="Supprimer"
      />
    </>
  );
}



