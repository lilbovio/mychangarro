import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Importamos las funciones del API directamente aquí arriba
import { getBusinessById, getReviewsByBusinessId } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import defaultBusinessImage from '../assets/default-business.png';
import styles from './BusinessDetail.module.css';

function BusinessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Definimos la función asíncrona dentro del useEffect
    const fetchBusinessData = async () => {
      try {
        setLoading(true);
        
        // Hacemos las dos peticiones en paralelo para que sea más rápido
        const [businessData, reviewsData] = await Promise.all([
          getBusinessById(id),
          getReviewsByBusinessId(id)
        ]);

        setBusiness(businessData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBusinessData();
    }
  }, [id]); // Se ejecuta cada vez que cambia el ID

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className={styles.loading} style={{ padding: '50px', textAlign: 'center' }}>
          Cargando detalles...
        </div>
        <Footer />
      </div>
    );
  }

  if (!business) {
    return (
      <div>
        <Header />
        <div className={styles.error} style={{ padding: '50px', textAlign: 'center' }}>
          <h2>Negocio no encontrado</h2>
          <button onClick={() => navigate('/home')}>Volver al inicio</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        {/* Business Details Section */}
        <div className={styles.businessSection}>
          <img
            src={business.imagen || defaultBusinessImage}
            alt={business.nombre}
            className={styles.businessImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultBusinessImage;
            }}
          />
          <div className={styles.businessInfo}>
            <h1 className={styles.businessName}>{business.nombre}</h1>
            <p className={styles.businessDescription}>{business.descripcion}</p>
            <p className={styles.businessAddress}>
              <span className={styles.icon}>📍</span>
              {business.direccion}
            </p>
            
            {/* --- AQUÍ ESTABA EL ERROR DE NAVEGACIÓN --- */}
            <button 
              className={styles.reviewButton}
              onClick={() => navigate(`/review/${id}/new`)} 
            >
              Dejar una reseña
            </button>
            {/* ----------------------------------------- */}

          </div>
        </div>

        {/* Reviews Section */}
        <div className={styles.reviewsSection}>
          <h2 className={styles.reviewsTitle}>
            Reseñas recientes ({reviews.length})
          </h2>
          
          {reviews.length === 0 ? (
            <div className={styles.noReviews}>
              <p>Aún no hay reseñas para este negocio.</p>
              <p>¡Sé el primero en dejar una!</p>
            </div>
          ) : (
            <div className={styles.reviewsList}>
              {reviews.slice(0, 5).map((review) => (
                <div key={review.id || Math.random()} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.rating}>
                      {renderStars(review.calificacion)}
                    </div>
                  </div>
                  {/* Asegúrate que tu backend devuelve 'opinion' y 'resena' */}
                  <h3 className={styles.reviewOpinion}>{review.opinion}</h3>
                  <p className={styles.reviewText}>{review.resena}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BusinessDetail;