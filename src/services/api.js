import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Upload d'un document
export const uploadDocument = async (file) => {
  const documentData = {
    id: Math.random().toString(36).substr(2, 9), // Génère un ID aléatoire
    fileName: file.name,
    status: "Uploaded"
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/documents`, documentData);
    return response.data;
  } catch (error) {
    console.error("Error uploading document:", error.response || error);
    throw error;
  }
};

// Récupération de l'état des signatures pour un document
export const getSignatureProgress = async (documentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/signatures?documentId=${documentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching signature progress:", error.response || error);
    throw error;
  }
};

// Mise à jour (ajout) d'une signature
export const updateSignature = async (signatureData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signatures`, signatureData);
    return response.data;
  } catch (error) {
    console.error("Error updating signature:", error.response || error);
    throw error;
  }
};
