import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { submitReview, getBusinessById } from '../services/api';
import styles from './Reviews.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function BusinessReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    business_id: id,
    opinion: '',
    rating: '5',
    review: ''
  });

  useEffect(() => {
    loadBusiness();
  }, [id]);

  const loadBusiness = async () => {
    try {
      const { getBusinessById } = await import('../services/api');
      const data = await getBusinessById(id);
      setBusiness(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar el negocio:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReview(form);
      alert('¡Gracias por tu reseña!');
      // Redirigir de vuelta a la página del negocio
      navigate(`/review/${id}`);
    } catch (error) {
      alert('Ocurrió un error al enviar tu reseña');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className={styles.reviewsContainer}>
          <p style={{ textAlign: 'center', padding: '40px' }}>Cargando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.reviewsContainer}>
        <div className={styles.businessHeader}>
          <button 
            className={styles.backButton}
            onClick={() => navigate(`/review/${id}`)}
          >
            ← Volver al negocio
          </button>
          {business && (
            <h2 className={styles.businessNameTitle}>
              Reseña para: {business.nombre}
            </h2>
          )}
        </div>

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
              maxLength={100}
            />
            <small className={styles.charCount}>
              {form.opinion.length}/100 caracteres
            </small>
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
              rows={6}
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