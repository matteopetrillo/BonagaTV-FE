import { createStore } from 'vuex'
import { getCanali } from '@/services/api'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    canaliProssimamenteLive: null,
    canaliOffline: null,
    specialEvent: null,
    isAuthenticated: false,
    credentials: null,
    setIdUtente: null
  },
  getters: {
    getCanaliProxLive(state) {
      return state.canaliProssimamenteLive
    },
    getCanaliOffline(state) {
      return state.canaliOffline
    },
    getSpecialEvent(state) {
      return state.specialEvent
    },
    getCredentials(state) {
      return state.credentials
    },
    getIdUtente(state) {
      return state.idUtente
    }
  },
  mutations: {
    setCanaliProxLive(state, canali) {
      state.canaliProssimamenteLive = canali;
    },
    setCanaliOffline(state, canali) {
      state.canaliOffline = canali;
    },
    setSpecialEvent(state, canali) {
      state.specialEvent = canali;
    },
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setCredentials(state, cred) {
      state.credentials = cred;
    },
    setIdUtente(state, id) {
      state.idUtente = id
    }
  },
  actions: {
    async fetchCanali({commit}) {
      try {
        const response = await getCanali();
        commit('setCanaliProxLive', response.canaliProssimamenteLive);
        commit('setCanaliOffline', response.canaliOffline);
        commit('setSpecialEvent', response.specialEvent);
      } catch (error) {
        console.error('Errore durante il recupero dei canali:', error);
        throw error;
      }
    },
    login({commit}) {
      commit('login');
    },
    logout({commit}) {
      commit('logout');
    },
    setCredentials({commit},{ email, password }) {
      const cred = btoa(`${email}:${password}`)
      commit('setCredentials', cred)
    },
    setIdUtente({commit},idUtente) {
      commit('setIdUtente', idUtente)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
