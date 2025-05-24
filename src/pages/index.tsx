import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  useTheme,
  LinearProgress,
  Avatar,
  Chip,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import GavelIcon from "@mui/icons-material/Gavel";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import BuildIcon from "@mui/icons-material/Build";
import EmailIcon from "@mui/icons-material/Email";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { getDashboardStats } from "../services/dashboard/getDashboardStats";
import { User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import useUserRole from "../hooks/useUserRole";
import { Navigate, redirect } from "react-router";

export default function DashboardPage() {
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const theme = useTheme();
  const { isAdmin } = useUserRole();
  React.useEffect(() => {
    getDashboardStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des statistiques");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={5}>
        {error}
      </Typography>
    );
  }
  if (!isAdmin) {
    //redirect to not found
    return <Navigate to="/" replace/>;
  }
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.secondary.main,
  ];

  const reclamationsData = Object.entries(stats.reclamationsParStatut).map(
    ([name, value]: any) => ({ name, value })
  );

  const facturesData = Object.entries(stats.facturesParStatut).map(
    ([name, value]: any) => ({ name, value })
  );

  const monthlyData = stats.statsParMois || [];
  return (
    <Box sx={{ p: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" gutterBottom>
          Dashboard Maintenova
        </Typography>
      </motion.div>

      {/* Section 1: Cartes de statistiques */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 4,
          "& > *": {
            flex: "1 2 250px",
            minWidth: 0,
          },
        }}
      >
        {[
          {
            icon: <ReportProblemIcon />,
            label: "Réclamations",
            value: stats.totalReclamations,
            color: theme.palette.error.main,
          },
          {
            icon: <ReceiptIcon />,
            label: "Factures",
            value: stats.totalFactures,
            color: theme.palette.success.main,
          },
          {
            icon: <PersonIcon />,
            label: "Utilisateurs",
            value: stats.totalUsers,
            color: theme.palette.primary.main,
          },
          {
            icon: <GavelIcon />,
            label: "Approbations",
            value: stats.totalApprobations,
            color: theme.palette.secondary.main,
          },
          {
            icon: <BuildIcon />,
            label: "Actions Correctives",
            value: stats.totalActionsCorrectives,
            color: theme.palette.warning.main,
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ flex: "1 1 250px" }}
          >
            <StatCard {...item} />
          </motion.div>
        ))}
      </Box>

      {/* Section 2: Graphiques en camembert */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 4,
          "& > *": {
            flex: "1 1 400px",
            minWidth: 0,
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ flex: "1 1 400px" }}
        >
          <StatPieChart
            title="Répartition des Statuts de Réclamations"
            data={reclamationsData}
            COLORS={COLORS}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ flex: "1 1 400px" }}
        >
          <StatPieChart
            title="Répartition des Statuts de Factures"
            data={facturesData}
            COLORS={COLORS}
          />
        </motion.div>
      </Box>

      {/* Section 3: Graphique en barres */}
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Approbations, Actions Correctives et Factures par Mois
              </Typography>
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="approbations"
                      fill={theme.palette.primary.main}
                    />
                    <Bar
                      dataKey="actionsCorrectives"
                      fill={theme.palette.warning.main}
                    />
                    <Bar dataKey="factures" fill={theme.palette.success.main} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  mt={2}
                >
                  Aucune donnée disponible pour cette année.
                </Typography>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Section 4: Leaderboard - Espacement accru */}
      <Box mt={6} mb={4}>
        <LeaderboardCard leaderboard={stats.leaderboard} />
      </Box>
    </Box>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        bgcolor: color + "20",
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box sx={{ mr: 2, color }}>{icon}</Box>
      <CardContent sx={{ p: 0 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Box>
  );
}

function StatPieChart({ title, data, COLORS }: any) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((_: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mt={2}
          >
            Aucune donnée disponible.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

function LeaderboardCard({ leaderboard }: { leaderboard: any[] }) {
  const theme = useTheme();
  const getBadgeColor = (niveau: string) => {
    switch (niveau.toLowerCase()) {
      case "bronze":
        return "warning";
      case "silver":
        return "info";
      case "gold":
        return "secondary";
      case "platinum":
        return "primary";
      case "diamond":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        background: "radial-gradient(circle at top left, #f0f4ff, #d9e4ff)",
        p: 3,
        width: "100%",
        overflowX: "auto",
        "&::-webkit-scrollbar": { height: 8 },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#2196f3",
          borderRadius: 4,
        },
      }}
      elevation={6}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="700"
          mb={3}
          color="primary.main"
          sx={{
            textShadow: "0 2px 6px rgba(0,0,0,0.1)",
            letterSpacing: 1,
          }}
        >
          🏆 Classement des Utilisateurs
        </Typography>

        {leaderboard.length > 0 ? (
          <Box
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              pb: 2,
              px: 1,
            }}
          >
            {leaderboard.map((user, index) => (
              <motion.div
                key={user.userId}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.85 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(33, 150, 243, 0.3)",
                }}
                transition={{ duration: 0.6 }}
                style={{
                  minWidth: 280,
                  borderRadius: 20,
                  background:
                    "linear-gradient(135deg, #dbe9ff 0%, #f5faff 100%)",
                  padding: 20,
                  border: "1.5px solid #2196f3",
                  cursor: "pointer",
                  userSelect: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#2196f3",
                    width: 72,
                    height: 72,
                    boxShadow: "0 0 12px #2196f3aa",
                  }}
                >
                  <UserIcon size={36} color="#fff" />
                </Avatar>

                <Box textAlign="center">
                  <Typography
                    variant="subtitle1"
                    fontWeight="700"
                    sx={{ color: "#0d47a1" }}
                  >
                    #{index + 1} - {user.nom}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      mt: 1,
                      bgcolor: "rgba(0, 0, 0, 0.05)",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                    }}
                  >
                    <EmailIcon fontSize="small" sx={{ color: "black" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        fontWeight: 600,
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ width: "100%", mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((user.points / 1000) * 100, 100)}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#bbdefb",
                      "& .MuiLinearProgress-bar": {
                        background:
                          "linear-gradient(90deg, #2196f3 0%, #64b5f6 100%)",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="primary"
                    fontWeight="600"
                    sx={{ mt: 1, textAlign: "center", display: "block" }}
                  >
                    {user.points} points
                  </Typography>
                </Box>

                <Chip
                  label={user.niveau}
                  color={getBadgeColor(user.niveau)}
                  sx={{
                    fontWeight: "700",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
                    borderRadius: 2,
                    px: 2,
                    py: 0.5,
                    mt: 1,
                  }}
                />
              </motion.div>
            ))}
          </Box>
        ) : (
          <Typography align="center" color="text.secondary">
            Aucun utilisateur pour le moment.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
