import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});
export const login = (credentials) => API.post('/login', credentials);
export const getBusinesses = (categoria) => API.get(`/businesses?category=${categoria}`);
export const submitReview = (data) => API.post('/reviews', data);
export const register = (credentials) => API.post('/register', credentials);

// Nueva función para actualizar el perfil
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