import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const login = (credentials) => API.post('/login', credentials);
export const getBusinesses = (category) => API.get(`/businesses?category=${category}`);
export const submitReview = (data) => API.post('/reviews', data);
export const register = (credentials) => API.post('/register', credentials);

// Nueva función para actualizar el perfil
export const updateProfile = (token, userId, formData) => {
  return fetch('/api/profile', {
    method: 'PUT',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
      // fetch establece Content-Type a multipart/form-data automáticamente con FormData
      'X-User-ID': userId  // Incluye el User ID en el header
    }
  });
};