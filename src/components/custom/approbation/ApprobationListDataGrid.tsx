import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AddUserAdminType } from "../../../services/users/addUserAdmin";
import { deleteUser } from "../../../services/users/deleteUser";
import { IconButton } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ApprobationItemActions from "./ApprobationItemActions";
import { ApprobationType } from "../../../services/approbation";

type ApplicationDataGridProps = {
  data: any;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    user: ApprobationType
  ) => Promise<{ success: boolean; message: string; data: any }>;
};

const ApplicationDataGrid = ({
  data,
  onDelete,
  onUpdate,
}: ApplicationDataGridProps) => {
  const handleOpenFacture = (facture: any) => {
    console.log("Voir Facture:", facture);
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
          onClick={() => handleOpenFacture(params.value)}
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
        // <>
        //   <IconButton onClick={() => handleEdit(params.row)} color="warning">
        //     <Edit />
        //   </IconButton>
        //   <IconButton
        //     onClick={() => onDelete(params.id.toString())}
        //     color="error"
        //   >
        //     <Delete />
        //   </IconButton>
        // </>
        <ApprobationItemActions
          approbationId={params.id.toString()}
          onDelete={() => onDelete(params.id.toString())}
          onUpdate={onUpdate}
        />
      ),
    },
  ];

  return <DataGrid rows={data} columns={columns} getRowId={(row) => row._id} />;
};

export default ApplicationDataGrid;
