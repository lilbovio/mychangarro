import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const login = (credentials) => API.post('/login', credentials);
export const getBusinesses = (category) => API.get(`/businesses?category=${category}`);
export const submitReview = (data) => API.post('/reviews', data);
export const register = (credentials) => API.post('/register', credentials);
