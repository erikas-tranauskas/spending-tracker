<template>
  <div class="bg-dark text-secondary px-4 py-5 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">Spending</h1>
      <div class="col-lg-8 mx-auto">
        <spending/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Spending from '@/components/spending/Spending.vue';

@Options({
  components: {
    Spending,
  }
})
export default class SpendingView extends Vue {

}
</script>
