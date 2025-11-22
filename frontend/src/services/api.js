// API Configuration para Flask Backend
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Funciones existentes

export const login = (credentials) => API.post('/login', credentials);
export const getBusinesses = (categoria) => API.get(`/businesses?categoria=${categoria}`);
export const register = (credentials) => API.post('/register', credentials);

export const updateProfile = (token, userId, formData) => {
  return fetch('/api/profile', {
    method: 'PUT',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-User-ID': userId 
    }
  });
};

// ========== NUEVAS FUNCIONES PARA RESEÑAS ==========

// Obtener un negocio por ID
export const getBusinessById = async (id) => {
  try {
    // Cambiado a 'businesses' para coincidir con el backend
    const response = await API.get(`/businesses/${id}`);
    console.log('Datos del negocio obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener negocio:', error);
    throw error;
  }
};

// Obtener reseñas de un negocio
export const getReviewsByBusinessId = async (businessId) => {
  try {
    const response = await API.get(`/reviews/${businessId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    throw error;
  }
};

// Enviar una nueva reseña (ya existe pero actualizar)
export const submitReview = async (reviewData) => {
  try {
    const response = await API.post('/reviews', {
      negocio_id: reviewData.business_id,
      opinion: reviewData.opinion,
      calificacion: parseInt(reviewData.rating),
      resena: reviewData.review
    });
    return response.data;
  } catch (error) {
    console.error('Error al enviar reseña:', error);
    throw error;
  }
};

