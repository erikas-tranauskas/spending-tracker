<template>
  <div class="px-4 py-5">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-center">Create new</h1>
      <div class="col-lg-8 mx-auto">
        <item />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Item from '@/components/spending/Item.vue';

@Options({
  components: {
    Item,
  },
})
export default class SpendingNewItemView extends Vue {}
</script>
