import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const movieAPI = {
  getMovies: (page = 1, limit = 20) => 
    api.get(`/movies?page=${page}&limit=${limit}`),
  
  getMovie: (id) => 
    api.get(`/movies/${id}`),
  
  searchMovies: (query, page = 1, limit = 20) => 
    api.get(`/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`),
  
  filterMovies: (filters, page = 1, limit = 20) => {
    const params = new URLSearchParams({ page, limit });
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return api.get(`/filter?${params}`);
  },
  
  getPopular: (page = 1, limit = 20) => 
    api.get(`/popular?page=${page}&limit=${limit}`),
  
  getRecent: (page = 1, limit = 20) => 
    api.get(`/recent?page=${page}&limit=${limit}`)
};

export default api;