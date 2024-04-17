import { createStore } from 'vuex'
import { getCanali } from '@/services/api'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    canaliProssimamenteLive: null,
    canaliOffline: null
  },
  getters: {
    getCanaliProxLive(state) {
      return state.canaliProssimamenteLive
    },
    getCanaliOffline(state) {
      return state.canaliOffline
    }
  },
  mutations: {
    setCanaliProxLive(state, canali) {
      state.canaliProssimamenteLive = canali;
    },
    setCanaliOffline(state, canali) {
      state.canaliOffline = canali;
    },
  },
  actions: {
    async fetchCanali({commit}) {
      try {
        const response = await getCanali();
        commit('setCanaliProxLive', response.canaliProssimamenteLive);
        commit('setCanaliOffline', response.canaliOffline);
      } catch (error) {
        console.error('Errore durante il recupero dei canali:', error);
        throw error;
      }



    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
