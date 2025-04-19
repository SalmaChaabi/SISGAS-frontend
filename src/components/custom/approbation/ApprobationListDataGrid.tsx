import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { ApprobationType } from "../../../services/approbation";
import ApprobationItemActions from "./ApprobationItemActions";
import { getFactureByApprobationId } from "../../../services/facture/getFactureByApprobationId";
import { FactureType } from "../../../services/facture/FactureType";
import FactureModal from "../facture/FactureModal";

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
    <>
      <DataGrid rows={data} columns={columns} getRowId={(row) => row._id} />
      <FactureModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        facture={selectedFacture}
      />
    </>
  );
};

export default ApplicationDataGrid;


