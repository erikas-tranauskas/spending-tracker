<template>
  <header>
    <div class="px-3 py-2 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <router-link class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none" to="/">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
              <use xlink:href="bootstrap-icons.svg#bootstrap" />
            </svg>
          </router-link>
          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li v-for="menuItem in menuItems" :key="menuItem.routeName">
              <router-link
                :class="[
                  'nav-link',
                  {
                    'text-secondary': $route.name !== menuItem.routeName,
                  },
                  {
                    'text-white': $route.name === menuItem.routeName,
                  },
                ]"
                aria-current="page"
                :to="menuItem.url"
              >
                <svg class="bi d-block mx-auto mb-1" width="24" height="24">
                  <use :xlink:href="'bootstrap-icons.svg#' + menuItem.icon" />
                </svg>
                {{ menuItem.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

interface menuItem {
  routeName: string
  url: string
  icon: string
  title: string
}

@Options({})
export default class Header extends Vue {
  menuItems: menuItem[] = [
    {
      routeName: 'home',
      url: '/',
      icon: 'house-fill',
      title: 'Home',
    },
    {
      routeName: 'spending',
      url: '/spending',
      icon: 'coin',
      title: 'Spending',
    },
    {
      routeName: 'portfolio',
      url: '/portfolio',
      icon: 'currency-bitcoin',
      title: 'Portfolio',
    },
    {
      routeName: 'about',
      url: '/about',
      icon: 'book',
      title: 'About',
    },
  ]
}
</script>

<style scoped lang="scss">
.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}
</style>
