import React from 'react';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Bienvenue sur E-Sign PRO</h1>
      <p>Simplifiez la signature électronique de vos documents.</p>
      <form>
        <label>
          Upload Document PDF :
          <input type="file" accept=".pdf" />
        </label>
      </form>
    </div>
  );
};

export default HomePage;
