import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized');

      console.log(error);
    }
    if (error.response?.status === 403) {
      console.error('Permission denied');
    }
    if (error.response?.status === 500) {
      console.error('Server error occurred');
    }
    return Promise.reject(error);
  }
);

export default http;
