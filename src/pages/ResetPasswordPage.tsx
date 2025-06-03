import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  Button,
  Alert,
  Box,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { resetPassword } from "../services/users/resetPassword";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setMessage("⛔ Le mot de passe doit contenir au moins 8 caractères.");
      setSuccess(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("⛔ Les mots de passe ne correspondent pas !");
      setSuccess(false);
      return;
    }

    try {
      if (token) {
        await resetPassword(token, newPassword);
        setMessage("✅ Mot de passe réinitialisé avec succès !");
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage("❌ Token manquant.");
        setSuccess(false);
      }
    } catch (error: any) {
      const errorMessage = error?.message || "❌ Une erreur inattendue s'est produite.";

      if (errorMessage.includes("expiré")) {
        setMessage("⏰ Le lien a expiré. Veuillez redemander une réinitialisation.");
      } else if (errorMessage.includes("invalide")) {
        setMessage("❌ Le lien est invalide. Veuillez vérifier l'URL.");
      } else {
        setMessage(`❌ Erreur : ${errorMessage}`);
      }

      setSuccess(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url('/signinimage.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={5}
          sx={{
            p: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            🔒 Réinitialiser le mot de passe
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type={showNewPassword ? "text" : "password"}
              label="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              label="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
            >
              Réinitialiser
            </Button>
          </Box>
          {message && (
            <Alert severity={success ? "success" : "error"} sx={{ mt: 3 }}>
              {message}
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;

