import { useNavigate } from 'react-router-dom';
import defaultBusinessImage from '../assets/default-business.png';

function BusinessCard({ business }) {
  const navigate = useNavigate();
  console.log('Negocio recibido en BusinessCard:', business); // Verifica qué llega aquí

  return (
    <div className="business-card" onClick={() => navigate(`/review/${business.id}`)}>
      <img src={business.image_url || defaultBusinessImage } alt="Negocio" />
      <h3>{business.nombre}</h3>
      <p>{business.descripcion}</p>
      <span>{business.direccion}</span>
    </div>
  );
}

export default BusinessCard;
