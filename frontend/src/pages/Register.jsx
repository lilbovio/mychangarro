import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; 

function Register() {
  const [form, setForm] = useState({ usuario: '', contrasena: '' });
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
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2 className='tittleRegister'><span className='morado'>Re</span><span className='verde'>g</span>istro</h2>
        <p className='subRegister' >Registrarte es gratis :V</p>
        <input
          type="text"
          placeholder="First Name*"
          value={form.usuario}
          onChange={(e) => setForm({ ...form, usuario: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name*"
          value={form.usuario}
          onChange={(e) => setForm({ ...form, usuario: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email Address*"
          value={form.usuario}
          onChange={(e) => setForm({ ...form, usuario: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password*"
          value={form.contrasena}
          onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;