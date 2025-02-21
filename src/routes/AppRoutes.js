import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../components/HomePage';
import SignaturePage from '../components/SignaturePage';
import ConfirmationPage from '../components/ConfirmationPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signature" element={<SignaturePage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        {/* Route de fallback pour les URL inconnues */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
