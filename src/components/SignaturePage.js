import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { getSignatureProgress, updateSignature } from '../services/api';

const SignaturePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { documentId, fileName } = location.state || {};
  const [progression, setProgression] = useState([]);
  const signatureRef = useRef(null);

  // Récupérer l'état des signatures si un documentId est présent
  useEffect(() => {
    if (documentId) {
      const fetchProgress = async () => {
        try {
          const response = await getSignatureProgress(documentId);
          setProgression(response); // On suppose que la réponse est un tableau de signatures
        } catch (error) {
          console.error('Erreur lors de la récupération des signatures :', error);
        }
      };
      fetchProgress();
    }
  }, [documentId]);

  const saveSignature = async () => {
    if (signatureRef.current) {
      const signature = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
      console.log("Signature récupérée :", signature);
      try {
        // On simule l'ajout d'une signature pour le rôle "Étudiant"
        const response = await updateSignature({
          documentId,
          role: 'Étudiant',
          status: 'Terminé',
          signature: signature,
        });
        console.log('Signature ajoutée :', response);
        navigate('/confirmation', { state: { fileName, signature } });
      } catch (error) {
        alert('Erreur lors de la sauvegarde de la signature. Veuillez réessayer.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ajoutez votre signature</h1>
      <div style={{ border: '1px solid #000', marginBottom: '20px' }}>
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
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
          onClick={() => signatureRef.current.clear()}
          style={{ padding: '10px', backgroundColor: '#f44336', color: '#fff' }}
        >
          Effacer
        </button>
      </div>
    </div>
  );
};

export default SignaturePage;
