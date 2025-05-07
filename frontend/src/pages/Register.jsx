import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', form);
      alert('Registro exitoso');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Usuario"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Register;