import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:4040/api',
});

export default axiosInstance;
