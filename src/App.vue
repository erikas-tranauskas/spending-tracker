<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
</script>

<template>
  <SidebarProvider>
    <div class="flex min-h-screen w-full bg-background">
      <!--@todo add props-->
      <AppSidebar />
      <div class="flex w-full flex-1 flex-col">
        <HeaderComponent />
        <main class="container mx-auto flex-1 px-4 py-8">
          <RouterView />
        </main>
        <Toaster />
        <FooterComponent />
      </div>
    </div>
  </SidebarProvider>
</template>
