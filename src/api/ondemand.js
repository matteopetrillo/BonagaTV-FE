import axios from 'axios';

// Base URL per il microservizio on demand
const ONDEMAND_API_BASE_URL = process.env.VUE_APP_ONDEMAND_API_URL;
;

// Crea un'istanza axios specifica per on demand
const ondemandApi = axios.create({
  baseURL: ONDEMAND_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor per aggiungere token se presente - SOLO per API OnDemand
ondemandApi.interceptors.request.use(
  (config) => {
    // Aggiungi il token solo per le chiamate che iniziano con /api/auth, /api/registrazione o /api/vod
    if (config.url?.includes('/api/auth') || 
        config.url?.includes('/api/registrazione') || 
        config.url?.includes('/api/vod')) {
      const token = localStorage.getItem('ondemand_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor per gestire risposte ed errori - SOLO per errori OnDemand
ondemandApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestisci errori 401 solo per le API OnDemand
    if (error.response?.status === 401 && 
        (error.config?.url?.includes('/api/auth') || 
         error.config?.url?.includes('/api/registrazione') || 
         error.config?.url?.includes('/api/vod'))) {
      // Token scaduto o non valido per OnDemand
      localStorage.removeItem('ondemand_token');
      localStorage.removeItem('ondemand_user');
    }
    return Promise.reject(error);
  }
);

// API Functions
export const ondemandAuthApi = {
  // Login - restituisce AuthResponse con token
  async login(email, password) {
    try {
      const response = await ondemandApi.post('/api/auth/login', {
        email,
        password
      });
      
      // Salva token dall'AuthResponse
      if (response.data.token) {
        localStorage.setItem('ondemand_token', response.data.token);
        // Salva anche l'email dell'utente
        localStorage.setItem('ondemand_user', JSON.stringify({ email }));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante il login');
    }
  },

  // Registrazione - usa RegistrazioneDTO
  async register(email, password) {
    try {
      const response = await ondemandApi.post('/api/registrazione', {
        email,
        password
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante la registrazione');
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('ondemand_token');
    localStorage.removeItem('ondemand_user');
  },

  // Controlla se l'utente è autenticato
  isAuthenticated() {
    return !!localStorage.getItem('ondemand_token');
  },

  // Ottieni token corrente
  getToken() {
    return localStorage.getItem('ondemand_token');
  },

  // Ottieni user info (se salvate)
  getCurrentUser() {
    const userStr = localStorage.getItem('ondemand_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Conferma email registrazione
  async confirmEmail(token, email) {
    try {
      const response = await ondemandApi.get(`/api/registrazione/conferma?email=${email}&token=${token}`);
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante la conferma dell\'email');
    }
  },

  // Ottieni catalogo VOD
  async getCatalogo() {
    try {
      const response = await ondemandApi.get('/api/vod/catalogo');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante il recupero del catalogo');
    }
  }
};

export default ondemandApi;
