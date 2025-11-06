<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/store';
import { useRoute } from 'vue-router';

interface MenuItem {
  routeName: string;
  url: string;
  title: string;
}

const lightTheme = 'light';
const darkTheme = 'dark';

const store = useMainStore();
const route = useRoute();

const currentTheme = ref<string | null>(null);

const menuItems: MenuItem[] = [
  { routeName: 'home', url: '/', title: 'Home' },
  { routeName: 'spending', url: '/spending', title: 'Spending' },
  { routeName: 'portfolio', url: '/portfolio', title: 'Portfolio' },
  { routeName: 'about', url: '/about', title: 'About' },
];

onMounted(() => {
  currentTheme.value = store.getCurrentTheme;
});

function toggleTheme() {
  const htmlElement = document.getElementsByTagName('html')[0];
  if (!htmlElement) return;

  const themeAttribute = htmlElement.getAttribute('data-bs-theme');

  if (themeAttribute === darkTheme) {
    currentTheme.value = lightTheme;
  } else {
    currentTheme.value = darkTheme;
  }

  store.setCurrentTheme(currentTheme.value);
  htmlElement.setAttribute('data-bs-theme', currentTheme.value as string);
}
</script>

<template>
  <header>
    <div class="px-3 py-2">
      <div class="container">
        <header
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
        >
          <ul class="nav nav-pills">
            <li v-for="menuItem in menuItems" :key="menuItem.routeName" class="nav-item">
              <router-link
                :class="[
                  'nav-link',
                  {
                    active: String(route.name) === menuItem.routeName,
                  },
                ]"
                aria-current="page"
                :to="menuItem.url"
              >
                {{ menuItem.title }}
              </router-link>
            </li>
          </ul>
          <div class="col-md-3 text-end">
            <button
              @click="toggleTheme"
              type="button"
              :class="[
                'btn',
                { 'btn-outline-primary': currentTheme === lightTheme },
                { 'btn-outline-light': currentTheme === darkTheme },
              ]"
            >
              <i
                :class="[
                  'bi',
                  { 'bi-sun-fill': currentTheme === lightTheme },
                  { 'bi-sun': currentTheme === darkTheme },
                ]"
              ></i>
            </button>
          </div>
        </header>
      </div>
    </div>
  </header>
</template>
