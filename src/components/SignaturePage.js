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

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getSignatureProgress(documentId);
        setProgression(response.signatures);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'état des signatures :', error);
      }
    };

    fetchProgress();
  }, [documentId]);

  const saveSignature = async () => {
    const signature = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');

    try {
      const response = await updateSignature(documentId, { signature });
      console.log('Signature ajoutée :', response);
      navigate('/confirmation', { state: { fileName, signature } });
    } catch (error) {
      alert('Erreur lors de la sauvegarde de la signature. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <h1>Ajoutez votre signature</h1>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{
          width: 500,
          height: 200,
          className: 'signature-canvas',
        }}
      />
      <button onClick={saveSignature}>Confirmer la signature</button>
    </div>
  );
};

export default SignaturePage;
