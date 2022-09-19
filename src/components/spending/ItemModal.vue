<template>
  <div class="modal fade" :id="listItemModalId" tabindex="-1" aria-labelledby="spendingItemModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="spendingItemModalLabel">{{ !currentModalItem.title ? 'Add new item' : 'Edit ' + currentModalItem.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="item-title" class="col-form-label">Title:</label>
              <input type="text" class="form-control" id="item-title" :value="currentModalItem.title">
            </div>
            <div class="mb-3">
              <label for="item-amount" class="col-form-label">Amount:</label>
              <input type="text" class="form-control" id="item-amount" :value="currentModalItem.amount">
            </div>
            <div class="mb-3">
              <label for="item-monthly-increase" class="col-form-label">Monthly +:</label>
              <input type="text" class="form-control" id="item-monthly-increase" :value="currentModalItem.monthlyIncrease">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" ref="closeButton" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" @click="saveItem" class="btn btn-primary">Save</button>
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
      default: { title: '', amount: 0, monthlyIncrease: 0 },
    },
    listItemModalId: {
      type: String,
      default: 'spendingItemModal'
    },
  },
  emits: ['update-list-items'],
})
export default class ItemModal extends Vue {
  currentModalItem!: ListItem | null;
  listItemModalId!: string;

  saveItem() {
    this.$emit('update-list-items');
    this.closeModal();
  }

  closeModal() {
    const closeButton = this.$refs['closeButton'] as HTMLElement;
    closeButton.click();
  }
}
</script>

<style scoped lang="scss">

</style>
