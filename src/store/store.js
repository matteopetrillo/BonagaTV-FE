import { createStore } from 'vuex'
import { getCanali, getSponsors } from '@/services/api'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    canaliProssimamenteLive: null,
    canaliOffline: null,
    specialEvent: null,
    freeSpecialEvent: null,
    isAuthenticated: false,
    credentials: null,
    idUtente: null,
    sponsors: null
  },
  getters: {
    getCanaliProxLive(state) {
      return state.canaliProssimamenteLive;
    },
    getCanaliOffline(state) {
      return state.canaliOffline;
    },
    getSpecialEvent(state) {
      return state.specialEvent;
    },
    getFreeSpecialEvent(state) {
      return state.freeSpecialEvent;
    },
    getCredentials(state) {
      return state.credentials;
    },
    getIdUtente(state) {
      return state.idUtente;
    },
    getIdSpecialEvent(state) {
      return state.specialEvent.idEvento;
    },
    showSpecialEvent(state) {
      return state.specialEvent != null;
    },
    getSponsors(state) {
      return state.sponsors;
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
    setFreeSpecialEvent(state, canali) {
      state.freeSpecialEvent = canali;
    },
    setCredentials(state, cred) {
      state.credentials = cred;
    },
    setIdUtente(state, id) {
      state.idUtente = id;
    },
    setSponsors(state, sponsors) {
      state.sponsors = sponsors;
    }
  },
  actions: {
    async beginningFetch({commit}) {
      try {
        console.log('Fetching canali from:', process.env.VUE_APP_ROOT_API);
        const responseCanali = await getCanali();
        commit('setCanaliProxLive', responseCanali.canaliProssimamenteLive);
        commit('setCanaliOffline', responseCanali.canaliOffline);
        commit('setSpecialEvent', responseCanali.specialEvent);
        commit('setFreeSpecialEvent', responseCanali.freeSpecialEvent);
        //const responseSponsor = await getSponsors();
        //commit('setSponsors', responseSponsor);
      } catch (error) {
        console.error('Errore durante il recupero dei canali:', error);
        console.error('Assicurati che il backend sia in esecuzione su:', process.env.VUE_APP_ROOT_API);
        // Set default values to prevent app crash
        commit('setCanaliProxLive', []);
        commit('setCanaliOffline', []);
        commit('setSpecialEvent', null);
        commit('setFreeSpecialEvent', null);
        throw error;
      }
    },
    setCredentials({commit},{ email, password }) {
      const cred = btoa(`${email}:${password}`)
      commit('setCredentials', cred)
    },
    setIdUtente({commit},idUtente) {
      commit('setIdUtente', idUtente)
    },
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
