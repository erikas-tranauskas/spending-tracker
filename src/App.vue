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
  <div class="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center text-white shadow-lg">
    <h1 class="mb-4 text-3xl font-bold">Tailwind Works 🎉</h1>
    <p class="text-lg">If you see gradient background, rounded corners, and white text — it’s working!</p>
  </div>
  <RouterView />
  <Footer />
</template>
