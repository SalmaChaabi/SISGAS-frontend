"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import { forgotPassword } from "../services/users/forgotPassword";


export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const responseMessage = await forgotPassword(email);
      setMessage(responseMessage);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setLoading(false);
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
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.85)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            Retour
          </Button>

          <Typography variant="h5" align="center" gutterBottom>
            Réinitialisation du mot de passe
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              label="Adresse e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              required
            />

            {message && (
              <Typography
                color="success.main"
                variant="body2"
                align="center"
                sx={{ mt: 2 }}
              >
                {message}
              </Typography>
            )}

            {error && (
              <Typography
                color="error"
                variant="body2"
                align="center"
                sx={{ mt: 2 }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                borderRadius: "12px",
                textTransform: "none",
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  background: "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Envoyer le lien"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

