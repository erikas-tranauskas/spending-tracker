<template>
  <header>
    <div class="px-3 py-2 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <router-link class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none" to="/">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="bootstrap-icons.svg#bootstrap"/></svg>
          </router-link>

          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <router-link :class="['nav-link', { 'text-secondary' : $route.name !== 'home'}, { 'text-white' : $route.name === 'home'}]" aria-current="page" to="/">
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="bootstrap-icons.svg#house-fill"/></svg>
                Home
              </router-link>
            </li>
            <li>
              <router-link :class="['nav-link', { 'text-secondary' : $route.name !== 'about'}, { 'text-white' : $route.name === 'about'}]" aria-current="page" to="/about">
                <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="bootstrap-icons.svg#book"/></svg>
                About
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}
</style>
