import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Link as MuiLink,
  Divider,
  IconButton,
  Slide,
  Badge,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Avatar,
  Grow,
  Zoom,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  RocketLaunch as RocketIcon,
  Group as GroupIcon,
  Approval as ApprovalIcon,
  Receipt as ReceiptIcon,
  GppGood as GppGoodIcon,
  Build as BuildIcon,
  Chat as ChatIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const cards = [
    {
      title: "Gestion des Utilisateurs",
      icon: <GroupIcon />,
      color: "#1976d2",
      gradient: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
      description: "Gérez les utilisateurs et leurs accès.",
      link: "/users",
      animation: "float 6s ease-in-out infinite"
    },
    {
      title: "Chatbot Intelligent",
      icon: <ChatIcon />,
      color: "#9c27b0",
      gradient: "linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)",
      description: "Obtenez des réponses automatisées pour vos questions grâce à notre chatbot intelligent.",
      link: "/chatbot",
      animation: "pulse 4s ease infinite"
    },
    {
      title: "Approbation",
      icon: <ApprovalIcon />,
      color: "#4caf50",
      gradient: "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
      description: "Gérez les approbations de tâches et de demandes.",
      link: "/approbations",
      animation: "shake 5s ease infinite"
    },
    {
      title: "Factures",
      icon: <ReceiptIcon />,
      color: "#ff9800",
      gradient: "linear-gradient(135deg, #ff9800 0%, #ffc107 100%)",
      description: "Suivez et gérez vos factures.",
      link: "/factures",
      animation: "bounce 5s ease infinite"
    },
    {
      title: "Réclamations",
      icon: <GppGoodIcon />,
      color: "#f44336",
      gradient: "linear-gradient(135deg, #f44336 0%, #ff5722 100%)",
      description: "Gérez et traitez les réclamations des utilisateurs.",
      link: "/reclamations",
      animation: "rotate 8s linear infinite"
    },
    {
      title: "Actions Correctives",
      icon: <BuildIcon />,
      color: "#673ab7",
      gradient: "linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)",
      description: "Suivez et mettez en œuvre les actions correctives.",
      link: "/actionsCorrectives",
      animation: "glow 4s ease infinite"
    }
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar (inchangé) */}
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo avec animation */}
            <Slide direction="right" in={true} timeout={500}>
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <RocketIcon sx={{ 
                  fontSize: 32, 
                  mr: 1, 
                  color: "#ffab40",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.1)" },
                    "100%": { transform: "scale(1)" },
                  }
                }} />
                <Typography
                  variant="h5"
                  noWrap
                  component={Link}
                  to="/"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: ".2rem",
                    color: "inherit",
                    textDecoration: "none"
                  }}
                >
                  MAINTENOVA
                </Typography>
              </Box>
            </Slide>

            {/* Espace flexible */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Boutons de navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              <Button
                component={Link}
                to="/overview"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }
                }}
              >
                Dashboard
              </Button>
            </Box>

            {/* Actions utilisateur */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
              <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }
                }}
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Button
                component={Link}
                to="/sign-in"
                variant="contained"
                startIcon={<AccountCircleIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  background: "linear-gradient(45deg, #ffab40 0%, #ff9100 100%)",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .2)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #ff9100 0%, #ff6d00 100%)"
                  }
                }}
              >
                Connexion
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero section (inchangé) */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: 'url("/public/image1.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white"
        }}
      >
        
      </Box>

      {/* Section À propos (inchangé) */}
      <Box sx={{ py: 8, backgroundColor: "#f9f9f9", flexGrow: 1 }}>
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
            Maintenova est une application innovante conçue pour gérer et suivre
            les opérations de maintenance dans un système automatisé de gestion
            du spectre de fréquence. Elle permet aux administrateurs de suivre
            les tâches, superviser les incidents, organiser les utilisateurs,
            faciliter la surveillance en temps réel, gérer les réclamations,
            suggérer des solutions via un chatbot intelligent et assurer une
            escalade rapide des requêtes.
          </Typography>
        </Container>
      </Box>

         {/* Dashboard - Cartes ultra élégantes */}
      <Box sx={{ py: 8, backgroundColor: "#f9f9f9" }}>
        <Container>
  

          <Box 
            sx={{ 
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 4,
              padding: { xs: 2, md: 0 }
            }}
          >
            {cards.map((card, index) => (
              <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 500 + (index * 200) } : {})}
                key={index}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                      "& .MuiAvatar-root": {
                        transform: "scale(1.1)",
                        boxShadow: `0 0 0 4px ${theme.palette.background.paper}, 0 0 0 6px ${card.color}`
                      },
                      "& .card-border": {
                        width: "100%",
                        opacity: 1
                      }
                    },
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    background: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  {/* Border animation */}
                  <Box 
                    className="card-border"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: '3px',
                      width: '0%',
                      background: card.gradient,
                      transition: 'all 0.4s ease',
                      opacity: 0.7
                    }}
                  />
                  
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{
                          backgroundColor: card.color,
                          color: theme.palette.getContrastText(card.color),
                          transition: "all 0.3s ease",
                          width: 48,
                          height: 48
                        }}
                      >
                        {card.icon}
                      </Avatar>
                    }
                    title={
                      <Typography 
                        variant="h6" 
                        fontWeight={600}
                        sx={{ 
                          color: theme.palette.text.primary,
                          letterSpacing: '0.5px'
                        }}
                      >
                        {card.title}
                      </Typography>
                    }
                    sx={{
                      pb: 1,
                      "& .MuiCardHeader-content": {
                        overflow: "hidden"
                      }
                    }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                  
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Zoom in={true} style={{ transitionDelay: '500ms' }}>
                      <Button 
                        size="small" 
                        component={Link} 
                        to={card.link}
                        sx={{
                          color: card.color,
                          fontWeight: 600,
                          textTransform: 'none',
                          letterSpacing: '0.5px',
                          position: 'relative',
                          px: 1.5,
                          "&:hover": {
                            background: 'transparent',
                            "&:after": {
                              width: '100%'
                            }
                          },
                          "&:after": {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '0%',
                            height: '2px',
                            background: card.color,
                            transition: 'width 0.3s ease'
                          }
                        }}
                      >
                        Explorer
                        <Box 
                          component="span" 
                          sx={{
                            ml: 1,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          →
                        </Box>
                      </Button>
                    </Zoom>
                  </CardActions>
                </Card>
              </Grow>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer Professionnel (inchangé) */}
       <Box sx={{ backgroundColor: "#0d47a1", color: "#fff", pt: 6 }}>
      <Container>
        {/* Contenu principal en colonnes */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {/* Colonne 1 */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Maintenova
            </Typography>
            <Typography variant="body2">
              Votre solution de maintenance intelligente pour les systèmes automatisés.
            </Typography>
            <Box mt={2} display="flex" gap={1}>
              <IconButton component="a" href="https://facebook.com" target="_blank" rel="noopener" color="inherit" size="small" sx={{ background: "rgba(255,255,255,0.1)", "&:hover": { background: "rgba(255,255,255,0.2)" } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton component="a" href="https://twitter.com" target="_blank" rel="noopener" color="inherit" size="small" sx={{ background: "rgba(255,255,255,0.1)", "&:hover": { background: "rgba(255,255,255,0.2)" } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton component="a" href="https://linkedin.com" target="_blank" rel="noopener" color="inherit" size="small" sx={{ background: "rgba(255,255,255,0.1)", "&:hover": { background: "rgba(255,255,255,0.2)" } }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Colonne 2 */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Liens utiles
            </Typography>
            <MuiLink href="/overview" color="inherit" underline="hover" display="block">
              Dashboard
            </MuiLink>
            <MuiLink href="/sign-in" color="inherit" underline="hover" display="block">
              Connexion
            </MuiLink>
            <MuiLink href="#" color="inherit" underline="hover" display="block">
              Politique de confidentialité
            </MuiLink>
          </Box>

          {/* Colonne 3 */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">support@maintenova.com</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">+216 28 151 396</Typography>
            </Box>
          </Box>

          {/* Colonne 4 */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Notre Localisation
            </Typography>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              <iframe
                title="Maintenova Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.266702220574!2d10.182636175697763!3d36.81016407101907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302fd298b1752b5%3A0x99988cf30a82f313!2sSi%C3%A8ge%20Maintenova!5e0!3m2!1sfr!2stn!4v1715712002000!5m2!1sfr!2stn"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Divider et citation bien centrés en dehors des colonnes */}
      <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />

      <Box sx={{ textAlign: "center", py: -1}}>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic", color: "rgba(255, 255, 255, 0.7)", mb: 1}}>
          "L'innovation en maintenance n'anticipe pas seulement l'usure, elle imagine l'avenir." 💡
        </Typography>
        <Typography variant="body2">© {new Date().getFullYear()} Maintenova. Tous droits réservés.</Typography>
      </Box>
    </Box>

    </Box>
  );
};

export default WelcomePage;












