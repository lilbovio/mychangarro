import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './Register.module.css'; 
import home from "../assets/home.svg"; /* !!!!!!! */

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
    <div>
      <nav className={style.navBar}>
        <div className={style.navLogo} onClick={() => navigate('/')}>
          <img className={style.imgHome} src={home} alt="" />
          <span><span className={style.morado}>Mi</span><span className={style.verde}>C</span>hangarro</span>
        </div>
        <div className={style.navBrand}><span className={style.morado}>Mi</span><span className={style.verde}>C</span>hangarro</div>
      </nav>  
      <div className={style.registerContainer}>
        <form className={style.formularioRegister} onSubmit={handleSubmit}>
          <h2 className={style.tittleRegister}><span className={style.morado}>Re</span><span className={style.verde}>g</span>istro</h2>
          <p className={style.subRegister} >Registrarte es gratis :V</p>
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
    </div>
  );
}

export default Register;