import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

// Attach JWT from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lmg_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401 (expired/invalid token), clear it and reload to login screen
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('lmg_token');
      window.location.reload();
    }
    return Promise.reject(err);
  },
);

export default api;
