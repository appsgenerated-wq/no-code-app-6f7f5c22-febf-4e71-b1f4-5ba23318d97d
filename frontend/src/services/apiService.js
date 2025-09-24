import config from '../constants';

const apiService = {
  authToken: null,

  setAuthToken(token) {
    this.authToken = token;
  },

  async request(endpoint, options = {}, isFormData = false) {
    const url = `${config.API_BASE_URL}/${config.APP_ID}${endpoint}`;
    const headers = { ...options.headers };

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    const configOptions = {
        ...options,
        headers,
    };

    try {
      const response = await fetch(url, configOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        console.error('API Error:', errorData);
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      if (response.status === 204) return null;
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  get(endpoint) {
    return this.request(endpoint);
  },

  post(endpoint, data) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) });
  },

  put(endpoint, data) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },

  upload(endpoint, formData) {
    return this.request(endpoint, { method: 'POST', body: formData }, true);
  }
};

export default apiService;