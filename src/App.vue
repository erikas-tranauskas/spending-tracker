<script setup lang="ts">
import Header from '@/components/HeaderComponent.vue';
import Footer from '@/components/FooterComponent.vue';
import { Button } from '@/components/ui/button';
</script>

<template>
  <Header />
  <div>
    <Button>Click me</Button>
  </div>
  <div class="p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg text-center">
    <h1 class="text-3xl font-bold mb-4">Tailwind Works 🎉</h1>
    <p class="text-lg">If you see gradient background, rounded corners, and white text — it’s working!</p>
  </div>
  <RouterView />
  <Footer />
</template>

