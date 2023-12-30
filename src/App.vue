<template>
  <Header />
  <div class="b-divider"></div>
  <router-view />
  <div class="b-divider"></div>
  <Footer />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Options({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {
  mounted(): void {
    const htmlElement = document.getElementsByTagName('html')[0];

    if (htmlElement) {
      htmlElement.setAttribute('data-bs-theme', this.$store.getters.getCurrentTheme);
    }
  }
}
</script>

<style scoped>
.b-divider {
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1), inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}
</style>
