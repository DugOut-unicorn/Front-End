import axios from 'axios';

export const api = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt') || ''}`,
  },
});
