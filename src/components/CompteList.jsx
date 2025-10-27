import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config.js';

function CompteList() {
  const [comptes, setComptes] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/comptes`)
      .then(response => setComptes(response.data))
      .catch(error => console.error('Erreur API:', error));
  }, []);

  // Fonction pour formater la date en français
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="container mt-4">
      <h2>Liste des Comptes</h2>
      {comptes.length === 0 ? (
        <p>Aucun compte trouvé.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Solde (€)</th>
              <th>Date de Création</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {comptes.map((compte, index) => (
              <tr key={compte.id || index}>
                <td>{compte.id ?? '-'}</td>
                <td>{compte.solde?.toFixed(2) ?? '-'}</td>
                <td>{formatDate(compte.dateCreation)}</td>
                <td>{compte.type ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CompteList;
