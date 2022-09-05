<template>
  <div class="modal fade" id="spendingItemModal" tabindex="-1" aria-labelledby="spendingItemModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="spendingItemModalLabel">Add new item</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ currentModalItem ? currentModalItem.title : '-' }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

interface ListItem {
  title: string,
  amount: number,
  monthlyIncrease: number,
}

@Options({
  props: {
    currentModalItem: {
      type: Object as () => ListItem,
    }
  }
})
export default class ItemModal extends Vue {
  currentModalItem!: ListItem | null;
}
</script>

<style scoped lang="scss">

</style>
