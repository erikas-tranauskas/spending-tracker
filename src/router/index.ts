import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import SpendingView from '../views/SpendingView.vue';
import PortfolioView from '../views/PortfolioView.vue';
import SpendingNewItemView from '../views/SpendingNewItemView.vue';
import SpendingItemView from '../views/SpendingItemView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
