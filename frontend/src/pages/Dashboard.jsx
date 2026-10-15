import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  FaSwimmer, FaLifeRing, FaUsers, FaChalkboardTeacher, 
  FaClock, FaChartLine, FaCalendar 
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = ({ language }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/stats/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const t = {
    fr: {
      welcome: 'Bienvenue',
      dashboard: 'Tableau de bord',
      totalSwimmers: 'Nageurs totaux',
      totalLifeguards: 'Sauveteurs totaux',
      activeGroups: 'Groupes actifs',
      instructors: 'Moniteurs',
      upcomingClasses: 'Prochains cours',
      quickActions: 'Actions rapides'
    },
    en: {
      welcome: 'Welcome',
      dashboard: 'Dashboard',
      totalSwimmers: 'Total Swimmers',
      totalLifeguards: 'Total Lifeguards',
      activeGroups: 'Active Groups',
      instructors: 'Instructors',
      upcomingClasses: 'Upcoming Classes',
      quickActions: 'Quick Actions'
    }
  };

  const text = t[language] || t.fr;

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{text.welcome}, {user?.firstName}!</h1>
        <p className="subtitle">{text.dashboard}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card swimmers">
          <div className="stat-icon">
            <FaSwimmer />
          </div>
          <div className="stat-content">
            <h3>{stats?.totalSwimmers || 0}</h3>
            <p>{text.totalSwimmers}</p>
          </div>
        </div>

        <div className="stat-card lifeguards">
          <div className="stat-icon">
            <FaLifeRing />
          </div>
          <div className="stat-content">
            <h3>{stats?.totalLifeguards || 0}</h3>
            <p>{text.totalLifeguards}</p>
          </div>
        </div>

        <div className="stat-card groups">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{stats?.totalGroups || 0}</h3>
            <p>{text.activeGroups}</p>
          </div>
        </div>

        <div className="stat-card instructors">
          <div className="stat-icon">
            <FaChalkboardTeacher />
          </div>
          <div className="stat-content">
            <h3>{stats?.totalInstructors || 0}</h3>
            <p>{text.instructors}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="upcoming-classes card">
          <h2><FaCalendar /> {text.upcomingClasses}</h2>
          {stats?.groups && stats.groups.length > 0 ? (
            <div className="classes-list">
              {stats.groups.map((group) => (
                <div key={group._id} className="class-item">
                  <div className="class-info">
                    <h3>{group.name}</h3>
                    <p>{group.level}</p>
                    <p className="instructor">
                      {group.instructor?.firstName} {group.instructor?.lastName}
                    </p>
                  </div>
                  <div className="class-schedule">
                    {group.schedule && group.schedule.length > 0 && (
                      <>
                        <FaClock />
                        <span>{group.schedule[0].day}</span>
                        <span>{group.schedule[0].startTime}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">Aucun cours programmé</p>
          )}
        </div>

        <div className="quick-actions card">
          <h2><FaChartLine /> {text.quickActions}</h2>
          <div className="actions-list">
            <button className="action-btn primary">
              <FaSwimmer /> {language === 'fr' ? 'Ajouter nageur' : 'Add Swimmer'}
            </button>
            <button className="action-btn secondary">
              <FaLifeRing /> {language === 'fr' ? 'Inscrire test' : 'Register Test'}
            </button>
            <button className="action-btn accent">
              <FaUsers /> {language === 'fr' ? 'Créer groupe' : 'Create Group'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
