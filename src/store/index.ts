import { createStore } from 'vuex';

export default createStore({
  state: {
    currentTheme: localStorage.getItem('currentTheme') ?? 'light',
  },

  getters: {
    getCurrentTheme: (state) => {
      return state.currentTheme;
    },
  },

  mutations: {
    setCurrentTheme(state, currentTheme: string) {
      state.currentTheme = currentTheme;
      localStorage.setItem('currentTheme', currentTheme);
    },
  },

  actions: {
    setCurrentThemeAsync({ commit }, currentTheme: string) {
      commit('setCurrentTheme', currentTheme);
    },
  },

  modules: {},
});
