import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Bienvenue sur E-Sign PRO</h1>} />
        <Route path="/signature" element={<h1>Signature électronique</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
