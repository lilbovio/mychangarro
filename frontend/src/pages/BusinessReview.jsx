import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { submitReview } from '../services/api';

function BusinessReview() {
  const { id } = useParams();
  const [form, setForm] = useState({
    business_id: id,
    opinion: '',
    rating: '',
    review: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitReview(form);
    alert('Gracias por tu reseña!');
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h2>Deja tu reseña</h2>
      <textarea placeholder="Tu opinión" onChange={e => setForm({ ...form, opinion: e.target.value })}></textarea>
      <input type="number" min="1" max="5" placeholder="Calificación" onChange={e => setForm({ ...form, rating: e.target.value })} />
      <textarea placeholder="Reseña detallada" onChange={e => setForm({ ...form, review: e.target.value })}></textarea>
      <button type="submit">Enviar reseña</button>
    </form>
  );
}

export default BusinessReview;
// Este componente permite a los usuarios dejar una reseña para un negocio específico.