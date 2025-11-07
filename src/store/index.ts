import { ListItem } from '@/components/spending/types';
import { defineStore } from 'pinia';

interface State {
  currentTheme: string;
  spendingItems: ListItem[];
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    currentTheme: localStorage.getItem('currentTheme') ?? 'light',
    spendingItems: (() => {
      try {
        const raw = localStorage.getItem('spendingItems');
        const parsed = raw ? JSON.parse(raw) : [];

        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    })(),
  }),

  getters: {
    getCurrentTheme: (state) => state.currentTheme,
    getSpendingItems: (state) => state.spendingItems,
  },

  actions: {
    setCurrentTheme(currentTheme: string) {
      this.currentTheme = currentTheme;
      localStorage.setItem('currentTheme', currentTheme);
    },

    async setCurrentThemeAsync(currentTheme: string) {
      this.setCurrentTheme(currentTheme);
    },

    setSpendingItems(spendingItems: ListItem[]) {
      this.spendingItems = spendingItems;
      localStorage.setItem('spendingItems', JSON.stringify(spendingItems));
    },

    deleteSpendingItem(id: number) {
      this.spendingItems = this.spendingItems.filter((item) => item.id !== id);
      localStorage.setItem('spendingItems', JSON.stringify(this.spendingItems));
    },

    editSpendingItem(updated: ListItem) {
      const idx = this.spendingItems.findIndex((i) => i.id === updated.id);

      if (idx !== -1) {
        this.spendingItems.splice(idx, 1, updated);
      } else {
        this.spendingItems.push(updated);
      }

      localStorage.setItem('spendingItems', JSON.stringify(this.spendingItems));
    },
  },
});
