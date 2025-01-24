import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Envoi d'un nouveau document (ajout au fichier db.json)
export const uploadDocument = async (file) => {
  // Simuler la création d'un document avec un ID
  const documentData = {
    id: Math.random().toString(36).substr(2, 9), // ID aléatoire
    fileName: file.name,
    status: "Uploaded"
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/documents`, documentData);
    return response.data; // Retourne l'objet ajouté
  } catch (error) {
    console.error("Erreur lors de l'upload du document :", error);
    throw error;
  }
};

// Récupération des signatures associées à un document
export const getSignatureProgress = async (documentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/signatures?documentId=${documentId}`);
    return response.data; // Retourne les signatures associées
  } catch (error) {
    console.error("Erreur lors de la récupération des signatures :", error);
    throw error;
  }
};

// Mise à jour d'une signature (ajout au fichier db.json)
export const updateSignature = async (signatureData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signatures`, signatureData);
    return response.data; // Retourne l'objet ajouté ou mis à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la signature :", error);
    throw error;
  }
};
