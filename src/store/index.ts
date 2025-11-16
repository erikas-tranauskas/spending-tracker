import { ListItem } from '@/components/spending/types';
import { defineStore } from 'pinia';

interface State {
  spendingItems: ListItem[];
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
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
    getSpendingItems: (state) => state.spendingItems,
  },

  actions: {
    setSpendingItems(spendingItems: ListItem[]) {
      this.spendingItems = spendingItems;
      localStorage.setItem('spendingItems', JSON.stringify(spendingItems));
    },

    deleteSpendingItem(id: string) {
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
