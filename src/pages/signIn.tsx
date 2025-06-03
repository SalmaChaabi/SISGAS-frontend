"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  InputAdornment,
  Avatar,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router";
import { login } from "../services/auth/login";
import { useSession } from "../SessionContext";
import { motion } from "framer-motion";

export default function SignIn() {
  const navigate = useNavigate();
  const { setSession } = useSession();

  // États pour gérer les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(""); // Pour afficher les erreurs de connexion
  const [loading, setLoading] = useState(false); // Pour afficher le spinner

  // Fonction pour afficher un message d'accueil personnalisé selon l'heure
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(""); // Réinitialiser les erreurs précédentes
    setLoading(true); // Activer le spinner

    // Vérifier si les champs sont vides
    if (!email || !password) {
      setError("Veuillez remplir tous les champs."); // Affiche une erreur si email ou password vide
      setLoading(false);
      return;
    }

    try {
      const response = await login(email, password);

      if (response.success) {
        // Enregistrer la session utilisateur si login réussi
        setSession({
          user: {
            id: response.user._id,
            name: response.user.firstName,
            email: response.user.email,
            //@ts-ignore
            role: response.user.role,
            image:
              response.user.user_image ??
              "https://avatars.githubusercontent.com/u/19550456", // Avatar par défaut
          },
        });
        navigate("/", { replace: true }); // Redirection vers l'accueil
      } else {
        setError("Email ou mot de passe incorrect."); // Erreur de connexion
      }
    } catch (err) {
      setError("Erreur lors de la connexion."); // Erreur inattendue (ex: serveur)
    } finally {
      setLoading(false); // Désactiver le spinner
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
        backdropFilter: "blur(3px)",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 5,
              borderRadius: 4,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255,255,255,0.85)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
              textAlign: "center",
            }}
          >
            <Avatar
              alt="User Avatar"
              src=""
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                mb: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              color="primary"
            >
              {getGreeting()}, bienvenue sur{" "}
              <span style={{ color: "#1565c0" }}>Maintenova</span>
            </Typography>

            {/* Formulaire de connexion */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* Champ email */}
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
              />
              {/* Champ mot de passe */}
              <TextField
                margin="normal"
                fullWidth
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Checkbox se souvenir de moi */}
              <Box display="flex" justifyContent="flex-start">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Se souvenir de moi"
                />
              </Box>

              {/* Lien mot de passe oublié */}
              <Box display="flex" justifyContent="flex-end" mb={1}>
                <Link href="/reset-password" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Box>

              {/* Affichage d'une erreur si elle existe */}
              {error && (
                <Typography color="error" variant="body2" align="center" mb={1}>
                  {error}
                </Typography>
              )}

              {/* Bouton Se connecter */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading} // Désactivé quand en chargement
                  endIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <LoginIcon />
                    )
                  }
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: "12px",
                    textTransform: "none",
                    background:
                      "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                    boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.3)",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)",
                    },
                  }}
                >
                  Se connecter
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}












