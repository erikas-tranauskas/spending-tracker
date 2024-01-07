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
                    active: $route.name === menuItem.routeName,
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

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

interface menuItem {
  routeName: string;
  url: string;
  title: string;
}

@Options({})
export default class Header extends Vue {
  lightTheme = 'light';
  darkTheme = 'dark';
  currentTheme = null as null | string;

  menuItems: menuItem[] = [
    {
      routeName: 'home',
      url: '/',
      title: 'Home',
    },
    {
      routeName: 'spending',
      url: '/spending',
      title: 'Spending',
    },
    {
      routeName: 'portfolio',
      url: '/portfolio',
      title: 'Portfolio',
    },
    {
      routeName: 'about',
      url: '/about',
      title: 'About',
    },
  ];

  mounted(): void {
    this.currentTheme = this.$store.getters.getCurrentTheme;
  }

  toggleTheme() {
    const htmlElement = document.getElementsByTagName('html')[0];

    if (htmlElement) {
      const themeAttribute = htmlElement.getAttribute('data-bs-theme');

      if (themeAttribute === this.darkTheme) {
        this.currentTheme = this.lightTheme;
      } else {
        this.currentTheme = this.darkTheme;
      }

      this.$store.commit('setCurrentTheme', this.currentTheme);
      htmlElement.setAttribute('data-bs-theme', this.currentTheme);
    }
  }
}
</script>
