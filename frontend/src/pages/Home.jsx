import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBusinesses } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BusinessCard from '../components/BusinessCard';
import styles from './Home.module.css'; 

function Home() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [category, setCategory] = useState('comida');
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadBusinesses();
  }, [category]);

  const loadBusinesses = async () => {
    setLoading(true);
    try {
      const res = await getBusinesses(category);
      console.log('Businesses data:', res.data); // Para depuración
      if (res.data && Array.isArray(res.data)) {
        setBusinesses(res.data);
      } else {
        console.error('Formato de datos inesperado:', res);
        setBusinesses([]);
      }
    } catch (error) {
      console.error("Error loading businesses:", error);
      navigate('/error', { state: { error: 'Error al cargar negocios' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.userInfo}>
        <img 
          src={user.image_url || '/default-user.jpg'} 
          alt="User profile" 
          className={styles.userImage}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/default-user.jpg'; // Ruta de la imagen por defecto
          }}
        />
        <div className={styles.userDetails}>
          <h2>{user.name || 'Usuario'}</h2>
          <p>{user.description || 'Bienvenido a MyChangarro'}</p>
        </div>
      </div>

      <div className={styles.categorySelector}>
        <button 
          className={`${styles.categoryButton} ${category === 'comida' ? styles.active : ''}`}
          onClick={() => setCategory('comida')}
        >
          Comida
        </button>
        <button 
          className={`${styles.categoryButton} ${category === 'servicios' ? styles.active : ''}`}
          onClick={() => setCategory('servicios')}
        >
          Servicios
        </button>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Cargando negocios...</p>
        </div>
      ) : (
        <div className={styles.businessList}>
          {businesses.length > 0 ? (
            businesses.map((business) => (
              <BusinessCard 
                key={business.id} 
                business={business}
                onClick={() => navigate(`/business/${business.id}`)}
              />
            ))
          ) : (
            <div className={styles.noResultsContainer}>
              <p className={styles.noResults}>No hay negocios disponibles en esta categoría</p>
              <button 
                onClick={loadBusinesses}
                className={styles.refreshButton}
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;