import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { getSignatureProgress, updateSignature } from '../services/api';

const SignaturePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Si location.state est vide, on utilise des valeurs par défaut pour éviter les erreurs
  const { documentId = "default-doc", fileName = "default.pdf" } = location.state || {};
  const [progression, setProgression] = useState([]);
  const signatureRef = useRef(null);

  // Affichage pour debug : on affiche l'état reçu via location.state
  console.log("Données reçues depuis location.state:", location.state);

  useEffect(() => {
    if (documentId && documentId !== "default-doc") {
      const fetchProgress = async () => {
        try {
          const response = await getSignatureProgress(documentId);
          // On s'assure que la réponse est un tableau
          setProgression(Array.isArray(response) ? response : []);
        } catch (error) {
          console.error('Erreur lors de la récupération des signatures :', error);
        }
      };
      fetchProgress();
    }
  }, [documentId]);

  const saveSignature = async () => {
    // Vérifier que le canvas n'est pas vide
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signature = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
      console.log("Signature récupérée :", signature);
      try {
        const response = await updateSignature({
          documentId,
          role: 'Étudiant',
          status: 'Terminé',
          signature: signature,
        });
        console.log('Signature ajoutée :', response);
        navigate('/confirmation', { state: { fileName, signature } });
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la signature:', error);
        alert('Erreur lors de la sauvegarde de la signature. Veuillez réessayer.');
      }
    } else {
      alert('Veuillez signer avant de confirmer.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ajoutez votre signature</h1>
      {/* Affichage du contenu de location.state pour vérifier qu'il est correctement passé */}
      <pre>{JSON.stringify(location.state, null, 2)}</pre>
      <div style={{ border: '1px solid #000', marginBottom: '20px' }}>
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
          backgroundColor="#fff"
          penColor="black"
        />
      </div>
      <div>
        <button
          onClick={saveSignature}
          style={{ marginRight: '10px', padding: '10px', backgroundColor: '#4CAF50', color: '#fff' }}
        >
          Confirmer la signature
        </button>
        <button
          onClick={() => signatureRef.current && signatureRef.current.clear()}
          style={{ padding: '10px', backgroundColor: '#f44336', color: '#fff' }}
        >
          Effacer
        </button>
      </div>
    </div>
  );
};

export default SignaturePage;
