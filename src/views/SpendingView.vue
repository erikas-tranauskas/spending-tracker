<template>
  <div class="px-4 py-5">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-center">Spending</h1>
      <div class="col-lg-8 mx-auto">
        <spending />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Spending from '@/components/spending/Spending.vue'

@Options({
  components: {
    Spending,
  },
})
export default class SpendingView extends Vue {}
</script>
