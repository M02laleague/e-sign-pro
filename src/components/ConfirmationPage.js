import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { fileName, signature } = location.state || {};

  return (
    <div>
      <h1>Signature confirmée !</h1>
      <p><strong>Document :</strong> {fileName}</p>
      <img src={signature} alt="Signature" style={{ width: '300px' }} />
      <p>
        <a href={`http://localhost:5000/documents/${fileName}`} target="_blank" rel="noopener noreferrer">
          Télécharger le document finalisé
        </a>
      </p>
    </div>
  );
};

export default ConfirmationPage;
