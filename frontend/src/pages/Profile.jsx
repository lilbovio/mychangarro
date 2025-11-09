import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


function Profile() {
const [user, setUser] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
    image_file: null
});
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setUser({
        nombre: currentUser.nombre || '',
        descripcion: currentUser.descripcion || '',
        imagen: currentUser.imagen || ''
      });
      setPreviewImage(currentUser.imagen);
    }
  }, []);
  

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setUser(prev => ({ ...prev, image_file: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombre', user.nombre);
      formData.append('descripcion', user.descripcion);
      if (user.image_file) {
        formData.append('imagen', user.image_file);
      }
  
      const token = localStorage.getItem('token');
      const userId = JSON.parse(localStorage.getItem('user')).id;

      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      if (userId) {
        headers['X-User-ID'] = userId;
      }

      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        body: formData,
        headers
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/profile'); 
      } else {
        console.error("Error al actualizar el perfil:", data);
        alert('Hubo un error al actualizar el perfil. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <h2 className={styles.title}>Editar Perfil</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.imageSection}>
          <div className={styles.imagePreview}>
            <img
              src={previewImage || '/default-user.png'}
              alt="Preview"
              className={styles.image}
            />
          </div>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          <label htmlFor="image" className={styles.fileLabel}>
            Cambiar imagen  
          </label>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
            required        
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="descripcion"
            value={user.descripcion}
            onChange={handleChange}
            className={`${styles.input} ${styles.textarea}`}
            rows="4"
          />
        </div>

        <button type="submit" className={styles.saveButton}>
          Guardar Cambios
        </button>
      </form>

      <Footer />
    </div>
  );
}

export default Profile;
