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
    idUtente: null
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
    },
    getIdSpecialEvent(state) {
      return state.specialEvent.idEvento
    },
    showSpecialEvent(state) {
      return state.specialEvent != null
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
