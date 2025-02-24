import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="bg-cover bg-center h-96"
        style={{ backgroundImage: "url('https://via.placeholder.com/1500x600')" }}
      >
        <div className="flex items-center justify-center h-full bg-gray-900 bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Bienvenue sur le site E-sign-Pro</h1>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Découvrez nos services</h2>
        <p>
          Notre solution innovante vous permet de gérer vos documents en ligne
          et de signer électroniquement en toute simplicité.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
