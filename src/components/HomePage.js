import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadDocument } from '../services/api';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) {
      console.error("Aucun fichier sélectionné");
      return;
    }
    setFile(uploadedFile);

    try {
      const response = await uploadDocument(uploadedFile);
      console.log('Document uploaded successfully:', response);
      // Redirige vers la page de signature en passant documentId et fileName via location.state
      navigate('/signature', { state: { documentId: response.id, fileName: uploadedFile.name } });
    } catch (error) {
      console.error("Upload error:", error.response ? error.response.data : error.message);
      alert("Erreur lors de l'upload du document. Veuillez réessayer.");
    }
  };

  return (
    <div className="homepage" style={{ padding: '20px' }}>
      <h1>Bienvenue sur E-Sign PRO</h1>
      <form>
        <label>
          Upload Document PDF:
          <input type="file" accept=".pdf" onChange={handleFileUpload} />
        </label>
      </form>
    </div>
  );
};

export default HomePage;
