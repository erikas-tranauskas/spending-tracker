<script setup lang="ts">
import { Github } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <footer class="mt-8 border-t border-border bg-card py-6">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <p class="text-sm text-muted-foreground">© {{ new Date().getFullYear() }} WealthWise. {{ t('copyright') }}.</p>
        <a
          href="https://github.com/erikas-tranauskas/spending-tracker"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github :size="20" />
        </a>
      </div>
    </div>
  </footer>
</template>
