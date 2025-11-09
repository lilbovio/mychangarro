import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './Register.module.css';
import home from "../assets/home.svg";

function Register() {
  // Estado del formulario principal
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contrasena: '',
  });

  // Campos de confirmación
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmContrasena, setConfirmContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Manejar cambios de los inputs principales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Expresiones regulares para validaciones
    const nameRegex = /^[A-Za-z????????????\s]+$/;              // solo letras y espacios
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;          // 7+ caracteres, 1 may?scula, 1 n?mero

    // Validar nombre y apellido
    if (!nameRegex.test(form.firstName) || !nameRegex.test(form.lastName)) {
      alert('El nombre y el apellido solo pueden contener letras y espacios.');
      return;
    }

    // Validar formato b?sico de correo
    if (!form.email.includes('@')) {
      alert('Ingresa un correo electr?nico v?lido que contenga "@".');
      return;
    }

    // Validar complejidad de la contrase?a
    if (!passwordRegex.test(form.contrasena)) {
      alert('La contrase?a debe tener al menos 7 caracteres, una may?scula y un n?mero.');
      return;
    }

    // Validar coincidencia de email
    if (form.email !== confirmEmail) {
      alert('Los correos no coinciden');
      return;
    }

    // Validar coincidencia de contrase?a
    if (form.contrasena !== confirmContrasena) {
      alert('Las contrase?as no coinciden');
      return;
    }

    try {
      setLoading(true);
      // El backend espera que "usuario" sea el correo
      await axios.post('http://localhost:5000/api/register', {
        usuario: form.email,
        contrasena: form.contrasena,
        nombre: `${form.firstName} ${form.lastName}`.trim(),
        first_name: form.firstName,
        last_name: form.lastName,
      });

      alert('Registro exitoso');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <nav className={style.navBar}>
        <div className={style.navLogo} onClick={() => navigate('/')}>
          <img className={style.imgHome} src={home} alt="" />
          <span>
            <span className={style.morado}>Mi</span>
            <span className={style.verde}>C</span>hangarro
          </span>
        </div>
        <div className={style.navBrand}>
          <span className={style.morado}>Mi</span>
          <span className={style.verde}>C</span>hangarro
        </div>
      </nav>

      <div className={style.registerContainer}>
        <form
          className={style.formularioRegister}
          onSubmit={handleSubmit}
          autoComplete="off"  // evitar autocompletado molesto
        >
          <h2 className={style.tittleRegister}>
            <span className={style.morado}>Re</span>
            <span className={style.verde}>g</span>istro
          </h2>
          <p className={style.subRegister}>
            ¡Hola! Añade tu registro para poder continuar
          </p>

          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name*"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"   // evitar que el navegador meta el correo viejo
            required
          />

          {/* Confirmar Email */}
          <input
            type="email"
            placeholder="Vuelve a escribir tu Email*"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            autoComplete="off"
            required
          />

          {/* Password */}
          <input
            type={showPassword ? 'text' : 'password'}
            name="contrasena"
            placeholder="Password*"
            value={form.contrasena}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          </button>

          {/* Confirmar Password */}
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Vuelve a escribir tu Password*"
            value={confirmContrasena}
            onChange={(e) => setConfirmContrasena(e.target.value)}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(prev => !prev)}
          >
            {showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          </button>

          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'REGISTRARSE'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
