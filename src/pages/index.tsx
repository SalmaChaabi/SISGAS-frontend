import * as React from 'react';
import Grid from '@mui/material/Grid';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  useTheme,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import BuildIcon from '@mui/icons-material/Build';

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
} from 'recharts';

import { getDashboardStats } from '../services/dashboard/getDashboardStats';

export default function DashboardPage() {
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const theme = useTheme();

  React.useEffect(() => {
    getDashboardStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Erreur lors du chargement des statistiques');
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
      <Typography variant="h4" gutterBottom>
        Dashboard Maintenova
      </Typography>

      <Grid container spacing={3}>
        <StatCard icon={<ReportProblemIcon />} label="Réclamations" value={stats.totalReclamations} color={theme.palette.error.main} />
        <StatCard icon={<ReceiptIcon />} label="Factures" value={stats.totalFactures} color={theme.palette.success.main} />
        <StatCard icon={<PersonIcon />} label="Utilisateurs" value={stats.totalUsers} color={theme.palette.primary.main} />
        <StatCard icon={<GavelIcon />} label="Approbations" value={stats.totalApprobations} color={theme.palette.secondary.main} />
        <StatCard icon={<BuildIcon />} label="Actions Correctives" value={stats.totalActionsCorrectives} color={theme.palette.warning.main} />
      </Grid>

      <Grid container spacing={4} mt={2}>
        <StatPieChart title="Répartition des Statuts de Réclamations" data={reclamationsData} COLORS={COLORS} />
        <StatPieChart title="Répartition des Statuts de Factures" data={facturesData} COLORS={COLORS} />
      </Grid>

      <Grid item xs={12} mt={4}>
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
                  <Bar dataKey="approbations" fill={theme.palette.primary.main} />
                  <Bar dataKey="actionsCorrectives" fill={theme.palette.warning.main} />
                  <Bar dataKey="factures" fill={theme.palette.success.main} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center" mt={2}>
                Aucune donnée disponible pour cette année.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: color + '20' }}>
        <Box sx={{ mr: 2, color }}>{icon}</Box>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

interface StatPieChartProps {
  title: string;
  data: { name: string; value: number }[];
  COLORS: string[];
}

function StatPieChart({ title, data, COLORS }: StatPieChartProps) {
  return (
    <Grid item xs={12} md={6}>
      <Card>
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
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body2" color="text.secondary" align="center" mt={2}>
              Aucune donnée disponible.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}




