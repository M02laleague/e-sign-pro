import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Récupérer l'utilisateur depuis localStorage (si connecté)
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
      <div className="logo font-bold text-xl">MonSite</div>
      <ul className="flex space-x-4">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/esignpro">E-Sign Pro</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">À propos</Link></li>
        {!user ? (
          <li><Link to="/login">Connexion</Link></li>
        ) : (
          <li>Bonjour, {user.username}</li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
