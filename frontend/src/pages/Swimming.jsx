import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { FaPlus, FaEdit, FaTrash, FaFileExport, FaSearch } from 'react-icons/fa';
import './Swimming.css';

const Swimming = ({ language }) => {
  const [groups, setGroups] = useState([]);
  const [swimmers, setSwimmers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchSwimmers(selectedGroup);
    }
  }, [selectedGroup]);

  const fetchGroups = async () => {
    try {
      const response = await api.get('/swimming/groups');
      setGroups(response.data);
      if (response.data.length > 0) {
        setSelectedGroup(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSwimmers = async (groupId) => {
    try {
      const response = await api.get(`/swimming/groups/${groupId}/swimmers`);
      setSwimmers(response.data);
    } catch (error) {
      console.error('Error fetching swimmers:', error);
    }
  };

  // === Button handlers (simple prompt-based dev UI) ===
  const handleAddGroup = async () => {
    const name = window.prompt('Nom du groupe:');
    if (!name) return;
    const level = window.prompt('Niveau (ex: Débutant):', 'Débutant') || 'Débutant';
    try {
      await api.post('/swimming/groups', { name, level });
      await fetchGroups();
      alert('Groupe créé');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création du groupe');
    }
  };

  const handleAddSwimmer = async () => {
    if (!selectedGroup) return alert('Sélectionnez d\'abord un groupe');
    const firstName = window.prompt('Prénom:');
    if (!firstName) return;
    const lastName = window.prompt('Nom:');
    const email = window.prompt('Email (facultatif):', '');
    const phone = window.prompt('Téléphone (facultatif):', '');
    try {
      const payload = { firstName, lastName, email, phone, group: selectedGroup, level: 'Débutant' };
      await api.post('/swimming/swimmers', payload);
      await fetchSwimmers(selectedGroup);
      alert('Nageur créé');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création du nageur');
    }
  };

  const handleExport = async () => {
    if (!selectedGroup) return alert('Sélectionnez d\'abord un groupe');
    try {
      // Trigger download by opening URL (backend will respond with file)
      window.open(`${api.defaults.baseURL}/swimming/groups/${selectedGroup}/export/csv`, '_blank');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l\'export');
    }
  };

  const handleEditSwimmer = async (swimmer) => {
    const firstName = window.prompt('Prénom:', swimmer.firstName) || swimmer.firstName;
    const lastName = window.prompt('Nom:', swimmer.lastName) || swimmer.lastName;
    try {
      await api.put(`/swimming/swimmers/${swimmer._id}`, { firstName, lastName });
      await fetchSwimmers(selectedGroup);
      alert('Nageur mis à jour');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDeleteSwimmer = async (swimmer) => {
    if (!confirm(`Supprimer ${swimmer.firstName} ${swimmer.lastName} ?`)) return;
    try {
      await api.delete(`/swimming/swimmers/${swimmer._id}`);
      await fetchSwimmers(selectedGroup);
      alert('Nageur supprimé');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  const filteredSwimmers = swimmers.filter(swimmer =>
    `${swimmer.firstName} ${swimmer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const t = {
    fr: {
      title: 'Gestion des Nageurs',
      groups: 'Groupes',
      swimmers: 'Nageurs',
      search: 'Rechercher...',
      addSwimmer: 'Ajouter Nageur',
      addGroup: 'Ajouter Groupe',
      export: 'Exporter',
      name: 'Nom',
      level: 'Niveau',
      actions: 'Actions',
      noSwimmers: 'Aucun nageur dans ce groupe'
    },
    en: {
      title: 'Swimmers Management',
      groups: 'Groups',
      swimmers: 'Swimmers',
      search: 'Search...',
      addSwimmer: 'Add Swimmer',
      addGroup: 'Add Group',
      export: 'Export',
      name: 'Name',
      level: 'Level',
      actions: 'Actions',
      noSwimmers: 'No swimmers in this group'
    }
  };

  const text = t[language] || t.fr;

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="swimming-page">
      <div className="page-header">
        <h1>{text.title}</h1>
          <div className="header-actions">
          <button className="btn btn-primary" onClick={handleAddSwimmer}>
            <FaPlus /> {text.addSwimmer}
          </button>
          <button className="btn btn-secondary" onClick={handleAddGroup}>
            <FaPlus /> {text.addGroup}
          </button>
        </div>
      </div>

      <div className="swimming-content">
        <div className="groups-sidebar">
          <h2>{text.groups}</h2>
          <div className="groups-list">
            {groups.map(group => (
              <div
                key={group._id}
                className={`group-item ${selectedGroup === group._id ? 'active' : ''}`}
                onClick={() => setSelectedGroup(group._id)}
              >
                <h3>{group.name}</h3>
                <p>{group.level}</p>
                <span className="enrollment">{group.currentEnrollment}/{group.maxCapacity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="swimmers-main">
          <div className="swimmers-toolbar">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder={text.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-export" onClick={handleExport}>
              <FaFileExport /> {text.export}
            </button>
          </div>

          <div className="swimmers-table">
            {filteredSwimmers.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>{text.name}</th>
                    <th>{text.level}</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>{text.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSwimmers.map(swimmer => (
                    <tr key={swimmer._id}>
                      <td>
                        <strong>{swimmer.firstName} {swimmer.lastName}</strong>
                      </td>
                      <td><span className="badge">{swimmer.level}</span></td>
                      <td>{swimmer.email || '-'}</td>
                      <td>{swimmer.phone || '-'}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="icon-btn edit" onClick={() => handleEditSwimmer(swimmer)}>
                            <FaEdit />
                          </button>
                          <button className="icon-btn delete" onClick={() => handleDeleteSwimmer(swimmer)}>
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">{text.noSwimmers}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swimming;
