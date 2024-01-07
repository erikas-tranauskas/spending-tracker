<template>
  <footer class="py-5">
    <div class="container">
      <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>© {{ new Date().getFullYear() }} Spending Tracker</p>
        <ul class="list-unstyled d-flex">
          <li class="ms-3">
            <a href="https://github.com/erikas-tranauskas/spending-tracker" target="_blank">
              <svg :class="['bi', 'me-2', `theme-${$store.getters.getCurrentTheme}`]" width="30" height="30">
                <use xlink:href="/bootstrap-icons.svg#github"></use>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Footer extends Vue {}
</script>

<style scoped lang="scss">
.bi {
  vertical-align: -0.125em;
}
</style>
