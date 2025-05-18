import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blogs-backend-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.url === '/login' || config.url === '/signup') {
      return config;
    }
    const auth = JSON.parse(localStorage.getItem('auth'));
    const { token } = auth;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
