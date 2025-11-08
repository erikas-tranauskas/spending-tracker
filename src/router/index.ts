import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SpendingView from '@/views/SpendingView.vue';
import PortfolioView from '@/views/PortfolioView.vue';
import SpendingNewItemView from '@/views/SpendingNewItemView.vue';
import SpendingItemView from '@/views/SpendingItemView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/spending',
    name: 'spending',
    component: SpendingView,
  },
  {
    path: '/spending/new',
    name: 'spending-new-item',
    component: SpendingNewItemView,
  },
  {
    path: '/spending/edit/:id',
    name: 'spending-edit',
    component: SpendingItemView,
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
