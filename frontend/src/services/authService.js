import apiService from './apiService';

const authService = {
  async login(email, password) {
    return apiService.post('/login', { email, password });
  },

  async register(userData) {
    return apiService.post('/register', userData);
  },

  async getProfile() {
    return apiService.get('/profile');
  },
};

export default authService;