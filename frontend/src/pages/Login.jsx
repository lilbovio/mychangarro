import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import styles from './Login.module.css'; 
import logo from "../assets/logo.png";


function Login() {
  const [form, setForm] = useState({ usuario: '', contrasena: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formato básico de correo
    if (!form.usuario.includes('@')) {
      alert('Ingresa un correo electrónico válido que contenga "@".');
      return;
    }

    // Validar complejidad de la contraseña:
    // mínimo 7 caracteres, al menos 1 mayúscula y 1 número.
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;
    if (!passwordRegex.test(form.contrasena)) {
      alert('La contraseña debe tener al menos 7 caracteres, una mayúscula y un número.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(form);

      // asegura que quede al menos el correo en localStorage
      const mergedUser = { usuario: form.usuario, ...(res?.data?.user || {}) };
      localStorage.setItem('user', JSON.stringify(mergedUser));

      navigate('/home');
    } catch (err) {
      alert('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageSection}>
        {/* Aquí va tu imagen */}
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles.loginForm}
        autoComplete="off"
      >
        <div className={styles.tittleContainer}>
          <h1 className={styles.tittle}>
            <span className={styles.spanmorado}>Mi</span>
            <span className={styles.spanverde}>C</span>hangarro
          </h1>
        </div>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        {/* 👇 AQUÍ SOLO CAMBIAMOS ESTO */}
        <input
          type="email"
          name="loginUsuario"
          autoComplete="off"
          placeholder="Correo electrónico"
          onChange={e => setForm({ ...form, usuario: e.target.value })}
          required
        />
        {/* ?? sigue guardando en form.usuario, solo que el texto deja claro que es correo */}

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={e => setForm({ ...form, contrasena: e.target.value })}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        </button>
        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando...' : 'Iniciar sesión'}
        </button>
        <button type="button" onClick={() => navigate('/register')}>
          ¿No tienes cuenta? Regístrate
        </button>
      </form>
    </div>
  );
}

export default Login;
