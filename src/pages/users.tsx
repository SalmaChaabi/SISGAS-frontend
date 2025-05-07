import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { getAllUsers, User } from "../services/users/getAllUsers";
import { searchUsersByName } from "../services/users/searchUsersByName";
import { addUser as addUserService, AddUserParam } from "../services/users/addUser";
import { updateUser } from "../services/users/updateUser";
import UserList from "../components/custom/user/UserListDataGrid";
import Signup from "../components/custom/user/UserForm";

const UsersPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const fetchAllUsers = async () => {
    setLoading(true);
    const response = await getAllUsers();
    setUsers(response.data);
    setLoading(false);
  };

  const addUser = async (user: AddUserParam) => {
    const newUser = await addUserService(user);
    if (newUser.success) {
      setUsers((prev) => [...prev, newUser.data]);
    }
    return newUser;
  };

  const handleUpdateUser = async (userId: string, user: AddUserParam) => {
    const updated = await updateUser(userId, user);
    if (updated.success) {
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? updated.data : u))
      );
    }
    return updated;
  };

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        fetchAllUsers();
        return;
      }

      try {
        setLoading(true);
        const result = await searchUsersByName(value);
        setUsers(result);
        if (result.length === 0) {
          setSnackbar({ open: true, message: "Aucun utilisateur trouvé." });
        }
      } catch (error) {
        setSnackbar({ open: true, message: "Erreur lors de la recherche." });
      } finally {
        setLoading(false);
      }
    }, 400),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Stack spacing={3} sx={{ p: 3, maxWidth: "100%" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Gestion des utilisateurs
      </Typography>

      {/* Recherche positionnée à gauche, sans couleur de fond */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <TextField
          label="Rechercher"
          placeholder="Nom"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: loading && (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 300, // Taille modifiée pour un champ plus large mais compact
            borderRadius: 25, // Cadre arrondi pour une meilleure esthétique
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Ombre douce autour du champ
            "& .MuiInputBase-root": {
              paddingRight: 1,
            },
            "& .MuiInputBase-root:focus": {
              borderColor: "primary.main",
              boxShadow: "0 0 15px rgba(0, 0, 255, 0.2)", // Focus plus visible
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.9rem", // Texte réduit pour plus de clarté
              color: "#555", // Couleur plus discrète pour l'étiquette
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc", // Couleur de la bordure du champ
              },
              "&:hover fieldset": {
                borderColor: "primary.main", // Changer la couleur de la bordure au survol
              },
            },
          }}
        />
      </Box>

      {/* Bouton d'ajout utilisateur avec un effet de survol */}
      <Stack direction="row" justifyContent="flex-end" mt={2}>
      <Button
  variant="contained"
  onClick={() => setDialogOpen(true)}
  sx={{
    borderRadius: 50,
    paddingX: 4,
    paddingY: 1.5,
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#fff',
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // Violet vers bleu
    backgroundSize: '300% 300%',
    animation: 'gradientFlow 6s ease infinite',
    boxShadow: '0 8px 20px rgba(106, 17, 203, 0.3)',
    textTransform: 'none',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    '&:hover': {
      transform: 'scale(1.07)',
      boxShadow: '0 10px 30px rgba(37, 117, 252, 0.5)',
    },
    '@keyframes gradientFlow': {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
  }}
>
  Créer un compte utilisateur
</Button>

      </Stack>

      {/* Liste des utilisateurs */}
      <UserList
        data={users}
        onDelete={(id) =>
          setUsers((prev) => prev.filter((user) => user._id !== id))
        }
        onUpdate={handleUpdateUser}
      />

      {/* Dialogue pour la création d'un utilisateur */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      
        <DialogContent>
          <Signup onSubmit={addUser} />
        </DialogContent>
      </Dialog>

      {/* Snackbar pour afficher des messages d'erreur ou de confirmation */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Stack>
  );
};

export default UsersPage;











