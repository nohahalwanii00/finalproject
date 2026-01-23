import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    if (error.response) {
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - handled by AuthContext usually, but good to notify
          toast.error('Session expired. Please login again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          toast.error('Access Denied: You do not have permission.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 429:
           toast.error('Too many requests. Please wait a moment.');
           break;
        case 500:
          toast.error('Server Error. Please try again later.');
          break;
        default:
          toast.error(message);
      }
    } else if (error.request) {
      // Network error
      toast.error('Network Error. Please check your connection.');
    } else {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default api;