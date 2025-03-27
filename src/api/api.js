import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://sales-master-backend.onrender.com',
});

export default axiosInstance;
