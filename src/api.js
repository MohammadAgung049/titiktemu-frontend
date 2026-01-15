// File: src/api.js
import axios from 'axios';

// --- KONFIGURASI ---
// 1. Ini URL Backend Laravel kamu
const API_BASE_URL = 'https://coretta-unfocusing-jonathan.ngrok-free.dev'; 

// 2. Ini URL dasar untuk gambar (tanpa /api)
export const IMAGE_BASE_URL = 'https://coretta-unfocusing-jonathan.ngrok-free.dev';

// Membuat instance Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// --- INTERCEPTOR (PENTING) ---
// Kode ini otomatis jalan setiap kali kita request ke backend.
// Tugasnya mengecek: "Ada token gak di penyimpanan?"
// Kalau ada, tokennya ditempel ke Header request.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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