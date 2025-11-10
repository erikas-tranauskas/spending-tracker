<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar';
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-border bg-card shadow-sm">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center gap-3">
        <SidebarTrigger />
        <h1 class="text-2xl font-bold text-foreground">WealthWise</h1>
      </div>
    </div>
  </header>
</template>
