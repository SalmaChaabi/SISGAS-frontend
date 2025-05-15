// pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { getDashboardStats } from '../services/dashboard/getDashboardStats';


const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalReclamations: 0,
    totalFactures: 0,
    totalUsers: 0,
    totalApprobations: 0,
    totalActionsCorrectives: 0,
    reclamationsParStatut: {},
    facturesParStatut: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Erreur de chargement:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Typography>Chargement...</Typography>;
  }

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        📊 Tableau de Bord
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <StatCard title="Réclamations" value={stats.totalReclamations} icon="📋" />
        <StatCard title="Factures" value={stats.totalFactures} icon="🧾" />
        <StatCard title="Utilisateurs" value={stats.totalUsers} icon="👥" />
        <StatCard title="Approbations" value={stats.totalApprobations} icon="✅" />
        <StatCard title="Actions Correctives" value={stats.totalActionsCorrectives} icon="🔧" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatSection 
          title="Réclamations par Statut" 
          items={stats.reclamationsParStatut} 
        />
        <StatSection 
          title="Factures par Statut" 
          items={stats.facturesParStatut} 
        />
      </div>
    </div>
  );
};

// Composant Carte Statistique
const StatCard = ({ title, value, icon }: { title: string; value: number; icon: string }) => (
  <div className="bg-white p-4 rounded-lg shadow border">
    <div className="flex justify-between items-center">
      <div>
        <Typography variant="h5" className="font-bold">{value}</Typography>
        <Typography variant="body2" color="textSecondary">{title}</Typography>
      </div>
      <Typography variant="h4">{icon}</Typography>
    </div>
  </div>
);

// Composant Section Statistique
const StatSection = ({ title, items }: { title: string; items: Record<string, number> }) => (
  <div className="bg-white p-4 rounded-lg shadow border">
    <Typography variant="h6" className="mb-3 font-bold">{title}</Typography>
    <ul className="space-y-2">
      {Object.entries(items).map(([key, value]) => (
        <li key={key} className="flex justify-between py-2 border-b">
          <span>{key}</span>
          <span className="font-medium">{value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default DashboardPage;
