import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import { User } from "../../../services/users/getAllUsers";
import {
  addUser,
  AddUserParam,
  AddUserResponse,
} from "../../../services/users/addUser";
import { getAllRoles, UserRole } from "../../../services/users/getAllRoles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import { motion, useAnimation } from "framer-motion";

type UserFormProps = {
  onSubmit: (user: AddUserParam) => Promise<AddUserResponse>;
  defaultData?: User;
  submitLabel?: string;
};

const UserForm = ({ onSubmit, defaultData, submitLabel }: UserFormProps) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectRole, setSelectRole] = React.useState("");
  const [roles, setRoles] = React.useState<UserRole[]>([]);
  const [response, setResponse] = React.useState<AddUserResponse | null>(null);
  const [error, setError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const controls = useAnimation();

  const firstNameError =
    firstName.length < 2 ? "Le prénom doit avoir au moins 2 caractères" : "";
  const lastNameError =
    lastName.length < 2 ? "Le nom doit avoir au moins 2 caractères" : "";
  const emailError = email.includes("@")
    ? ""
    : "Email invalide (doit contenir @)";
  const passwordError =
    password.length < 8
      ? "Le mot de passe doit avoir au moins 8 caractères"
      : "";

  const isFormError =
    firstNameError ||
    lastNameError ||
    emailError ||
    (passwordError && !defaultData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormError) {
      setError(true);
    } else {
      try {
        setError(false);
        const res = await onSubmit({
          firstName,
          lastName,
          email,
          password,
          role: selectRole,
        });
        setResponse(res);
      } catch (error) {
        console.error("Erreur lors de l’ajout de l’utilisateur", error);
        setError(true);
      }
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await getAllRoles();
      setRoles(res.data);
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (defaultData?.firstName) setFirstName(defaultData.firstName);
    if (defaultData?.lastName) setLastName(defaultData.lastName);
    if (defaultData?.email) setEmail(defaultData.email);
    if (defaultData?.role && roles) {
      setSelectRole(roles.find((r) => r.name === defaultData.role)?._id ?? "");
    }
  }, [defaultData, roles]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    controls.start({
      rotate: [0, 20, -20, 10, 0],
      scale: [1, 1.2, 0.9, 1.05, 1],
      transition: { duration: 0.5 },
    });
  };

  return (
    <Box
      sx={{
        borderRadius: 4,
        padding: 4,
        background: "linear-gradient(135deg, #e0f7fa, #fce4ec)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)",
        maxWidth: 500,
        mx: "auto",
        backdropFilter: "blur(6px)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
          letterSpacing: 1,
          color: "#37474f",
        }}
      >
        Ajout un nouvel Utilisateur
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          helperText={firstNameError}
          error={!!firstNameError}
          sx={{ backgroundColor: "#ffffffcc", borderRadius: 2 }}
        />
        <TextField
          label="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          helperText={lastNameError}
          error={!!lastNameError}
          sx={{ backgroundColor: "#ffffffcc", borderRadius: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={emailError}
          error={!!emailError}
          sx={{ backgroundColor: "#ffffffcc", borderRadius: 2 }}
        />

        {!defaultData && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordError}
              error={!!passwordError}
              fullWidth
              sx={{
                backgroundColor: "#ffffffcc",
                borderRadius: 2,
              }}
            />
            <Tooltip title={showPassword ? "Masquer" : "Afficher"}>
              <IconButton onClick={handleTogglePassword} sx={{ ml: 1 }}>
                <motion.div
                  animate={controls}
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="medium" sx={{ color: "#8e24aa" }} />
                  ) : (
                    <Visibility fontSize="medium" sx={{ color: "#00bcd4" }} />
                  )}
                </motion.div>
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <Select
          fullWidth
          value={selectRole}
          onChange={(event) => setSelectRole(event.target.value as string)}
          variant="outlined"
          sx={{
            backgroundColor: "#ffffffcc",
            borderRadius: 2,
            color: "#37474f",
          }}
        >
          {roles.map((role) => (
            <MenuItem key={role._id} value={role._id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          sx={{
            background: "linear-gradient(90deg, #00bcd4, #8e24aa)",
            color: "white",
            borderRadius: "30px",
            padding: "12px 28px",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 6px 16px rgba(142, 36, 170, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              background: "linear-gradient(90deg, #8e24aa, #00bcd4)",
            },
          }}
        >
          <SendIcon sx={{ mr: 1 }} />
          {submitLabel ?? "Soumettre"}
        </Button>

        {error && isFormError && (
          <Typography
            color="error"
            sx={{
              textAlign: "center",
              fontWeight: "medium",
              fontSize: "1rem",
              mt: 2,
            }}
          >
            Veuillez remplir tous les champs obligatoires.
          </Typography>
        )}

        {response && (
          <Typography
            color={response.success ? "success.main" : "error.main"}
            sx={{
              textAlign: "center",
              fontWeight: "medium",
              fontSize: "1rem",
              mt: 2,
            }}
          >
            {response.message}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default UserForm;












