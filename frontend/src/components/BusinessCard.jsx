import { useNavigate } from 'react-router-dom';

function BusinessCard({ business }) {
  const navigate = useNavigate();
  return (
    <div className="business-card" onClick={() => navigate(`/review/${business.id}`)}>
      <img src={business.image_url} alt="Negocio" />
      <h3>{business.name}</h3>
      <p>{business.description}</p>
      <span>{business.address}</span>
    </div>
  );
}

export default BusinessCard;
