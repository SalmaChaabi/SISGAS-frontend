import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Button, Box, Modal, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import ConfirmationModal from "../../common/ConfirmationModal";
import ActionCorrectiveForm from "./ActionCorrectiveForm"; // ⚠️ Assure-toi du bon chemin
import { motion } from "framer-motion";
import { ActionCorrectiveType } from "../../../services/actionsCorrectives/types";

interface Props {
  data: ActionCorrectiveType[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updated: ActionCorrectiveType) => void;
  statuts: { nom: string }[]; // Assure-toi que statuts est un tableau d'objets avec 'nom' comme chaîne de caractères
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ActionCorrectiveListDataGrid({
  data,
  onDelete,
  onUpdate,
  statuts,
}: Props) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ActionCorrectiveType | null>(null);

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

  const handleEditClick = (action: ActionCorrectiveType) => {
    setSelectedAction(action);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedAction(null);
  };

  const handleUpdateSubmit = (updatedAction: ActionCorrectiveType) => {
    if (selectedAction && selectedAction._id) {  // Vérifie que _id est défini
      onUpdate(selectedAction._id, updatedAction); 
      handleCloseEditModal();
    } else {
      console.error("ID non défini pour l'action corrective sélectionnée !");
    }
  };
  

  const columns: GridColDef[] = [
    { field: "description", headerName: "Description", flex: 1 },
    { field: "dateAction", headerName: "Date Action", flex: 1 },
    {
      field: "reclamation",
      headerName: "Réclamation",
      flex: 1,
      valueGetter: (reclamation: { titre: string }) => reclamation?.titre,
    },
    {
      field: "statutReclamation",
      headerName: "Statut Réclamation",
      flex: 1,
      valueGetter: (StatutReclamation: { nom: string }) => StatutReclamation?.nom,
    },
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
              onClick={() => handleEditClick(params.row)}
              sx={{
                textTransform: "none",
                backgroundColor: "#1976d2",
                fontWeight: "bold",
                borderRadius: 2,
                paddingX: 2,
                "&:hover": { backgroundColor: "#1565c0" },
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
                "&:hover": { backgroundColor: "#ffe6e6" },
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
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._id || ""}
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

      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Modifier Action Corrective
          </Typography>
          {selectedAction && (
            <ActionCorrectiveForm
              onSubmit={handleUpdateSubmit}
              defaultData={selectedAction}
              submitLabel="Modifier action corrective"
              statuts={statuts}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}


// import React, { useState } from "react";
// import {
//   DataGrid,
//   GridColDef,
//   GridToolbarContainer,
//   GridToolbarExport,
// } from "@mui/x-data-grid";
// import { Button, Box } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import { ActionCorrectiveType } from "../../../services/actionsCorrectives/types";
// import ConfirmationModal from "../../common/ConfirmationModal";
// import { motion } from "framer-motion"; // 🚀 Animation importée

// interface Props {
//   data: ActionCorrectiveType[];
//   onDelete: (id: string) => void;
//   onUpdate: (id: string, updated: ActionCorrectiveType) => void;
// }

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

// export default function ActionCorrectiveListDataGrid({
//   data,
//   onDelete,
//   onUpdate,
// }: Props) {
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [openConfirm, setOpenConfirm] = useState(false);

//   const handleDeleteClick = (id: string) => {
//     setDeleteId(id);
//     setOpenConfirm(true);
//   };

//   const handleConfirmDelete = () => {
//     if (deleteId) {
//       onDelete(deleteId);
//     }
//     setOpenConfirm(false);
//     setDeleteId(null);
//   };

//   const handleCancelDelete = () => {
//     setOpenConfirm(false);
//     setDeleteId(null);
//   };

//   const columns: GridColDef[] = [
//     { field: "description", headerName: "Description", flex: 1 },
//     { field: "dateAction", headerName: "Date Action", flex: 1 },
//     {
//       field: "reclamation",
//       headerName: "Réclamation",
//       flex: 1,
//       valueGetter: (reclamation: { titre: string }) => reclamation?.titre,
//     },
//     {
//       field: "statutReclamation",
//       headerName: "Statut Réclamation",
//       flex: 1,
//       valueGetter: (StatutReclamation: { nom: string }) =>
//         StatutReclamation.nom,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => {
//         return (
//           <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
//             <Button
//               variant="contained"
//               size="small"
//               startIcon={<Edit />}
//               onClick={() => onUpdate(params.row._id, params.row)}
//               sx={{
//                 textTransform: "none",
//                 backgroundColor: "#1976d2",
//                 fontWeight: "bold",
//                 borderRadius: 2,
//                 paddingX: 2,
//                 "&:hover": { backgroundColor: "#1565c0" },
//               }}
//             >
//               Modifier
//             </Button>
//             <Button
//               variant="outlined"
//               size="small"
//               color="error"
//               startIcon={<Delete />}
//               onClick={() => handleDeleteClick(params.row._id)}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 borderRadius: 2,
//                 paddingX: 2,
//                 borderColor: "#f44336",
//                 color: "#f44336",
//                 "&:hover": { backgroundColor: "#ffe6e6" },
//               }}
//             >
//               Supprimer
//             </Button>
//           </Box>
//         );
//       },
//     },
//   ];

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//       >
//         {/* Bouton PDF supprimé ici */}
//         <DataGrid
//           rows={data}
//           columns={columns}
//           getRowId={(row) => row._id}
//           autoHeight
//           pageSizeOptions={[5, 10, 20]}
//           slots={{ toolbar: CustomToolbar }}
//         />
//       </motion.div>

//       <ConfirmationModal
//         open={openConfirm}
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         message="Êtes-vous sûr de vouloir supprimer cette action corrective ?"
//         confirmLabel="Supprimer"
//       />
//     </>
//   );
// }

