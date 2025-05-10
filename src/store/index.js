export default new Vuex.Store({
  state: {
    // ...existing state...
    activeTab: 'live'
  },
  mutations: {
    // ...existing mutations...
    setActiveTab(state, tab) {
      state.activeTab = tab;
    }
  },
  getters: {
    // ...existing getters...
    getActiveTab: state => state.activeTab
  },
  actions: {
    // ...existing actions...
  }
});