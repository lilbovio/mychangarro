import { useNavigate } from 'react-router-dom';
import defaultBusinessImage from '../assets/default-business.png';

function BusinessCard({ business }) {
  const navigate = useNavigate();
  console.log('Negocio recibido en BusinessCard:', business);

  return (
    <div className="business-card" onClick={() => navigate(`/review/${business.id}`)}>
      <img 
        src={business.imagen || defaultBusinessImage } 
        alt={business.nombre}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultBusinessImage;
        }}
      />
      <h3>{business.nombre}</h3>
      <p>{business.descripcion}</p>
      <span>{business.direccion}</span>
    </div>
  );
}

export default BusinessCard;