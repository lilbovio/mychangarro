import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBusinesses } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BusinessCard from '../components/BusinessCard';
import styles from './Home.module.css'; 
import defaultUserImage from '../assets/default-user.jpg';

function Home() {
  const [userProfile, setUserProfile] = useState({
    nombre: 'Usuario',
    descripcion: 'Bienvenido a MyChangarro',
    imagen: defaultUserImage
  });
  const [category, setCategory] = useState('comida');
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserProfile();
    loadBusinesses();
  }, []);

  useEffect(() => {
    loadBusinesses();
  }, [category]);

  const loadUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const currentUser = JSON.parse(localStorage.getItem('user'));
      
      if (!currentUser || !currentUser.id) {
        return;
      }

      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      headers['X-User-ID'] = currentUser.id;

      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Perfil cargado en Home:', userData);
        
        const imageUrl = userData.imagen 
          ? `http://localhost:5000${userData.imagen}` 
          : defaultUserImage;
        
        setUserProfile({
          nombre: userData.nombre || currentUser.usuario || 'Usuario',
          descripcion: userData.descripcion || 'Bienvenido a MyChangarro',
          imagen: imageUrl
        });
        
        localStorage.setItem('user', JSON.stringify({
          ...currentUser,
          nombre: userData.nombre,
          descripcion: userData.descripcion,
          imagen: userData.imagen
        }));
      } else {
        loadUserFromLocalStorage(currentUser);
      }
    } catch (error) {
      console.error('Error cargando perfil en Home:', error);
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser) {
        loadUserFromLocalStorage(currentUser);
      }
    }
  };

  const loadUserFromLocalStorage = (user) => {
    const imageUrl = user.imagen 
      ? `http://localhost:5000${user.imagen}` 
      : defaultUserImage;
    
    setUserProfile({
      nombre: user.nombre || user.first_name || user.usuario || user.email || 'Usuario',
      descripcion: user.descripcion || user.description || 'Bienvenido a MyChangarro',
      imagen: imageUrl
    });
  };

  const loadBusinesses = async () => {
    setLoading(true);
    try {
      const res = await getBusinesses(category);
      console.log('Businesses data:', res.data);
      
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
    <div> {/* Div para el footer */}
    <div className={styles.container}>
      <Header />
      <div className={styles.userInfo}> 
        <img 
          src={userProfile.imagen}
          alt="User profile" 
          className={styles.userImage}
          onError={(e) => {
            console.error('Error cargando imagen en Home');
            e.target.onerror = null; 
            e.target.src = defaultUserImage;
          }}
        />
        <div className={styles.userDetails}>
          <h2>{userProfile.nombre}</h2>
          <p>{userProfile.descripcion}</p>
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

      
    </div>
      <Footer />
    </div>
  );
}

export default Home;