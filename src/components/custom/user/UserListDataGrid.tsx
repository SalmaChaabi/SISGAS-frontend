import {
  Avatar,
  Button,
  Paper,
  Snackbar,
  Stack,
  Typography,
  LinearProgress,
  Alert,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { addUser, AddUserParam } from "../../../services/users/addUser";
import { deleteUser } from "../../../services/users/deleteUser";
import UserItemActions from "./UserItemActions";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useState } from "react";

type UserListProps = {
  data: any;
  onDelete: (id: string) => void;
  onUpdate: (
    userId: string,
    user: AddUserParam
  ) => Promise<{ success: boolean; message: string; data: any }>;
};

const UserList = ({ data, onDelete, onUpdate }: UserListProps) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "user_image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const handleDelete = async () => {
          try {
            await deleteUser(params.id.toString());
            onDelete(params.id.toString());
          } catch (err) {
            console.error("Failed to delete user", err);
          }
        };
        return (
          <UserItemActions
            onDelete={handleDelete}
            onUpdate={onUpdate}
            userId={params.id.toString()}
          />
        );
      },
    },
  ];

  const handleExportPDF = () => {
    setLoading(true);
    setTimeout(() => {
      const doc = new jsPDF();
      const tableColumn = ["First Name", "Last Name", "Email", "Role"];
      const tableRows = data.map((user: any) => [
        user.firstName,
        user.lastName,
        user.email,
        user.role,
      ]);
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
      });
      doc.save("user-list.pdf");
      setLoading(false);
      setSnackbar({ open: true, message: "PDF exporté avec succès" });
    }, 1000);
  };

  const handlePrint = () => {
    setLoading(true);
    setTimeout(() => {
      const printWindow = window.open("", "_blank");
      if (!printWindow) return;
      const tableHtml = `
        <html>
          <head>
            <title>User List</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h2 { text-align: center; color: #4A148C; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background: linear-gradient(45deg, #7E57C2, #43A047); color: white; }
            </style>
          </head>
          <body>
            <h2>User List</h2>
            <table>
              <thead>
                <tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Role</th></tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (user: any) =>
                      `<tr><td>${user.firstName}</td><td>${user.lastName}</td><td>${user.email}</td><td>${user.role}</td></tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>`;
      printWindow.document.write(tableHtml);
      printWindow.document.close();
      printWindow.print();
      setLoading(false);
      setSnackbar({ open: true, message: "Impression lancée avec succès" });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        {loading && <LinearProgress color="secondary" sx={{ mb: 2 }} />}
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            User List
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={handlePrint}
              startIcon={<PrintIcon />}
              disabled={loading}
              sx={{
                background: "linear-gradient(45deg, #7E57C2, #9575CD)",
                color: "#fff",
                "&:hover": { background: "linear-gradient(45deg, #5E35B1, #7E57C2)" },
                textTransform: "none",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              Imprimer
            </Button>
            <Button
              variant="contained"
              onClick={handleExportPDF}
              startIcon={<PictureAsPdfIcon />}
              disabled={loading}
              sx={{
                background: "linear-gradient(45deg, #43A047, #66BB6A)",
                color: "#fff",
                "&:hover": { background: "linear-gradient(45deg, #388E3C, #43A047)" },
                textTransform: "none",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              Export PDF
            </Button>
          </Stack>
        </Stack>

        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
          autoHeight
          disableRowSelectionOnClick
        />
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ open: false, message: "" })}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default UserList;





