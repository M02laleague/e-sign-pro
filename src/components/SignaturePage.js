import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { getSignatureProgress, updateSignature } from '../services/api';

const SignaturePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Utilisation de valeurs par défaut pour éviter les erreurs si location.state est vide
  const { documentId = 'default-doc', fileName = 'default.pdf' } = location.state || {};
  const [progression, setProgression] = useState([]);
  const signatureRef = useRef(null);

  // Debug : affichage des données reçues
  console.log('Location state:', location.state);

  useEffect(() => {
    if (documentId && documentId !== 'default-doc') {
      const fetchProgress = async () => {
        try {
          const response = await getSignatureProgress(documentId);
          // S'assurer que la réponse est un tableau
          setProgression(Array.isArray(response) ? response : []);
        } catch (error) {
          console.error('Error fetching signature progress:', error);
        }
      };
      fetchProgress();
    }
  }, [documentId]);

  const saveSignature = async () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signature = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
      console.log("Signature retrieved:", signature);
      try {
        const response = await updateSignature({
          documentId,
          role: 'Étudiant',
          status: 'Terminé',
          signature,
        });
        console.log('Signature updated:', response);
        navigate('/confirmation', { state: { fileName, signature } });
      } catch (error) {
        console.error('Error updating signature:', error);
        alert('Erreur lors de la sauvegarde de la signature. Veuillez réessayer.');
      }
    } else {
      alert('Veuillez signer avant de confirmer.');
    }
  };

  return (
    <div className="signature-page" style={{ padding: '20px' }}>
      <h1>Ajoutez votre signature</h1>
      {/* Affichage de debug pour s'assurer que l'état est bien passé */}
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
