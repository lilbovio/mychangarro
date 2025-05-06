import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import BusinessReview from './pages/BusinessReview.jsx';

import '../../frontend/index.css'; // Asegúrate de tener un archivo CSS para estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<App />}>
          <Route index element={<Home />} />
          <Route path="review/:id" element={<BusinessReview />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
