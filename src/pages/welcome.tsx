import React from "react";
import Grid from "@mui/material/Grid"

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  TextField,
  Switch,
  Chip,
  Slider,

} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from "@mui/icons-material/Security";
import TimelineIcon from "@mui/icons-material/Timeline";
import { Link } from "react-router";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SendIcon from "@mui/icons-material/Send";
import { AutoAwesomeMosaicOutlined } from "@mui/icons-material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

const WelcomePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Maintenova
          </Typography>
          <Button color="inherit" component={Link} to="/overview">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/sign-in">
            Sign_in
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero section avec background image */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: 'url("/public/image.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(38, 37, 37, 0.5)",
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h3" gutterBottom>
          Bienvenue dans notre application 
          <br/>
          Maintenova 👋
          </Typography>
          <Typography variant="h6" gutterBottom>
            Système de gestion automatisé du spectre
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/overview"
          >
            Accéder au Dashboard
          </Button>
        </Container>
      </Box>

      {/* Section À propos */}
      <Box sx={{ py: 8, backgroundColor: "#f9f9f9" }}>
        <Container>
          <Typography variant="h4" gutterBottom textAlign="center">
            À propos de Notre Application
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            maxWidth="md"
            mx="auto"
          >
            Maintenova est une application innovante conçue pour gérer et suivre les
            opérations de maintenance dans un système automatisé de gestion du
            spectre de fréquence. Elle permet aux administrateurs de suivre les
            tâches, superviser les incidents, organiser les utilisateurs,
            facilite la surveillance en temps réel des conditions de systéme, la
            prise en charge des réclamations, la suggestion de solutions
            intelligentes par un chatbot intégré et d'escalade des requêtes si
            nécessaire pour garantir le bon fonctionnement du système.
          </Typography>
        </Container>
      </Box>

      {/* Section Fonctionnalités principales - Version étendue */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            sx={{
              mb: 6,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #1976d2 0%, #5e35b1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Fonctionnalités principales
          </Typography>

          <Grid container spacing={4} mt={2}>
            {/* Carte existante 1 */}
            <Grid item xs={12} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  borderTop: "4px solid #1976d2",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(25, 118, 210, 0.2)",
                  },
                }}
              >
                <SettingsIcon
                  sx={{
                    fontSize: 40,
                    color: "primary.main",
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>
                  Gestion des utilisateurs
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Créez, modifiez ou supprimez les utilisateurs avec facilité.
                </Typography>
              </Paper>
            </Grid>

            {/* Carte existante 2 */}
            <Grid item xs={12} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  borderTop: "4px solid #00acc1",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0, 172, 193, 0.2)",
                  },
                }}
              >
                <TimelineIcon
                  sx={{
                    fontSize: 40,
                    color: "#00acc1",
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>
                  Suivi des opérations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visualisez l'historique et l'état des actions de maintenance.
                </Typography>
              </Paper>
            </Grid>

            {/* Carte existante 3 */}
            <Grid item xs={12} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  borderTop: "4px solid #7b1fa2",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(123, 31, 162, 0.2)",
                  },
                }}
              >
                <SecurityIcon
                  sx={{
                    fontSize: 40,
                    color: "#7b1fa2",
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>
                  Sécurité avancée
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Authentification sécurisée et gestion des rôles utilisateurs.
                </Typography>
              </Paper>
            </Grid>

            {/* NOUVELLE CARTE 4 - Facture et Approbation */}
            <Grid item xs={12} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  borderTop: "4px solid #4caf50",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(76, 175, 80, 0.2)",
                  },
                }}
              >
                <ReceiptIcon
                  sx={{
                    fontSize: 40,
                    color: "#4caf50",
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>
                  Facture & Approbation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Générez des factures et suivez les processus d'approbation en
                  temps réel.
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    bgcolor: "rgba(76, 175, 80, 0.1)",
                    borderRadius: 1,
                    color: "#4caf50",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  NOUVEAU
                </Box>
              </Paper>
            </Grid>

            {/* NOUVELLE CARTE 5 - Réclamation */}
            <Grid item xs={12} md={3} sx={{ mt: 7 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "95%",
                  borderTop: "4px solid #f44336",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(244, 67, 54, 0.2)",
                  },
                }}
              >
                <AssignmentReturnIcon
                  sx={{
                    fontSize: 40,
                    color: "#f44336",
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>
                  Gestion des Réclamations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Traitez et suivez les réclamations clients efficacement.
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    bgcolor: "rgba(244, 67, 54, 0.1)",
                    borderRadius: 1,
                    color: "#f44336",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  HOT
                </Box>
              </Paper>
            </Grid>
            {/* Carte existante 6 */}
            <Grid item xs={10} md={3} sx={{ mt: 7 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "95%",
                  borderTop: "4px solid #ff9800",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(255, 152, 0, 0.2)",
                  },
                }}
              >
                <ChatBubbleOutlineIcon
                  sx={{
                    fontSize: 40,
                    color: "#ff9800",
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>
                  Support intelligent
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Obtenez de l'aide instantanément grâce à notre chatbot
                  intégré.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Section Feedback Premium */}
      <Box
        sx={{
          py: 10,
          background:
            "radial-gradient(circle at center, #f8f9ff 0%, #eef2ff 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            background:
              "linear-gradient(45deg, rgba(25, 118, 210, 0.08) 0%, transparent 100%)",
            borderRadius: "50%",
          },
        }}
      >
        <Container maxWidth="lg">
          {/* Titre animé */}
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #1976d2 0%, #5e35b1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                mb: 2,
              }}
            >
              Votre Avis Compte
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
                fontFamily: "monospace",
              }}
            >
              Aidez-nous à révolutionner l'expérience SYSGAS avec vos retours
            </Typography>
          </Box>

          {/* Carte Feedback 3D */}
          <Box
            sx={{
              perspective: 1000,
              maxWidth: 1200,
              mx: "auto",
            }}
          >
            <Paper
              sx={{
                p: { xs: 3, md: 6 },
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 16px 40px -12px rgba(25, 118, 210, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                transformStyle: "preserve-3d",
                "&:hover": {
                  transform: "rotateY(2deg) rotateX(1deg)",
                  boxShadow: "0 24px 48px -12px rgba(25, 118, 210, 0.3)",
                },
                transition: "all 0.5s ease",
              }}
            >
              <Grid container spacing={6}>
                {/* Partie Évaluation Interactive */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 3 }}
                      >
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            bgcolor: "primary.main",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 2,
                            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                          }}
                        >
                          <FeedbackIcon sx={{ color: "white", fontSize: 26 }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          Évaluation Expérience
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 4 }}>
                        <Typography
                          variant="body1"
                          sx={{ mb: 2, fontWeight: 500 }}
                        >
                          Satisfaction globale
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          {[
                            "Très déçu",
                            "Déçu",
                            "Neutre",
                            "Satisfait",
                            "Ravi",
                          ].map((label, i) => (
                            <Typography
                              key={i}
                              variant="caption"
                              sx={{
                                textAlign: "center",
                                width: 60,
                                color: "text.secondary",
                              }}
                            >
                              {label}
                            </Typography>
                          ))}
                        </Box>
                        <Slider
                          defaultValue={4}
                          step={1}
                          marks
                          min={1}
                          max={5}
                          sx={{
                            color: "primary.main",
                            height: 8,
                            "& .MuiSlider-thumb": {
                              width: 24,
                              height: 24,
                              transition: "0.3s",
                              "&:hover": {
                                boxShadow: "0 0 0 8px rgba(25, 118, 210, 0.16)",
                              },
                            },
                            "& .MuiSlider-mark": {
                              display: "none",
                            },
                          }}
                        />
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{ mb: 1, fontWeight: 500 }}
                      >
                        Points forts (sélection multiple)
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 3,
                        }}
                      >
                        {[
                          "Interface intuitive",
                          "Performance",
                          "Fonctionnalités",
                          "Support",
                          "Rapports",
                        ].map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            clickable
                            variant="outlined"
                            sx={{
                              borderRadius: 1,
                              borderColor: "primary.light",
                              "&:hover": {
                                bgcolor: "primary.light",
                                color: "primary.dark",
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <TextField
                      fullWidth
                      label="Commentaires supplémentaires"
                      variant="outlined"
                      multiline
                      rows={2}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: "rgba(25, 118, 210, 0.2)",
                            transition: "0.3s",
                          },
                          "&:hover fieldset": {
                            borderColor: "primary.main",
                            boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.1)",
                          },
                        },
                      }}
                    />
                  </Box>
                </Grid>

                {/* Partie Suggestions Avancées */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          bgcolor: "secondary.main",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                          boxShadow: "0 4px 12px rgba(245, 124, 0, 0.3)",
                        }}
                      >
                        <AutoAwesomeMosaicOutlined
                          sx={{ color: "white", fontSize: 26 }}
                        />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Idées Innovantes
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, mb: 3 }}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontWeight: 500 }}
                      >
                        Que souhaiteriez-vous voir dans les prochaines versions
                        ?
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        placeholder="Décrivez votre vision (fonctionnalités futuristes, améliorations radicales...)"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "rgba(245, 124, 0, 0.03)",
                            "& fieldset": {
                              borderColor: "rgba(245, 124, 0, 0.2)",
                              transition: "0.3s",
                            },
                            "&:hover fieldset": {
                              borderColor: "secondary.main",
                              boxShadow: "0 0 0 4px rgba(245, 124, 0, 0.1)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "secondary.main",
                              boxShadow: "0 0 0 4px rgba(245, 124, 0, 0.2)",
                            },
                          },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Switch color="secondary" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          Je souhaite participer au programme beta
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          background:
                            "linear-gradient(45deg, #ff6d00 0%, #ff9100 100%)",
                          color: "white",
                          fontWeight: 700,
                          textTransform: "none",
                          boxShadow: "0 4px 20px rgba(255, 109, 0, 0.2)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #f4511e 0%, #ff6d00 100%)",
                            boxShadow: "0 8px 24px rgba(255, 109, 0, 0.3)",
                          },
                        }}
                      >
                        Soumettre mon feedback
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          {/* Élément décoratif */}
          <Box
            sx={{
              position: "absolute",
              bottom: -50,
              left: "20%",
              width: 200,
              height: 200,
              background:
                "linear-gradient(45deg, rgba(94, 53, 177, 0.05) 0%, transparent 100%)",
              borderRadius: "50%",
              zIndex: 0,
            }}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default WelcomePage;
