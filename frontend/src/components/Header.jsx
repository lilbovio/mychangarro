import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>MiApp</h1>
      <div className="menu-container">
        <button 
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        
        {isMenuOpen && (
          <div className="dropdown-menu">
            <Link to="/home" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              Inicio
            </Link>
            <Link to="/review" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              Reseñas
            </Link>
            <Link to="/profile" className="menu-item" onClick={() => setIsMenuOpen(false)}>
              Mi Perfil
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;