const API = axios.create({
  baseURL: 'https://mychangarro.onrender.com/api'
});

export const login = (credentials) => API.post('/login', credentials);
export const getBusinesses = (categoria) => API.get(`/businesses?categoria=${categoria}`);
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

