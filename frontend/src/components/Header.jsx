import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import styles from './Header.module.css'; 


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!storedUser;


  return (
    <header className={styles.header}>
      <div className={styles.navleft}>  
        {/* aqui al tocar la imagen podran regresar al inicio */}
      <img 
        src={logo} 
        alt="Logo" 
        className="logo" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ cursor: 'pointer' }} 
      />
      <h3><span className={styles.morado}>Mi</span><span className={styles.verde}>C</span>hangarro</h3>
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
