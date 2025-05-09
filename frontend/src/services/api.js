const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://tu-backend.onrender.com/api'
});

export const login = (credentials) => API.post('/login', credentials);
export const getBusinesses = (categoria) => API.get(`/businesses?categoria=${categoria}`); // Corrección del parámetro
export const submitReview = (data) => API.post('/reviews', data);
export const register = (credentials) => API.post('/register', credentials);

export const updateProfile = (token, userId, formData) => {
  return fetch(`${API.defaults.baseURL}/profile`, {
    method: 'PUT',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-User-ID': userId 
    }
  });
};
