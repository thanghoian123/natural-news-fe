import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    console.log('🚀 ~ token:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response);
    return response.data; // Directly return data
  },
  (error) => {
    console.error('❌ Response Error:', error.response);

    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn('⚠️ Unauthorized! Clearing token and redirecting to login...');

        // Clear token from localStorage on 401 Unauthorized
        localStorage.removeItem('token');

        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
