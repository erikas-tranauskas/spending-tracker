<template>
  <!-- @todo create header component -->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Spending Tracker</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :class="['nav-link', { 'active' : $route.name === 'home'}]" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :class="['nav-link', { 'active' : $route.name === 'about'}]" to="/about">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <router-view/>
  <!-- @todo create footer component -->
  <footer class="py-5">
    <div class="container">
      <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>© {{ new Date().getFullYear() }} Spending Tracker</p>
        <ul class="list-unstyled d-flex">
          <li class="ms-3">
            <a class="link-dark" href="https://github.com/erikas-tranauskas/spending-tracker" target="_blank">
              <svg class="bi" width="24" height="24"><use xlink:href="bootstrap-icons.svg#github"></use></svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  
})
export default class App extends Vue {
  created() {
    console.log('App created!');
  }
}
</script>
