import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Snackbar,
  Alert,
  TextField,
  Box,
  Stack,
  InputAdornment,
} from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { motion } from "framer-motion";
import createActionCorrective from "../../../services/actionsCorrectives/createActionCorrective";
import { useSession } from "../../../SessionContext";
import { ActionCorrectiveType } from "../../../services/actionsCorrectives/types";
import getAllStatutsReclamation from "../../../services/reclamations/getAllStatutsReclamation";
import type { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ActionCorrectiveDialogProps = {
  id: string;
};

const ActionCorrectiveDialog: React.FC<ActionCorrectiveDialogProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const { session } = useSession();
  const userId = session?.user.id;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDescription("");
    setOpen(false);
  };

  const handleSnackbarClose = () =>
    setSnackbar({ ...snackbar, open: false });

  const handleCreate = async () => {
    if (!userId) return;

    const newData: ActionCorrectiveType = { description };

    try {
      const response = await createActionCorrective(userId, id, newData);
      if (response.success && response.data) {
        setSnackbar({
          open: true,
          message: "Action corrective ajoutée avec succès.",
          severity: "success",
        });
        handleClose();
      } else {
        setSnackbar({
          open: true,
          message: "Échec de l'ajout de l'action corrective.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      setSnackbar({
        open: true,
        message: "Une erreur est survenue.",
        severity: "error",
      });
    }
  };

 

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        startIcon={<SettingsSuggestIcon />}
        sx={{
          borderRadius: 3,
          textTransform: "none",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            background: "linear-gradient(135deg, #5a67d8, #6b46c1)",
            transform: "scale(1.05)",
          },
        }}
      >
        Résoudre
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            fontWeight: "bold",
            fontSize: "1.4rem",
            background: "linear-gradient(to right, #43cea2, #185a9d)",
            color: "#fff",
            py: 2,
            mb: 1,
            borderRadius: "4px 4px 0 0",
          }}
        >
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <PrecisionManufacturingIcon fontSize="large" />
          </motion.div>
          Ajouter une Action Corrective
        </DialogTitle>

        <DialogContent>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2, px: 1 }}>
              <TextField
                label="Description de l'action"
                placeholder="Décris l'action corrective à appliquer..."
                multiline
                fullWidth
                rows={5}
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <PrecisionManufacturingIcon color="primary" />
                      </motion.div>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "1rem",
                  },
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                }}
              />

              <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
                <Button
                  onClick={handleCreate}
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    borderRadius: 10,
                    background: "linear-gradient(to right, #00b4db, #0083b0)",
                    color: "#fff",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      background: "linear-gradient(to right, #2193b0, #6dd5ed)",
                      transform: "translateY(-2px)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  Ajouter Action Corrective
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ActionCorrectiveDialog;








