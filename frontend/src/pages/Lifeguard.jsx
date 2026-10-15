import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { FaPlus, FaMedal, FaClipboardCheck } from 'react-icons/fa';
import '../pages/Swimming.css';

const Lifeguard = ({ language }) => {
  const [lifeguards, setLifeguards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLifeguards();
  }, []);

  const fetchLifeguards = async () => {
    try {
      const response = await api.get('/lifeguard');
      setLifeguards(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const text = language === 'fr' ? {
    title: 'Gestion des Sauveteurs',
    add: 'Ajouter Sauveteur',
    name: 'Nom',
    certification: 'Certification',
    status: 'Statut',
    actions: 'Actions'
  } : {
    title: 'Lifeguards Management',
    add: 'Add Lifeguard',
    name: 'Name',
    certification: 'Certification',
    status: 'Status',
    actions: 'Actions'
  };

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="swimming-page">
      <div className="page-header">
        <h1>{text.title}</h1>
        <button className="btn btn-primary">
          <FaPlus /> {text.add}
        </button>
      </div>

      <div className="swimmers-main">
        <table>
          <thead>
            <tr>
              <th>{text.name}</th>
              <th>{text.certification}</th>
              <th>Email</th>
              <th>{text.status}</th>
              <th>{text.actions}</th>
            </tr>
          </thead>
          <tbody>
            {lifeguards.map(lifeguard => (
              <tr key={lifeguard._id}>
                <td><strong>{lifeguard.firstName} {lifeguard.lastName}</strong></td>
                <td><span className="badge">{lifeguard.certification}</span></td>
                <td>{lifeguard.email || '-'}</td>
                <td>{lifeguard.active ? '✅ Actif' : '❌ Inactif'}</td>
                <td>
                  <button className="icon-btn edit"><FaMedal /></button>
                  <button className="icon-btn"><FaClipboardCheck /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lifeguard;
