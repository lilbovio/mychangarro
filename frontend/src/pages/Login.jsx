import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import styles from './Login.module.css'; // crea estilos si deseas

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/home');
    } catch (err) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageSection}>
        {/* Aquí va tu imagen */}
      </div>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input type="text" placeholder="Usuario" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input type="password" placeholder="Contraseña" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
