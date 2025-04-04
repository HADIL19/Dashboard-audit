// frontend/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Partners service
const partnerService = {
  getAll: async () => {
    const response = await api.get('/partners');
    return response.data;
  },
  create: async (partnerData) => {
    const response = await api.post('/partners', partnerData);
    return response.data;
  },
};

// Configurations service
const configService = {
  getAll: async () => {
    const response = await api.get('/configurations');
    return response.data;
  },
  create: async (configData) => {
    const response = await api.post('/configurations', configData);
    return response.data;
  },
};

// Audit logs service
const auditService = {
  getAll: async () => {
    const response = await api.get('/audits');
    return response.data;
  },
  create: async (auditData) => {
    const response = await api.post('/audits', auditData);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/audits/stats');
    return response.data;
  },
};

// Reports service
const reportService = {
  getAll: async () => {
    const response = await api.get('/reports');
    return response.data;
  },
  create: async (reportData) => {
    const response = await api.post('/reports', reportData);
    return response.data;
  },
};

export {
  api,
  authService,
  partnerService,
  configService,
  auditService,
  reportService,
};