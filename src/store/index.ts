import { defineStore } from 'pinia';

interface State {
  currentTheme: string;
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    currentTheme: localStorage.getItem('currentTheme') ?? 'light',
  }),

  getters: {
    getCurrentTheme: (state) => state.currentTheme,
  },

  actions: {
    setCurrentTheme(currentTheme: string) {
      this.currentTheme = currentTheme;
      localStorage.setItem('currentTheme', currentTheme);
    },

    async setCurrentThemeAsync(currentTheme: string) {
      this.setCurrentTheme(currentTheme);
    },
  },
});
