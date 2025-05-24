import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ReclamationItemActions from "./ReclamationItemActions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useState, useRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ReclamationType } from "../../../services/reclamations/types";
import { ActionCorrectiveType } from "../../../services/reclamations/ActionCorrectiveType";
import useUserRole from "../../../hooks/useUserRole";




type Props = {
  data: ReclamationType[];

  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    data: ReclamationType
  ) => Promise<{ success: boolean; message: string; data: any }>;
  getStatusIcon: (status: string) => React.ReactElement;

};

export default function ReclamationListDataGrid({
  data,
  onDelete,
  onUpdate,
  
}: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActions, setSelectedActions] = useState<
    ActionCorrectiveType[]
  >([]);
  const printRef = useRef(null);
  const { isAdmin, isTechnicien, isComptable ,isFournisseur } = useUserRole();


  const handleViewActions = (actions: ActionCorrectiveType[]) => {
    setSelectedActions(actions);
    setOpenDialog(true);
  };

const handleExportPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Liste des réclamations", 14, 20);

  const rows = data.map((item) => [
    item.titre ?? "-",
    item.description ?? "-",
    item.dateCreation
      ? new Date(item.dateCreation).toLocaleDateString("fr-FR")
      : "-",
    item.dateResolution
      ? new Date(item.dateResolution).toLocaleDateString("fr-FR")
      : "-",
    item.Commentaireutilisateur ?? "-",
    item.fournisseurIntervenu ? "Oui" : "Non",
    item.statut?.nom ?? "-",
    item.utilisateur
      ? `${item.utilisateur.firstName} ${item.utilisateur.lastName}`
      : "-",
    item.role?.name ?? "-",
    item.actionsCorrectives?.length || 0,
  ]);

  autoTable(doc, {
    startY: 30,
    head: [
      [
        "Titre",
        "Description",
        "Date Création",
        "Date Résolution",
        "Commentaire de l'utilisateur",
        "Fournisseur Intervenu",
        "Statut",
        "Utilisateur",
        "Rôle",
        "Nb. Actions Correctives",
      ],
    ],
    body: rows,
  });

  doc.save("liste-des-reclamations.pdf");
};

  const handlePrintTable = () => {
  const tableHTML = `
    <html>
      <head>
        <title>Liste des réclamations</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            font-family: Arial, sans-serif;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f5f5f5;
          }
        </style>
      </head>
      <body>
        <h2>Liste des réclamations</h2>
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Date Création</th>
              <th>Date Résolution</th>
              <th>Commentaire de l'utilisateur</th>
              <th>Fournisseur Intervenu</th>
              <th>Statut</th>
              <th>Utilisateur</th>
              <th>Rôle</th>
              <th>Nb. Actions Correctives</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (item) => `
              <tr>
                <td>${item.titre ?? "-"}</td>
                <td>${item.description ?? "-"}</td>
                <td>${
                  item.dateCreation
                    ? new Date(item.dateCreation).toLocaleDateString("fr-FR")
                    : "-"
                }</td>
                <td>${
                  item.dateResolution
                    ? new Date(item.dateResolution).toLocaleDateString("fr-FR")
                    : "-"
                }</td>
                <td>${item.Commentaireutilisateur ?? "-"}</td>
                <td>${item.fournisseurIntervenu ? "Oui" : "Non"}</td>
                <td>${item.statut?.nom ?? "-"}</td>
                <td>${
                  item.utilisateur
                    ? `${item.utilisateur.firstName} ${item.utilisateur.lastName}`
                    : "-"
                }</td>
                <td>${item.role?.name ?? "-"}</td>
                <td>${item.actionsCorrectives?.length || 0}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.print();
  }
};

  const columns: GridColDef[] = [
    { field: "titre", headerName: "Titre", flex: 1 },
    { field: "description", headerName: "Description", flex: 1.5 },
    { field: "dateCreation", headerName: "Date Création", flex: 1 },
    { field: "dateResolution", headerName: "Date Résolution", flex: 1 },
    {
      field: "Commentaireutilisateur",
      headerName: "Commentaire de l'utilisateur",
      flex: 1.5,
    },
    {
      field: "fournisseurIntervenu",
      headerName: "Fournisseur Intervenu",
      flex: 1,
      renderCell: (params) => (params.value ? "Oui" : "Non"),
    },
    {
      field: "statut",
      headerName: "Statut",
      flex: 1,
      valueGetter: (statut:{nom:string}) => statut.nom,
    },
    {
      field: "utilisateur",
      headerName: "Utilisateur",
      flex: 1,
      valueGetter: (user: { firstName: string; lastName: string }) =>
        `${user.firstName} ${user.lastName}`,
    },
    {
      field: "role",
      headerName: "Rôle",
      flex: 1,
      valueGetter: (role:{name:string}) => role.name,
    },
    {
      field: "actionsCorrectives",
      headerName: "Actions Correctives",
      flex: 1.5,
      renderCell: (params) => {
        const actions = params.row.actionsCorrectives || [];
        return (
          <Button
            variant="contained"
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={() => handleViewActions(actions)}
          >
            Voir ({actions.length})
          </Button>
        );
      },
    },
     ...(isAdmin || isTechnicien || isComptable
    ? [
       {
  field: "actions",
  headerName: "Actions",
  width: 150,
  renderCell: (params: GridRenderCellParams) => (
    <ReclamationItemActions
      reclamationId={params.id.toString()}
      onDelete={() => onDelete(params.id.toString())}
      onUpdate={onUpdate}
    />
  ),
}
      ]
    : []),
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
       {(isAdmin || isFournisseur) && (
  <Button href="/actionsCorrectives">
    résoudre problèmes
  </Button>
)}


        <Button
          variant="contained"
          color="primary"
          onClick={handleExportPDF}
          sx={{
            backgroundColor: "#3f51b5", // Bleu standard
            "&:hover": {
              backgroundColor: "#303f9f", // Bleu plus foncé au survol
            },
            fontWeight: "bold",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
          }}
          startIcon={<PrintIcon />}
        >
          Exporter en PDF
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handlePrintTable}
          sx={{
            backgroundColor: "#4CAF50", // Vert
            "&:hover": {
              backgroundColor: "#388E3C", // Vert foncé au survol
            },
            fontWeight: "bold",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
          }}
          startIcon={<PrintIcon />}
        >
          Imprimer la liste des réclamations
        </Button>
      </div>

      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id!}
        autoHeight
        sx={{ mt: 2 }}
        pageSizeOptions={[10, 20, 50]}
        pagination
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Actions Correctives</DialogTitle>
        <DialogContent dividers>
          <div ref={printRef}>
            <List>
              {selectedActions.length > 0 ? (
                selectedActions.map((action, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <>
                          {action.description && (
                            <div>{action.description}</div>
                          )}
                          {action.dateAction && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 4,
                              }}
                            >
                              <CalendarTodayIcon
                                sx={{
                                  fontSize: 16,
                                  marginRight: 1,
                                  color: "primary.main",
                                }}
                              />
                              {new Date(action.dateAction).toLocaleDateString(
                                "fr-FR",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="Aucune action corrective" />
                </ListItem>
              )}
            </List>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExportPDF} variant="outlined" color="primary">
            Exporter en PDF
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
