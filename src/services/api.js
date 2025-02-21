import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL = 'http://localhost:5000';

// Upload d'un document avec génération d'un ID unique
export const uploadDocument = async (file) => {
  if (!file) {
    throw new Error("Aucun fichier fourni");
  }

  const documentData = {
    id: uuidv4(), // Utilisation de uuid pour un identifiant unique
    fileName: file.name,
    status: "Uploaded"
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/documents`, documentData);
    return response.data;
  } catch (error) {
    console.error("Error uploading document:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Récupération des signatures pour un document
export const getSignatureProgress = async (documentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/signatures?documentId=${documentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching signature progress:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Mise à jour (ajout) d'une signature
export const updateSignature = async (signatureData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signatures`, signatureData);
    return response.data;
  } catch (error) {
    console.error("Error updating signature:", error.response ? error.response.data : error.message);
    throw error;
  }
};
