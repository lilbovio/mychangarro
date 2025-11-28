// frontend/src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logosuperiorMC.jpg';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; /* * Esto para los efectos de la barra */


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!storedUser;
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);/* Funciones para ocultar la barra mi vovio */
  const [lastScrollY, setLastScrollY] = useState(0); 


  /* =========================Efecto de ocultar la barra================== */
  useEffect(() => { 
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < 10) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  };

  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [lastScrollY]);



  return (
    /* Cambie la etiqueta HEADER para usar el efecto de arriba */
    <header 
      className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}
      onMouseEnter={() => setIsVisible(true)}
    >
      <div className={styles.navleft}>
        {/* Logo: ahora también te lleva al home */}
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer' }}
        />

        {/* Botón Inicio (al lado de MiChangarrito) */}
        <button
          type="button"
          className={styles.homeBtn}
          onClick={() => navigate('/home')}
        >
          Inicio
        </button>

        <h3>
          <span className={styles.morado}>Mi</span>
          <span className={styles.verde}>C</span>hangarro
        </h3>
      </div>

      <div className={styles.navright}>
        <form className={styles.searchForm}>
          <input
            type="text"
            placeholder="Buscar"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {isLoggedIn ? (
          <>
            <div className={styles.loginButton}>
              <Link to="/profile" className="nav-link">
                Mi perfil
              </Link>
            </div>
            <div className={styles.registerButton}>
              <Link
                to="/"
                className="nav-link nav-link-register"
                onClick={() => {
                  localStorage.removeItem('user');
                }}
              >
                Cerrar sesión
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={styles.loginButton}>
              <Link to="/login" className="nav-link">Login</Link>
            </div>
            <div className={styles.registerButton}>
              <Link to="/register" className="nav-link nav-link-register">
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;