<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '@/store';

const store = useMainStore();
const currentTheme = computed(() => store.getCurrentTheme);
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="py-5">
    <div class="container">
      <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>© {{ currentYear }} Spending Tracker</p>
        <ul class="list-unstyled d-flex">
          <li class="ms-3">
            <a href="https://github.com/erikas-tranauskas/spending-tracker" target="_blank" rel="noopener noreferrer">
              <svg :class="['bi', 'me-2', `theme-${currentTheme}`]" width="30" height="30">
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
