import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
      <div className="font-bold text-xl">MonSite</div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/esignpro">E-Sign Pro</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/about">À propos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
