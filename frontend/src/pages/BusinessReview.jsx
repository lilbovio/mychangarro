import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { submitReview } from '../services/api';
import styles from './Reviews.module.css'; // Importa el módulo CSS
import Header from '../components/Header';
import Footer from '../components/Footer';

function BusinessReview() {
  const { id } = useParams();
  const [form, setForm] = useState({
    business_id: id,
    opinion: '',
    rating: '5', // Valor por defecto
    review: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReview(form);
      alert('¡Gracias por tu reseña!');
      setForm({
        business_id: id,
        opinion: '',
        rating: '5',
        review: ''
      });
    } catch (error) {
      alert('Ocurrió un error al enviar tu reseña');
      console.error(error);
    }
  };

  return (
    <div>
    <div className={styles.reviewsContainer}>
      <Header />
      <h2 className={styles.reviewsTitle}>Deja tu reseña</h2>
      
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <div className={styles.formGroup}>
          <label htmlFor="opinion">Opinión breve:</label>
          <textarea
            id="opinion"
            placeholder="Tu opinión en pocas palabras"
            value={form.opinion}
            onChange={e => setForm({ ...form, opinion: e.target.value })}
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rating">Calificación:</label>
          <select
            id="rating"
            value={form.rating}
            onChange={e => setForm({ ...form, rating: e.target.value })}
            className={styles.select}
            required
          >
            <option value="5">★★★★★ Excelente</option>
            <option value="4">★★★★☆ Muy bueno</option>
            <option value="3">★★★☆☆ Bueno</option>
            <option value="2">★★☆☆☆ Regular</option>
            <option value="1">★☆☆☆☆ Malo</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="review">Reseña detallada:</label>
          <textarea
            id="review"
            placeholder="Describe tu experiencia con más detalle"
            value={form.review}
            onChange={e => setForm({ ...form, review: e.target.value })}
            className={styles.textarea}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Enviar reseña
        </button>
      </form>
    </div>
          <Footer />
    </div>
  );
}

export default BusinessReview;