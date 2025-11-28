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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const currentUser = JSON.parse(localStorage.getItem('user'));
      
      if (!currentUser || !currentUser.id) {
        navigate('/login');
        return;
      }

      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      headers['X-User-ID'] = currentUser.id;

      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Datos del perfil obtenidos:', userData);
        
        setUser({
          nombre: userData.nombre || '',
          descripcion: userData.descripcion || '',
          imagen: userData.imagen || '',
          image_file: null
        });
        
        const imageUrl = userData.imagen 
          ? `http://localhost:5000${userData.imagen}` 
          : './assets/default-user.jpg';
        
        setPreviewImage(imageUrl);
        
        localStorage.setItem('user', JSON.stringify({
          ...currentUser,
          nombre: userData.nombre,
          descripcion: userData.descripcion,
          imagen: userData.imagen
        }));
      } else {
        console.log('No se pudo obtener perfil del servidor, usando localStorage');
        const localUser = JSON.parse(localStorage.getItem('user'));
        if (localUser) {
          setUser({
            nombre: localUser.nombre || '',
            descripcion: localUser.descripcion || '',
            imagen: localUser.imagen || '',
            image_file: null
          });
          
          const imageUrl = localUser.imagen 
            ? `http://localhost:5000${localUser.imagen}` 
            : './assets/default-user.jpg';
          setPreviewImage(imageUrl);
        }
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      setError('Error al cargar el perfil');
      
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser) {
        setUser({
          nombre: localUser.nombre || '',
          descripcion: localUser.descripcion || '',
          imagen: localUser.imagen || '',
          image_file: null
        });
        const imageUrl = localUser.imagen 
          ? `http://localhost:5000${localUser.imagen}` 
          : './assets/default-user.jpg';
        setPreviewImage(imageUrl);
      }
    } finally {
      setLoading(false);
    }
  };

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
    setError('');
    
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
        console.log('Perfil actualizado:', data.user);
        
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const updatedUser = {
          ...currentUser,
          nombre: data.user.nombre,
          descripcion: data.user.descripcion,
          imagen: data.user.imagen
        };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        alert('Perfil actualizado exitosamente');
        
        await loadUserProfile();
      } else {
        console.error("Error al actualizar el perfil:", data);
        setError(data.error || 'Hubo un error al actualizar el perfil');
        alert(data.error || 'Hubo un error al actualizar el perfil. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Ocurrió un error inesperado');
      alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.loadingContainer}>
          <p>Cargando perfil...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
    <div className={styles.container}>
      <Header />
      <h2 className={styles.title}>Editar Perfil</h2>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.imageSection}>
          <div className={styles.imagePreview}>
            <img
              src={previewImage || './assets/default-user.jpg'}
              alt="Preview"
              className={styles.image}
              onError={(e) => {
                console.error('Error cargando imagen:', e);
                e.target.onerror = null;
                e.target.src = './assets/default-user.jpg';
              }}
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

    </div>
      <Footer />
    </div>
  );
}

export default Profile;