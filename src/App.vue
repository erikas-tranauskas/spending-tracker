<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<template>
  <SidebarProvider>
    <div class="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div class="flex w-full flex-1 flex-col">
        <HeaderComponent />
        <main>
          <RouterView />
        </main>
        <FooterComponent />
      </div>
    </div>
  </SidebarProvider>
</template>
