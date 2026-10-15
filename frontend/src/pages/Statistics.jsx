import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import api from '../services/api';
import './Statistics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Statistics = ({ language }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [attendance, success] = await Promise.all([
        api.get('/stats/swimming/attendance'),
        api.get('/stats/swimming/success-rate')
      ]);
      setStats({ attendance: attendance.data, success: success.data });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const text = language === 'fr' ? {
    title: 'Statistiques et Rapports',
    attendance: 'Taux d\'Assiduité par Groupe',
    success: 'Taux de Réussite par Niveau'
  } : {
    title: 'Statistics and Reports',
    attendance: 'Attendance Rate by Group',
    success: 'Success Rate by Level'
  };

  if (loading) return <div className="loading">Chargement...</div>;

  const attendanceData = {
    labels: Object.keys(stats?.attendance || {}),
    datasets: [{
      label: 'Taux de présence (%)',
      data: Object.values(stats?.attendance || {}).map(d => d.rate),
      backgroundColor: 'rgba(102, 126, 234, 0.6)',
    }]
  };

  const successData = {
    labels: Object.keys(stats?.success || {}),
    datasets: [{
      label: 'Taux de réussite (%)',
      data: Object.values(stats?.success || {}).map(d => d.rate),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
    }]
  };

  return (
    <div className="statistics-page">
      <h1>{text.title}</h1>
      <div className="charts-grid">
        <div className="chart-card">
          <h2>{text.attendance}</h2>
          {stats?.attendance && <Bar data={attendanceData} />}
        </div>
        <div className="chart-card">
          <h2>{text.success}</h2>
          {stats?.success && <Pie data={successData} />}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
