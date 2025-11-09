import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBusinesses } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BusinessCard from '../components/BusinessCard';
import styles from './Home.module.css'; 
import defaultUserImage from '../assets/default-user.jpg';

function Home() {
  // lectura robusta del localStorage (soporta cadenas no JSON)
  const rawUser = localStorage.getItem('user');
  let user = {};
  try {
    user = rawUser ? JSON.parse(rawUser) : {};
  } catch {
    // si era un string plano (p.ej. el correo), úsalo como usuario
    user = rawUser ? { usuario: rawUser } : {};
  }
  console.log('USER EN HOME:', user, 'RAW:', rawUser, 'KEYS:', Object.keys(user));

  // intenta primero first/last, luego nombre, luego correo
  const firstName =
    user.first_name || user.firstName || '';

  const lastName =
    user.last_name || user.lastName || user.apellido || user.apellidos || '';

  const displayName =
    (firstName || lastName)
      ? `${firstName} ${lastName}`.trim()
      : (user.nombre || user.usuario || user.email || user.correo || 'Usuario');

  const displayDescription =
    user.descripcion || user.description || 'Bienvenido a MyChangarro';

  const displayImage =
    user.imagen || user.image_url || defaultUserImage;
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
      res.data.forEach(business => console.log(business));
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
          src={displayImage}
          alt="User profile" 
          className={styles.userImage}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = defaultUserImage; // Ruta de la imagen por defecto
          }}
        />
        <div className={styles.userDetails}>
          <h2>{displayName}</h2>
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

