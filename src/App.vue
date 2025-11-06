<script setup lang="ts">
import { onMounted } from 'vue';
import { useMainStore } from '@/store';
import Header from '@/components/HeaderComponent.vue';
import Footer from '@/components/FooterComponent.vue';

const store = useMainStore();

onMounted(() => {
  const htmlElement = document.getElementsByTagName('html')[0];
  if (htmlElement) {
    htmlElement.setAttribute('data-bs-theme', store.getCurrentTheme);
  }
});
</script>

<template>
  <Header></Header>
  <div class="b-divider"></div>
  <router-view />
  <div class="b-divider"></div>
  <Footer></Footer>
</template>

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
