import { Link } from 'react-router-dom';
import styles from "../pages/Footer.module.css";

/*  AQUI IMPORTE LOS LOGOS GG */
import facebookLogo from '../assets/facebook-logo.svg';
import instagramLogo from '../assets/instagram-logo.svg';
import xLogo from '../assets/x-logo.svg';

function Footer() {
  return ( 
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>MiChangarro</h3>
          <p>Tu plataforma de negocios locales</p>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/victor.ho.931946" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="Facebook" />
            </a>
            <a href="https://www.linkedin.com/in/fernando-bovio-vallejo-339174266/" target="_blank" rel="noopener noreferrer">
              <img src={xLogo} alt="X" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramLogo} alt="Instagram" />
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h4>Secciones</h4>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/review">Reseñas</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacidad</Link></li>
            <li><Link to="/terms">Términos</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>Contacto</h4>
          <ul>
            <li><Link to="/contact">Contacto</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 MiChangarro. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;