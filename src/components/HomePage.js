import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadDocument } from '../services/api';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    try {
      const response = await uploadDocument(uploadedFile);
      console.log('Document uploadé avec succès :', response);
      navigate('/signature', { state: { documentId: response.documentId, fileName: uploadedFile.name } });
    } catch (error) {
      alert('Erreur lors de l\'upload du document. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <h1>Bienvenue sur E-Sign PRO</h1>
      <form>
        <label>
          Upload Document PDF :
          <input type="file" accept=".pdf" onChange={handleFileUpload} />
        </label>
      </form>
    </div>
  );
};

export default HomePage;
