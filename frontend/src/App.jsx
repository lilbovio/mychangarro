import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import BusinessDetail from './pages/BusinessDetail';
import BusinessReview from './pages/BusinessReview';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Ruta para ver detalle del negocio y sus reseñas */}
      <Route path="/review/:id" element={<BusinessDetail />} />
      
      {/* Ruta para dejar una nueva reseña */}
      <Route path="/review/:id/new" element={<BusinessReview />} />
    </Routes>
  );
}

export default App;
