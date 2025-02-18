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
        setProgression(response); // Selon la structure retournée par votre API
      } catch (error) {
        console.error('Erreur lors de la récupération des signatures :', error);
      }
    };
    if (documentId) fetchProgress();
  }, [documentId]);

  const saveSignature = async () => {
    const signature = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
    console.log("Signature récupérée :", signature);
    try {
      const response = await updateSignature({ documentId, role: 'Étudiant', status: 'Terminé', signature });
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
      <button onClick={() => signatureRef.current.clear()}>Effacer</button>
      {/* Bouton de test pour afficher la signature dans une nouvelle fenêtre */}
      <button onClick={() => {
        const dataURL = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
        console.log("Signature en dataURL :", dataURL);
        const imgWindow = window.open('');
        imgWindow.document.write(`<img src="${dataURL}" alt="Signature test"/>`);
      }}>
        Tester la signature
      </button>
    </div>
  );
};

export default SignaturePage;
